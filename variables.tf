variable "cidr" {
  type        = string
  description = "vpc cidr value"
}
variable "vpcName" {
  type        = string
  description = "vpc name"
}

variable "igwName" {
  type        = string
  description = "internet gateway name"
}

variable "public_route_table" {
  type        = string
  description = "public route table"
}

variable "private_route_table" {
  type        = string
  description = "private route table"
}

variable "region" {
  type        = string
  description = "region where the resources will be created and destroyed"
}

variable "profile" {
  type        = string
  description = "In which account the resources will be created and destroyed"
}


variable "public_subnet_count" {
  type        = number
  description = "no.of public subnets that needs to be created"
}

variable "private_subnet_count" {
  type        = number
  description = "no.of private subnets that needs to be created"
}

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "Public Subnet CIDR values"
}

variable "private_subnet_cidrs" {
  type        = list(string)
  description = "Private Subnet CIDR values"
}