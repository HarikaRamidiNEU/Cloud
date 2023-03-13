resource "aws_route53_record" "ec2Instance" {
  zone_id = var.hostedZoneID
  name    = var.route53RecordName
  type    = "A"
  ttl     = 60
  records = [aws_eip.lb.public_ip]
}