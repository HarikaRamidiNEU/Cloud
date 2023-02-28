resource "aws_db_parameter_group" "postgresParameterGroup" {
  name   = "my-pg"
  family = "postgres15"

  parameter {
    name  = "log_connections"
    value = "1"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_db_subnet_group" "dbSubnetGroup" {
  name       = "my db subnet group"
  subnet_ids = [aws_subnet.private_subnets[0].id, aws_subnet.private_subnets[1].id, aws_subnet.private_subnets[2].id]

  tags = {
    Name = "My DB subnet group"
  }
}

resource "aws_db_instance" "databaseInstance" {
  parameter_group_name        = aws_db_parameter_group.postgresParameterGroup.name
  apply_immediately           = true
  allow_major_version_upgrade = true
  identifier                  = "csye6225"
  allocated_storage           = 20
  engine                      = "postgres"
  engine_version              = "15"
  instance_class              = "db.t3.micro"
  db_name                     = "csye6225"
  username                    = "csye6225"
  password                    = "postgres"
  db_subnet_group_name        = aws_db_subnet_group.dbSubnetGroup.name
  multi_az                    = false
  publicly_accessible         = false
  skip_final_snapshot         = true
  vpc_security_group_ids = [
    aws_security_group.database.id,
  ]
}