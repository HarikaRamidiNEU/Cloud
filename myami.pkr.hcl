variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-0dfcb1ef8550277af" # Amazon Linux 2 AMI (HVM)
}

variable "devAccountID" {
  type    = string
  default = "042325102329" # Dev Account ID
}

variable "demoAccountID" {
  type    = string
  default = "969027623663" # Demo Account ID
}

variable "ssh_username" {
  type    = string
  default = "ec2-user"
}

variable "subnet_id" {
  type    = string
  default = "subnet-0e78878d05abcbe2c" #added my subnet
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}


# https://www.packer.io/plugins/builders/amazon/ebs
source "amazon-ebs" "my-ami" {
  region          = "${var.aws_region}"
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "AMI for CSYE 6225"
  ami_regions = [
    "${var.aws_region}",
  ]
  ami_users = ["${var.devAccountID}", "${var.demoAccountID}"] #accounts where the ami will be available once created

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  instance_type = "${var.instance_type}"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  subnet_id     = "${var.subnet_id}"

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/sda1"
    volume_size           = 50
    volume_type           = "gp2"
  }
}

build {
  sources = ["source.amazon-ebs.my-ami"]

  provisioner "file" {
    source      = "./app.tar.gz"
    destination = "/home/ec2user/app.tar.gz"
  }

  provisioner "file" {
    source      = "./appservice.service"
    destination = "/tmp/appservice.service"
  }

  provisioner "shell" {
    scripts = [
      "./mysql.sh"
    ]
  }

  post-processor "manifest" {

    output = "manifest.json"

    strip_path = true

    custom_data = {

      my_custom_data = "example"

    }

  }

}
