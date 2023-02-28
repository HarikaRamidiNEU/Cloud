
resource "aws_instance" "application-ec2" {
  ami                     = var.my_ami
  instance_type           = var.ec2_instance_type
  key_name                = var.aws_key_pair
  subnet_id               = aws_subnet.public_subnets[0].id
  iam_instance_profile    = aws_iam_instance_profile.ec2_profile.name
  disable_api_termination = false
  vpc_security_group_ids = [
    aws_security_group.application.id
  ]
  tags = {
    Name = "Application EC2"
  }
  user_data = <<EOF
#!/bin/bash
export DATABASE_USER=csye6225
export DATABASE_HOST=${aws_db_instance.databaseInstance.endpoint}
export DATABASE_NAME=csye6225
export DATABASE_Password=password
export DATABASE_PORT=5432
export AWS_BUCKET_NAME=${local.bucket_name}
EOF
  depends_on = [
    aws_subnet.public_subnets,
  ]
}
resource "aws_eip" "lb" {
  instance = aws_instance.application-ec2.id
  vpc      = true

  depends_on = [
    aws_instance.application-ec2,
  ]
}

