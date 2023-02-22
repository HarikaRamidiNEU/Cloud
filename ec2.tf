resource "aws_instance" "application-ec2" {
  ami = var.my_ami
  instance_type = var.ec2_instance_type
  key_name = var.aws_key_pair
  security_groups = ["application"]
}
