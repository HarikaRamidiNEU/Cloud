variable "cidr" {
  type = string
}

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "Public Subnet CIDR values"
  default     = ["10.10.1.0/24", "10.10.2.0/24", "10.10.3.0/24"]
}

variable "private_subnet_cidrs" {
  type        = list(string)
  description = "Private Subnet CIDR values"
  default     = ["10.10.4.0/24", "10.10.5.0/24", "10.10.6.0/24"]
}

variable "public_azs" {
  type        = list(string)
  description = "Availability Zones"
  default     = ["us-east-1a", "us-east-1b", "us-east-1c"]
}


variable "private_azs" {
  type        = list(string)
  description = "Availability Zones"
  default     = ["us-east-1e", "us-east-1d", "us-east-1f"]
}
