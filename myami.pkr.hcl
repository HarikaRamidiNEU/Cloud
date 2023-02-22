# This file was autogenerated by the 'packer hcl2_upgrade' command. We
# recommend double checking that everything is correct before going forward. We
# also recommend treating this file as disposable. The HCL2 blocks in this
# file can be moved to other files. For example, the variable blocks could be
# moved to their own 'variables.pkr.hcl' file, etc. Those files need to be
# suffixed with '.pkr.hcl' to be visible to Packer. To use multiple files at
# once they also need to be in the same folder. 'packer inspect folder/'
# will describe to you what is in that folder.

# Avoid mixing go templating calls ( for example ```{{ upper(`string`) }}``` )
# and HCL2 calls (for example '${ var.string_value_example }' ). They won't be
# executed together and the outcome will be unknown.

# All generated input variables will be of 'string' type as this is how Packer JSON
# views them; you can change their type later on. Read the variables type
# constraints documentation
# https://www.packer.io/docs/templates/hcl_templates/variables#type-constraints for more info.
variable "aws_access_key" {
  type    = string
  default = "AKIAQTWWFZ34QMX46PU4"
}

variable "aws_secret_key" {
  type    = string
  default = "1BjUFnUBPsUS1CKjWS8M2V+MyG4lloK00WinJ03Z"
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "aws_source_ami" {
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


# "timestamp" template function replacement
locals { timestamp = regex_replace(timestamp(), "[- TZ:]", "") }

# source blocks are generated from your builders; a source can be referenced in
# build blocks. A build block runs provisioner and post-processors on a
# source. Read the documentation for source blocks here:
# https://www.packer.io/docs/templates/hcl_templates/blocks/source
source "amazon-ebs" "autogenerated_1" {
  access_key      = "${var.aws_access_key}"
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "AMI for CSYE 6225"
  instance_type   = "${var.instance_type}"
  region          = "${var.aws_region}"
  secret_key      = "${var.aws_secret_key}"
  source_ami      = "${var.aws_source_ami}"
  ssh_username    = "${var.ssh_username}"
  subnet_id       = "${var.subnet_id}"
  ami_regions = [
    "${var.aws_region}",
  ]
  ami_users = ["${var.devAccountID}", "${var.demoAccountID}"] #accounts where the ami will be available once created

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 50
    volume_type           = "gp2"
  }
}

# a build block invokes sources and runs provisioning steps on them. The
# documentation for build blocks can be found here:
# https://www.packer.io/docs/templates/hcl_templates/blocks/build
build {
  sources = ["source.amazon-ebs.autogenerated_1"]

  provisioner "file" {
    destination = "/tmp/"
    source      = "./app.tar.gz"
  }

  provisioner "file" {
    destination = "/tmp/"
    source      = "./appservice.service"
  }

  provisioner "shell" {
    script = "mysql.sh"
  }

}
