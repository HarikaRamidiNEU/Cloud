module "mynetwork" {
  source = "./module/networking"
  cidr   = "10.10.0.0/16"
}
