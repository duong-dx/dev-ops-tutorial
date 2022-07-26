####. Kubernetes
- Kubernetes được sinh ra để quản lý các container
- Kubernetes bao gồm 2 thành phần chính
    + Master nodes (control plane)
    + Worker nodes

1. Master node
- Master nodes bao gồm 4 thành phần chính là API server, controller manager, Scheduler, Etcd (mình sẽ giải thích rõ chức năng của từng thành phần trong bài viết khác):
    + API server: thành phần chính để giao tiếp với các thành phần khác
    + Controller manager: gồm nhiều controller riêng cụ thể cho từng resource và thực hiện các chứng năng cụ thể cho từng thằng resource trong kube như create pod, create deployment, v...v...
    + Scheduler: schedules ứng dụng tới node nào
    + Etcd: là một database để lưu giữ trạng thái và resource của cluster
2. Worker node
Worker node gồm 3 thành phần chính như:
    + Container runtime (docker, rkt hoặc nền tảng khác): chạy container
    + Kubelet: giao tiếp với API server và quản lý container trong một worker node
    + Kubernetes Service Proxy (kube-proxy): quản lý network và traffic của các ứng dụng trong woker node

3. POD
- POD là thành phần nhỏ nhất trong K8s
- POD là thành phần của Worker Node
- POD được sinh ra để quản lý các 1 hoặc 1 nhóm containers
- POD có khả năng tự restart lại container nếu có bị FAIL


4. Replication Controllers
- replication controller có thể control được trên nhiều NODE, mỗi node có thể controll "nhiều POD"
- replication controller sinh ra để quản lý các pod "thông qua labels của pod"
- Vì sao cần dùng Replication Controllers
    + Do pod quản lý các container, nhưng khi các container bị sập hết => pod cũng sập
    + Nên khi sử dụng Replication Controllers sẽ đảm bảo được số pod của Worker Node đó luôn được duy trì
- Có thể tăng performance của ứng dụng khi sử dụng replication controller bằng các sử dụng nhiều replica trong replication controller
  để replication controller tạo nhiều pod

5. ReplicaSet
- ReplicaSet có thể control được trên nhiều NODE, mỗi node có thể controll "nhiều POD"
- ReplicaSet giống với replication controller
- nhưng replicaSet sẽ khác replication controller ở phần label selector. replicaSet có thể lấy nhiều thuộc tính hơn,
 trong khi chỉ lấy đc label selector mà replication controller đã chỉ định

6. DaemonSets
- DaemonSets có thể control được trên nhiều NODE, mỗi node có thể controll "1 POD"
- DaemonSets giống với replication controller

6. Kubernetes Services
- Kubernetes Services là một resource sẽ tạo ra 1 single, constant point cho 1 hoặc nhóm POD mà nó đứng sau
- mỗi Service sẽ có 1 ip, port không đổi cho đến khi nó bị xóa đi
- Client hoặc các ứng dụng khác mở kết nối đến Service sẽ kết nối được đến Container mà nó đứng sau
- Đặt vấn đề tại sao phải dùng đến service ?
    + Khi một pod là phù du, với bất cứ lý do nào nó bị xóa đi hoặc die.
    Hoặc khi ta thay đổi template của 1 POD thì pod cũ được xóa đi và được tạo mới trên một Node khác,
    => thì ip của POD đó được thay đổi. nếu ta dùng ip cũ connect thì sẽ sai và phải đi sửa lại code
    + Khi ta dùng ReplicaSet để tạo các Pod, ví dụ replicaSet = 3 thì làm sao để ta có thể biết sử dụng POD nào ?
    => sử dụng Services và dùng endpoint của service
- Service quản lý connection như thế nào:
    + service sử dụng "label của POD" để quản lý
- Service sẽ có 4 loại cơ bản là:
 + ClusterIP
 + NodePort
 + ExternalName
 + LoadBalancer

 (a). ClusterIP
     - loại service sẽ tạo một IP và local DNS.
     => IP và local DNS có thể truy cập ở bên trong cluster nhưng không thể truy cập từ bên ngoài.
      được dùng chủ yếu cho các Pod ở bên trong cluster dễ dàng giao tiếp với nhau.
 (b). NodePort
    - là loại service cung cấp port để truy cập từ bên trong cluster bằng IP và DNS,
    - nodePort truy cập từ bên ngoài client vào sẽ range từ 30000 - 32767
 (c). LoadBalancer
    - Tạo ra Public IP giúp client có thể kết nối được ip ở trong POD
    - Chỉ sử dụng được khi thực hiện deploy kubernetes trên cloud có hỗ trợ "LoadBalancer Service"
 (d). Ingress resource
    Ingress là một resource cho phép chúng ta expose HTTP and HTTPS routes từ bên ngoài cluster tới service bên trong cluster của chúng ta.
    Ingress sẽ giúp chúng ta gán một domain thực tế với service bên trong cluster.

