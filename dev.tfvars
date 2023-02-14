profile = "dev"
cidr    = "10.0.0.0/16"
vpcName = "Dev VPC"
public_subnet_cidrs = [
  "10.0.1.0/24",
  "10.0.2.0/24",
  "10.0.3.0/24",
  "10.0.4.0/24",
  "10.0.5.0/24",
  "10.0.6.0/24",
  "10.0.7.0/24",
  "10.0.8.0/24",
]
private_subnet_cidrs = [
  "10.0.101.0/24",
  "10.0.102.0/24",
  "10.0.103.0/24",
  "10.0.104.0/24",
  "10.0.105.0/24",
  "10.0.106.0/24",
  "10.0.107.0/24",
  "10.0.108.0/24",
]
public_subnet_count  = 3
private_subnet_count = 3
igwName              = "dev public internet gateway"
public_route_table   = "DevPublicRouteTable"
private_route_table  = "DevPrivateRouteTable"
public_azs = [
  "a",
  "b",
  "c",
]
private_azs = [
  "d",
  "e",
  "f",
]
