# use an existing docker image as a base
FROM alpine:3.16

# dowload and install a dependency
RUN apk add --update redis
RUN apk add --update gcc
# note nếu giữ nguyên vị trí update redis => gcc với nhau thì nó sẽ sử dụng use cached nếu đã được build trước đó
# nếu đảo ngược lại so với lần build trước: gcc trươc => redist. không sử dụng cached

# tell the image  what to do when it starts
# as as container
CMD ["redis-server"]