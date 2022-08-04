-----------------------------------------------------------------------------
|                   CÁC VẤN ĐỀ                                              |
-----------------------------------------------------------------------------

1. Khi ta update version của image làm sao để pod update lại container trên đó ?
- điều kiện tiên quyến, sẽ không được xóa pod đó đi vì sẽ ảnh hưởng đến hệ thống đang hoạt động
- Thứ 2: verison của docker image luôn là latest ví dụ duong1200798/multi-client
- Solution:
 (a). Cách 1
 + chỉ định phiên bản khi release docker-image (Cho version và env để tích hợp cho cả khi push và pull trong k8s)
 + Nhược điểm:
    . Nếu source code thay đổi liên tục thì phải đánh version liên tục, release update liên tục
    . khi release sẽ đều phải update tag version
    . Số lượng image nhiều sẽ phải đi update lại hết

 (b). cách 2
 + sử dụng command line để redeploy K8s
 + Bước 1: rebuild image docker: docker build -t duong1200798/multi-client:v2 -f Dockerfile .
 + Bước 2: push image docker hub: docker push duong1200798/multi-client:v2
 + Bước 3: run: kubectl set image [object]/[object_name] [container_name]=[image_name]:[version]
           run: kubectl set image deployment/client-deployment client=duong1200798/multi-client:v2