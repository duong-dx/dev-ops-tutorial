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
- IAM credentials report (báo cáo xác thực thông tin đăng nhập): 
    nó sẽ chứa tất cả các user, nó sẽ chứa các trạng thái và thông tin xác thực về nó
- IAM access advisor (for subaccount): cố vấn truy cập 
    Nó sẽ cung cấp các quyền sử dụng dịch vụ cho người dùng và khi người dùng sử dụng dịch vụ đó lần cuối.
    Nhờ access advisor có thể biết được người dùng sử dụng dịch vụ nào và từ đó sẽ giới hạn những dịch vụ mà nó không sử dụng
- IAM credentials report
  - Choose IAM Dashboards > Choose "credential report" > "Download Report"  
- IAM access advisor:
  - Choose "User" > "User Detail" > "Access Advisor" 
- IAM best practice:
  - Don't use the root account except for AWS account setup
  - One physical user = one AWS user
  - Assign user to Group and add permission for group
  - create strong password policy
  - use and enforce the use of "MFA(Multiple Factor Authentication) "
  - Create and use Role for giving permission to AWS service
  - use access key for Programmatic access (CLI - command line interface, SDK - software developer kit)
  - audit permission of your account with the "IAM credential report"
  - check activity of your account with the "IAM access advisor"
  - Never share access key and secret key for other user
=> IAM section - summary
  - Users: mapped to a physic user, has password for AWS console
  - Groups: contain users only, but not contain groups another
  - Policies: Json document that outlines permission for users or group
  - Roles: for EC2 instance or AWS services. (Example: i want create EC2 instance, my user need Role has permission Create EC2)
  - Security: MFA(Multiple Factor Authentication) & Password policy
  - access keys: access AWS for using the CLI(Command line interface) and SDK (software developer kit)
  - audit: IAM access advisor & IAM credential report
  - 
  - 