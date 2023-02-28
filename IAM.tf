resource "aws_iam_policy" "WebAppS3" {
  name        = "webapps3_policy"
  path        = "/"
  description = "My My webapp s3 policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:ListBucket",
          "s3:DeleteObject",
          "s3:GetObjectVersion",
          "s3:CreateBucket",
          "s3:DeleteBucket",
          "s3:DeleteObjectTagging",
          "s3:GetBucketLocation",
          "s3:GetBucketTagging",
          "s3:GetObjectAttributes",
          "s3:GetObjectTagging",
          "s3:ListAllMyBuckets",
          "s3:PutBucketLogging",
          "s3:PutObjectTagging",
        ]
        Effect = "Allow"
        "Resource" : [
          "arn:aws:s3:::${local.bucket_name}",
          "arn:aws:s3:::${local.bucket_name}/*"
        ]
      },
    ]
  })
}

resource "aws_iam_role" "EC2-CSYE6225" {
  name = "EC2-CSYE6225"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })

  tags = {
    Name = "EC2-CSYE6225"
  }
}

resource "aws_iam_policy_attachment" "ec2_policy_role" {
  name       = "ec2attachment"
  roles      = [aws_iam_role.EC2-CSYE6225.name]
  policy_arn = aws_iam_policy.WebAppS3.arn

}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "ec2_profile"
  role = aws_iam_role.EC2-CSYE6225.name
}