
resource "aws_instance" "application-ec2" {
  ami                     = var.my_ami
  instance_type           = var.ec2_instance_type
  key_name                = var.aws_key_pair
  subnet_id               = aws_subnet.public_subnets[0].id
  disable_api_termination = false
  vpc_security_group_ids = [
    aws_security_group.application.id
  ]
  tags = {
    Name = "Application EC2"
  }

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
