1. Cài đặt chocolatey
> $ Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

2. dùng chocolatey install minikube
(minikube là công cụ để tạo 1 kube master và có duy nhất 1 node cho test dưới local)
> $ choco install minikube

3. install Hyper-V virtual machine
> $ Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All

4. start minikube
> $ minikube start --vm-driver=[driver_name]
> $ minikube start --vm-driver=docker
> $ minikube start --vm-driver=hyperv

5. ssh to minikube
> $ minikube ssh

6. open minikube dashboard
- go to minikube-ip:30000
> $ minikube dashboard

