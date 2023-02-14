resource "random_id" "id" {
  byte_length = 8
}
resource "aws_vpc" "main" {
  cidr_block = var.cidr
  tags = {
    Name = "${var.vpcName}-${random_id.id.hex}"
  }
}

resource "aws_subnet" "public_subnets" {
  count             = var.public_subnet_count
  vpc_id            = aws_vpc.main.id
  cidr_block        = element(var.public_subnet_cidrs, count.index)
  availability_zone = "${var.region}${element(var.public_azs, count.index)}"

  tags = {
    Name = "Public_${random_id.id.hex}_${count.index + 1}"
  }
}

resource "aws_subnet" "private_subnets" {
  count             = var.private_subnet_count
  vpc_id            = aws_vpc.main.id
  cidr_block        = element(var.private_subnet_cidrs, count.index)
  availability_zone = "${var.region}${element(var.private_azs, count.index)}"

  tags = {
    Name = "Private_${random_id.id.hex}_${count.index + 1}"
  }
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.igwName}-${random_id.id.hex}"
  }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = {
    Name = "${var.public_route_table}-${random_id.id.hex}"
  }
}

resource "aws_route_table_association" "public_subnet_asso" {
  count          = var.public_subnet_count
  subnet_id      = element(aws_subnet.public_subnets[*].id, count.index)
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.private_route_table}-${random_id.id.hex}"
  }
}

resource "aws_route_table_association" "private_subnet_asso" {
  count          = var.private_subnet_count
  subnet_id      = element(aws_subnet.private_subnets[*].id, count.index)
  route_table_id = aws_route_table.private_rt.id
}