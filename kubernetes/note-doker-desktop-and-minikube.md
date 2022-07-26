1. Cài đặt chocolatey
> $ Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

2. dùng chocolatey install minikube
(minikube là công cụ để tạo 1 kube master và có duy nhất 1 node cho test dưới local)
> $ choco install minikube

3. Show all context
Trên máy window đang dùng 2 context khác nhau
> $ kubectl config get-contexts

4. đổi context
> $ kubectl config use-context [context_name]
> $ kubectl config use-context docker-desktop

5. apply file kubernetes
> $ kubectl apply -f [file_name]
> $ kubectl apply -f client-pod.yaml

6. K8s get all pod
> $ kubectl get pods
- K8s get all pod advanced
> $ kubectl get pods -o wide

7. K8s get all pod with labels
> $ kubectl get pods --show-labels

8. K8s get all services
> $ kubectl get services

9. K8s show detail all pod
> $ kubectl describe pods

10. K8s show detail 1 pod
> $ kubectl describe pod [pod_name]
> $ kubectl describe pod client-pod

11. K8s show list pod với thuộc tính
> $ kubectl get pod -L [options]
> $ kubectl get pod -L environment

11. K8s show list pod với giá trị của thuộc tính
> $ kubectl get pod -l [options]=[value]
> $ kubectl get pod -l environment=production
> $ kubectl get pod -l environment=develop

12. get all namespace
> $ kubectl get ns

13. tạo mới 1 namespace
> $ kubectl create ns [namespace]
> $ kubectl create ns testing

14. get all pods using namespace
> $ kubectl get pod -n [namespace]
> $ kubectl get pod -n testing

14. delete post on namespace
> $ kubectl delete pod [pod-name] -n [namespace]
> $ kubectl delete pod hello-kube-testing -n [testing]

15. delete namespace
> $ kubectl delete ns testing

16. show list replication controller
> $ kubectl get rc

17. delete replication controller (khi xóa thì các pod của nó cũng bị xóa theo)
> $ kubectl delete rc [replication-controller-name]
> $ kubectl delete rc replication-controller-name

18. xóa config file
> $ kubectl delete -f [file-name.extensions]
> $ kubectl delete -f [file-name.extensions]

19. K8s get deployment
> $ kubectl get deployments

20. K8s Redeployment
> $ kubectl set image [object]/[object_name] [container_name]=[image_name]:[version]
> $ kubectl set image deployment/client-deployment client=duong1200798/multi-client:v2

21. check quá trình update lại các pod của deployment
> $ kubectl rollout status deploy [deployment_name]
> $ kubectl rollout status deploy deployment_name

22. Show history của deployment
> $ kubectl rollout history deploy

23. rollback deployment to history version
> $ kubectl rollout undo deployment [deployment_name] --to-revision=[version]
> $ kubectl rollout undo deployment deployment_name --to-revision=2

24. get log of pod
> $ kubectl logs my-pod

25. create secret key
> $ kubectl create secret [type] [name] --from-literal key=value
> $ kubectl create secret generic postgres-password --from-literal POSTGRES_PASSWORD=password


26. Turn on/of hyper-v in window
- on :
> $ DISM /Online /Enable-Feature:Microsoft-Hyper-V
> $ bcdedit /set hypervisorlaunchtype auto
chạy xong cần restart máy

- off :
> $ DISM /Online /Disable-Feature:Microsoft-Hyper-V
> $ bcdedit /set hypervisorlaunchtype off
chạy xong cần restart máy