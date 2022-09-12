# 1. generate root access keys
aws configure --profile [profile-name (đặt tùy ý)]
aws configure --profile root-duongdx-mfa-delete-demo

# 2. show all s3 bucket of profile
aws s3 ls --profile [profile-name (1)]
aws s3 ls --profile root-duongdx-mfa-delete-demo

# 3. check status of bucket
aws s3api get-bucket-versioning
--bucket [bucket-name]
--profile [profile-name (1)]
# e.g
aws s3api get-bucket-versioning
--bucket demo-s3-duongdx-2022
--profile root-duongdx-mfa-delete-demo

# 4. enable mfa delete
aws s3api put-bucket-versioning
--bucket [bucket-name]
--versioning-configuration Status=Enabled,MFADelete=Enabled
--mfa "[arn-of-mfa-device mfa-code-from-phone-or-hardware]"
--profile [profile-name (1)]

# e.g
aws s3api put-bucket-versioning
--bucket demo-s3-duongdx-2022
--versioning-configuration Status=Enabled,MFADelete=Enabled
--mfa "arn:aws:iam::222222:mfa/root-account-mfa-device 111111"
--profile root-duongdx-mfa-delete-demo

# 5. disable mfa delete

aws s3api put-bucket-versioning
--bucket [bucket-name]
--versioning-configuration Status=Enabled,MFADelete=Disabled
--mfa "[arn-of-mfa-device mfa-code-from-phone-or-hardware]"
--profile [profile-name (1)]

# e.g
aws s3api put-bucket-versioning
--bucket demo-s3-duongdx-2022
--versioning-configuration Status=Enabled,MFADelete=Disabled
--mfa "arn:aws:iam::222222:mfa/root-account-mfa-device 111111"
--profile root-duongdx-mfa-delete-demo