ví dụ : https://viblo.asia/p/kubernetes-series-bai-4-services-expose-traffic-cho-pod-Ljy5VDm9Zra

5. K8s deployment
- deployment là một resource của K8s giúp ta cập nhật mới 1 version của ứng dụng dễ dàng
   nó sẽ cung cấp cho ta 2 strategy là recreate và rollingupdate. tất cả điều này điều chạy
   ngầm bên dưới và có history đằng sau. có thể linh hoạt mà không cần thông qua CI/CD
- Khi ta thực hiện redeployment update pod thì replicaset cũ sẽ không bị xóa đi.
 Nếu version mới có lỗi thì ta có thể rollback lại ngay lập tức với replicaset cũ

6. Volumes trong K8s
- Volume hiểu đơn giản là một mount point từ hệ thống của server vào bên trong container
- Tại sao nên sử dụng volumes:
 + Vì khi một container được up lên thì chỉ lưu đc dữ liệu trong chính container đó không chi sẻ
    và pod của container đó down thì dữ liệu sẽ bị xóa
 + Với dữ liệu trên một Pod cũng như vậy
- Các loại volumes:
 + emptyDir
 +  hostPath
 +  gitRepo
 +  nfs
 +  gcePersistentDisk, awsElasticBlockStore, azureDisk (cloud storage)
 +  cinder, cephfs, iscsi, flocker, glusterfs, quobyte, rbd, flexVolume, vsphereVolume, photonPersistentDisk, scaleIO
 +  configMap, secret, downwardAPI
 +  PersistentVolumeClaim
Cơ bản sẽ chia làm 3 dạng chính:
 + volume dùng để chia sẻ dữ liệu các container trong POD
 + volume đính kèm vào trong filesystem của một NODE
 + Volume đính kèm vào cluster và các node khác nhau có thể truy cập
=> Tìm hiểu trước về 4 volume:

(a) emptyDir volume (ví dụ xem trong volumes/empty-dir)
 - Tác dụng : để chia sẻ dữ liệu giữa các container trong 1 POD.
 Ví dụ là dữ liệu log từ một thằng container chạy web API, và ta có một thằng container khác sẽ truy cập vào log đó để xử lý log.
 - Cấu trục và hoạt động:
    + nó sẽ thực hiện khởi tạo ra một thư mục trống
    + Nó sẽ bị xóa đi khi Pod bị down

 (b) gitRepo (ví dụ xem trong volumes/git-repo)
 - Tác dụng: sử dụng để clone github repository
 - Hoạt động:
    + nó sẽ tạo ra 1 folder trống và clone git repo vào đó
    + chỉ để chia sẻ trong 1 POD
    + chỉ clone được public repo
    + với private repo cần tìm hiểu về "sidecar container"
 (c). hostPath volume
 - Tạo ra 1 volume mount folder với folder của node
 (d). cloud storage
 - Tác dụng để lưu trữ dữ liệu, chia sẻ dữ liệu với các cluster hoặc trong cùng cluster
 - Sẽ không bị thất thoát dữ liệu dù cluster hoặc node có bị xóa ...
 - 3 nền tảng cloud mà phổ biến nhất là
  + AWS: awsElasticBlockStore
  + Goolge Cloud: gcePersistentDisk
  + Azure: azureDisk.

7. PersistentVolume và PersistentVolumeClaim
- như volume ở bên trên thì ta cần quan tâm đến cơ sở hạ tầng của volume
- Nhưng "PersistentVolume và PersistentVolumeClaim" không cần quan tâm đến hạ tầng, chỉ
cần quan tâm đến Size mà sẽ sử dụng
- PersistentVolume là resource sinh ra để tiêu thụ và tương tác với storage.
 Còn PersistentVolumeClaim là resource sinh ra để request và tương tác với PersistentVolume

