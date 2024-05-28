
# Engine Performance Testing

Repository used to build and execute performance testing for various extraction methods.

## Host

To minimize uncontrolled influence, its best to stand up a HTTP server to use for testing.

### httpd

```shell
docker run -dit --rm --name extract-eval-host -p 8080:80 -v ./host:/usr/local/apache2/htdocs/ httpd
```

## Target

Testing is isolated to individual extraction methods.

### Native

```shell
docker container run -it --rm --memory=512m --memory-swap=512m --memory-swappiness=0 --cpus=1 --security-opt seccomp=$(pwd)/chrome.json -e host="http://host.docker.internal:8080" -e iterations=10000 -e target=native extracteval:latest
```

### SyphonX

```shell
docker container run -it --rm --memory=512m --memory-swap=512m --memory-swappiness=0 --cpus=1 --security-opt seccomp=$(pwd)/chrome.json -e host="http://host.docker.internal:8080" -e iterations=10000 -e target=syphonx  extracteval:latest
```
