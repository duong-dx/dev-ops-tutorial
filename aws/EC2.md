<h3>EC2 - Elastic Compute Cloud</h3>
1. EC2 Sizing and configuration options
- operating system: Linux, Window, Mac Os
- Compute Power & Cores(CPU): diverse(đa dạng)
- Random -access memory(RAM): diverse(đa dạng)
- storage space:
    + EBS: Elastic Block Stores
    + EFS: Elastic file system
    + Hardware of EC2 instance store
- Firewall rules: security group
  + inbound rules: internet to EC2 
  + outbound rules: EC2 to internet
- Bootstrap script: configure at first launch of EC2
  + bootstrapping means launching command when machines starts
  + This script running only once at the machines first start
  + EC2 user data is used to automate boot tasks such as:
    + installing updates
    + installing software
    + update software
    + download common file from internet...
2. EC2 instance type:
- You can use different type of EC2 instance that are optimised for different use case
  (bạn có thể sử dụng loại EC2 instance khác nhau, được tối ưu hóa cho trường hợp sử dụng khác nhau)
- AWS EC2 has the following name convention:
  m5.2xlarege
  - m: instance class
  - 5: generation of instance (thế hệ của instance)
  - 2xlarege: represented the size (đại diện cho kích cỡ của instance)
- EC2 great for diversity of workloads such as web servers or code repositories
  (EC2 tuyệt vời cho kkhoois lượng công việc đa dạng, chẳng hạn như máy chủ web hoặc kho lưu trữ code)
- balance between: (cân bằng giữa)
  + compute: tính toán
  + memory: bộ nhớ
  + networking:  mạng lưới, mạng


  2.1 Compute optimized: => Name is "C" : C5, C6...
  Great for compute-intensive task that require high performance processors:
    (Tuyệt vời cho công việc tính toán chuyên sâu, vì đó yêu cầu bộ xử lý hiệu suất cao)
  Use case: 
  + batch processing workload: xử lý hàng loạt công việc
  + media transcoding: mã hóa tiện ích
  + High performance web servers: máy chủ web hiệu suất cao
  + high performance computing: điện toán hiệu suất cao
  + scientific modeling & machine learning: học máy
  + Dedicated gaming servers: máy chủ game chuyên dụng


  2.2 Memory optimized: => name "R", "X" => "R5, R5a", "X1, X1e"
  + Fast performance for workload that process large data set in memory
    (Khối lượng công việc hiệu xuất nhanh, xử lý dữ liệu lớn lưu vào trong bộ nhớ)
  Use case:
  + high performance for relation/ non-relation database : Hiệu suất cao cho cơ sở dữ liệu có quan hệ hoặc phi quan hệ
  + Distribute web scale caches store: phân phối mở rộng bộ nhớ cache
  + in-memory database optimized for BI (Business intelligence) : trong cơ sở dữ liệu bộ nhớ tối ưu hóa cho nghiệp vụ thông minh
  + Application performing real-time processing of big unstructured data: ứng dụng thực hiện xử lý thời gian thực của dữ liệu lớn không có cấu trúc 
  
  2.3 Storage optimized: Name "I", "H", "G"
  + Great for storage-intensive task the required high, sequential read and write access to large data set on local storage
    (Tuyệt vời cho tác vụ yêu cầu cao về lưu trữ chuyên sâu, quyền đọc, ghi vào trong dập dữ liệu lớn dưới kho lưu trữ cục bộ)
  Use case:
  + Relation & no SQL databases
  + Data warehousing applications: ứng dụng lưu trữ dữ liệu
  + distribute file system: hệ thống tập tin phân tán


