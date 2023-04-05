resource "aws_launch_configuration" "asg_launch_config" {
  image_id      = var.my_ami
  instance_type = "t2.micro"
  key_name      = var.aws_key_pair
  user_data     = <<EOF
#!/bin/bash
yum update -y
cd /home/ec2-user/src/
touch .env
echo DATABASE_USER=csye6225 >> .env
echo DATABASE_HOST=${element(split(":", aws_db_instance.databaseInstance.endpoint), 0)} >> .env
echo DATABASE_NAME=csye6225 >> .env
echo DATABASE_Password=postgres >> .env
echo DATABASE_PORT=5432 >> .env
echo AWS_BUCKET_NAME=${local.bucket_name} >> .env

cp .env /home/ec2-user/
chmod -R 777 /home/ec2-user/

EOF

  associate_public_ip_address = true
  iam_instance_profile        = aws_iam_instance_profile.ec2_profile.name
  security_groups             = [aws_security_group.application.id]
}

resource "aws_autoscaling_group" "asg" {
  name                      = "myASG"
  launch_configuration      = aws_launch_configuration.asg_launch_config.id
  vpc_zone_identifier       = [aws_subnet.public_subnets[0].id, aws_subnet.public_subnets[1].id, aws_subnet.public_subnets[2].id]
  min_size                  = 1
  max_size                  = 3
  desired_capacity          = 1
  health_check_type         = "ELB"
  health_check_grace_period = 300
  default_cooldown          = 300
  tag {
    key                 = "Name"
    value               = "web-app"
    propagate_at_launch = true
  }

  lifecycle {
    create_before_destroy = true
  }

}

resource "aws_autoscaling_policy" "scale_up" {
  name                   = "scale-up-policy"
  autoscaling_group_name = aws_autoscaling_group.asg.name

  policy_type = "TargetTrackingScaling"

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = 5.0
  }
}


resource "aws_autoscaling_policy" "scale_down" {
  name                   = "scale-down-policy"
  autoscaling_group_name = aws_autoscaling_group.asg.name

  policy_type = "TargetTrackingScaling"

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = 3.0
  }
}

resource "aws_lb" "application_lb" {
  name_prefix        = "lb-"
  load_balancer_type = "application"
  subnets            = [aws_subnet.public_subnets[0].id, aws_subnet.public_subnets[1].id, aws_subnet.public_subnets[2].id]
  security_groups    = [aws_security_group.loadbalancer.id]
}

resource "aws_lb_target_group" "target_group" {
  name_prefix = "target"
  port        = "8080"
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "instance"
  health_check {
    interval = 30
    path     = "/healthz"
    port     = "8080"
    protocol = "HTTP"
  }
}

resource "aws_lb_listener" "my_listener" {
  load_balancer_arn = aws_lb.application_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.target_group.arn
    type             = "forward"
  }
}

resource "aws_lb_listener" "my_listener1" {
  load_balancer_arn = aws_lb.application_lb.arn
  port              = 443
  protocol          = "HTTPS"

  default_action {
    target_group_arn = aws_lb_target_group.target_group.arn
    type             = "forward"
  }
}

# Attach Target Group to Auto Scaling Group
resource "aws_autoscaling_attachment" "asg_attachment" {
  autoscaling_group_name = aws_autoscaling_group.asg.name
  alb_target_group_arn   = aws_lb_target_group.target_group.arn
}

data "aws_instance" "ec2_instance_ids" {
  filter {
    name   = "tag:Name"
    values = ["web-app"]
  }
}

# Register Auto Scaling Group instances with Target Group
resource "aws_lb_target_group_attachment" "target_group_attachment" {
  target_group_arn = aws_lb_target_group.target_group.arn
  target_id        = data.aws_instance.ec2_instance_ids.id
  port             = "8080"
}