* trong Kubernetes sẽ chia làm 2 role:
- Kubernetes admin: người dựng và quản lý kubernetes cluster, cài những plugin và addons cần thiết cho kubernetes cluster.
- Kubernetes developer: người mà sẽ viết file config yaml để deploy ứng dụng lên trên kubernetes.

=> Kubernetes admin: sẽ tạo PersistentVolume và thiết kế hạ tầng của "PersistentVolume"
Kubernetes developer: sẽ tạo PersistentVolumeClaim dựa trên config của PersistentVolume

- Ví dụ "./volumes/PersistentVolume"

* Recycling PersistentVolumes
- persistentVolumeReclaimPolicy: sẽ định nghĩa hoạt động của PersistentVolumes
như thế nào khi PersistentVolumeClaim bị xóa :
+ Retain: duy trì và chờ kết nối mới, "Dữ liệu vẫn còn đó"
+ Recycle: duy trì và chờ kết nối mới, "Dữ liệu bị xóa"
+ Delete: Xóa hết

* Tự động cấp PersistentVolumes (Dynamic provisioning)
 Để tránh việc việc admin phải tạo PersistentVolume thì K8s hỗ trợ tạo PersistentVolumeClaim và tự tạo PersistentVolume
- admin phải tạo PersistentVolume: Pre provisioning
- PersistentVolumeClaim và tự tạo PersistentVolume: Dynamic provisioning
=> muốn làm được việc này cần phải tạo StorageClass
- Ví dụ "./volumes/PersistentVolume/storage-class"
https://viblo.asia/p/kubernetes-series-bai-7-persistentvolumeclaims-tach-pod-ra-khoi-kien-truc-storage-ben-duoi-6J3Zgyeq5mB

8. Environment - configmap - secret
- Environment: truyền env vào trong container
- configmap:
    + 1. Tạo mới một file config map data là chứa thông tin Environment để sử dụng khi tạo pod
    + 2. data chứa content của 1 file (ví dụ: ./environment)
- secret: tạo mới 1 secret để cho bảo mật:
> $ kubectl create secret [type] [name] --from-literal key=value
> $ kubectl create secret generic postgres-password --from-literal POSTGRES_PASSWORD=password

9. StatefulSets
- Giống như là replicasSet. Nhưng trong khi replica tạo ra các Pod với tên ngẫu nhiên thì
StatefulSet tạo ra các Pod đánh số index từ 0 -> n;

- Khi một pod vì 1 lý do nào đó bị kill: Cả replicas và statefulSet đều tạo ra pod mới
    + replicas tạo ra pod mới -> có tên random mới (ví dụ pod-a-453fsfsd bị chết sẽ tọa pod-a-78fdgd)
    + statefulSet tạo ra pod mới -> có tên giữ nguyên (ví dụ pod-a-0 bị chết sẽ tọa pod-a-0)

- ScaleUp và ScaleDown
    + ScaleUp tạo mới POD có index tiếp theo (ví dụ pod-a-5 tạo pod-a-6)
    + ScaleDown tạo shutdown POD có index lớn nhất (ví dụ pod-a-1 -> pod-a-6 sẽ shutdown pod-a-6)
- storage of Pod:
 + Với POD đươc quản lý bằng Replicas: Khi pod bị xóa storage sẽ bị xóa hết đi
 + Với POD đươc quản lý bằng statefulSet: Khi pod bị xóa storage vẫn còn (do statefulSet sử dụng PersistentVolumeClaim).
    Và khi pod đó được up lên dữ liệu vẫn ở nguyên đó
    Tên của PersistentVolumeClaim sẽ được đặt theo cái pod đã đặt
- Headless Service
 + Khi dùng Service ClusterIP với replicas:
    ví dụ replica name là replica-service-name + sẽ tạo 2 pod
    => DNS: replica-service-name.default.svc.cluster.local
       VirtualIP: 170.1.19.4
       IP pod-abc: 170.1.19.5
       IP pod-xyz: 170.1.19.7
 + Khi dùng Service ClusterIP với StatefulSet:
     ví dụ StatefulSet name là stateful-service-name + sẽ tạo 2 pod
     => DNS: stateful-name.default.svc.cluster.local
        DNS pod-0: stateful-service-name-0.stateful-service-name.default.svc.cluster.local
        DNS pod-1: stateful-service-name-1.stateful-service-name.default.svc.cluster.local
(ví dụ: ./template/test-stateful-set.yaml và https://viblo.asia/p/kubernetes-series-bai-9-statefulsets-deploying-replicated-stateful-applications-07LKXkXp5V4)