3.Security group:
 - Security group is fundamental of network security in AWS: Security group là nguyên tắc cơ banr của an toàn mạng trong AAWS 
 - they control how traffic is allowed into or out of EC2 instance: Nó kiểm soát truy cập được phép vào và ra của EC2
 - Security group only contain allow rule: Security group chỉ chưa các quy tắc được pheps 
  (Nghĩa là không chứa các quy tắc không được phép. ví dụ cho phép truy cập vào cổng 80, chứ không được có cấm truy cập vào cổng 80)
 - Security group rule can reference by IP or by "other Security group":
  Security group phụ thuộc vào ip đến hoặc em ip đến có đến từ  Security group được cấp phép không
 - Security group are acting as "firewall" on EC2 instance: Security group đóng vai trò là tường lửa của EC2
 - they regulate: nó điều tiêt qua
   + access to Port: cổng truy cập đến và đi
   + IPv4 & ipv6: địa chỉ đến và đi
   + control of inbound network (from internet to EC2 instance) 
   + control of outbound network (from EC2 instance to internet)

 3.1 Security group Good to know:
   + can be attached Security group to "multiple instances": Security group có thể add cho nhiều EC2
   + Security group lock to region / VPC combination: Security group chỉ được áp dụng trong vùng nhất định
   + Security group outside the EC2: Security group nằm bên ngoài EC2 chỉ là nó được đính kèm vào EC2
   + all inbound traffic is block by default: mặc định tất cả truy cập vào bị chặn
   + all inbound traffic is authorized by default: mặc định tất cả truy cập đi ra được ủy quyền
 
 3.2 Classic Port using
  + 22 = SSH (secure shell) - log into a linux instance
  + 21 = STP (File transfer protocol) - upload file into a file share
  + 22 = SFTP (Secure File transfer protocol): upload file using SSH
  + 80
  + 443
  + 3389 = RDP (Remote Desktop Protocol) - log into window instance


4. Add IAM ROLE to EC2 instance
- Choose EC2 instance > choose Actions > Security > Modify IAM role


5. EC2 instance Purchasing Options: Lựa chọn mua lại để tối ưu chi phí

- Kind:
  + On-Demand Instance - short workload, predictable pricing : Instance sử dụng theo much đích - dùng bao nhiêu trả bấy nhiêu, phù hợp cho thời gian ngắn
  + Reserved (1 & 3 years): Instance dạng đặt trước .có 2 loại
      + Reserved standard: long workloads - Reserved tiêu chuẩn: yêu cầu thời gian công việc dài nhưng không thể đổi được instance Family.
        ví dụ có thể tối t2 sang t3, nhưng không thể đổi t2 => x2 
      + Convertible Reserved instance - long workload with flexible instance: yêu cầu thời gian công việc dài, đổi được instance Family, instance type, platform
  + Saving plans(1 & 3 years): commitment to an amount of usage, long worklooad - cam kết số lượng sử dụng và thời gian dài
  + Spot instance: short workload, cheap, can lose instance (less reliable) 
   Khối lượng công việc ngắn, giá rẻ, có thể bị mất bất cứ lúc nào do AWS lấy (không đáng tin cậy - giá sẽ thay đổi theo thời gian)
  + Dedicated Hosts: book a entire physical server : Máy chủ chuyên dụng : giá đắt nhất cung cấp luôn cho 1 máy chủ vật lý thật
  + Dedicated Instances: no other customer will share your hardware 
  + Capacity Reservations: reserve capacity in a specific Availability Zone For any duration 
    Dự trữ công suất trong 1 Availability Zone cho bạn bất kì thời gian nào

5.1 On-Demand Instance
 + Pay for what you use
   + LinuxOS or Window OS (operating systems) : billing per seconds, after the first minute: với linux và window, hóa đơn tính theo từng giây, sau phút đầu sử dụng
   + All other operating systems - billing per hours
 + has the highest cost but no upfront payment: có chi phí cao và không có trả trước
 + No long-term commitment: không có cam kết dài hạn
 + Recommended for short-term and un-interrupted workloads: lời khuyên cho khối lượng công việc ngắn hạn và không bị gián đoạn

5.2 Reserved Instances:
+ Reserved standard:
  + Up to 72% discount compared to "On-Demand" 
  + Reserved a specific instance attributes (Instance type, Region, Os): Giá sẽ còn phụ thuộc và các thuộc tính như loại , Os, vùng
  + Reserved period - 1 years or 3 years : thuê 1 năm với 3 năm giá khác nhau
  + Payment options: No Upfront (same On-Demand), partial Upfront, all upfront
    Không trả trước giá sẽ như "On-Demand", trả trước 1 phần giá sẽ tính kiểu khacs, trả trước hoàn toàn giá sẽ khác
+ Convertible Reserved instance:
  + Can change the EC2 instance type, family, Os
  + Up to discount 66%

5.3 Saving Plans
+ get a discount based on long-term using (up to 72% - same Reserved Instances)
+ Locked to specific instance family & AWS region (e.g M5 in "us-east-1")
+ Flexible across:
  + instance size (e.g M5.xlarge, M5.2xlarge, M5.3xlarge)
    + OS (e.g Linux, Window)

5.4 Spot instance
+ get a discount based on short-term using (up to 90% - same Reserved Instances)