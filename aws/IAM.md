1. CLI: Command line interfaces
2. SDK: software developer kit (it has different between types of programs language)
3. hands on CLI
   
- Go to IAM > User detail > choose tab "Security credentials" > "Create access key"
> $ aws configure -> enter parameter

> AWS Access Key ID [None]: AKI

> AWS Secret Access Key [None]: JYthm

> Default region name [None]: asia-southeast-1

- Test show list user
> $ aws iam list-users

4. IAM Role
- create or add manager role for some one Service of AWS

- IAM > Role > Create Role > Choose type "AWS service" or another
- go ahead choose "service" >  choose "Permission Policy" for "Role"

5. IAM security tool
- IAM credentials report: report list all your account users and status the info credentials