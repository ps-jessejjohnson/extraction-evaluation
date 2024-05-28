
# Engine Performance Testing

Evaluation of headless extraction techniques.

## Using

1. [Build](#build-docker-image) Docker image
2. Run [Host](#run-host-container) container
3. Run [Target](#run-target-container) container

### Build Docker Image

```shell
docker build -t extracteval:latest . 
```

### Run Host Container

```shell
docker run -dit --rm --name extract-eval-host -p 8080:80 -v ./host:/usr/local/apache2/htdocs/ httpd
```

### Run Target Container

Testing is isolated to individual extraction methods. The only thing that differs in the commands below are the `target` environment variables.

#### Native

```shell
docker container run -it --rm --memory=512m --memory-swap=512m --memory-swappiness=0 --cpus=1 --security-opt seccomp=$(pwd)/chrome.json -e host="http://host.docker.internal:8080" -e iterations=10000 -e target=native extracteval:latest
```

#### SyphonX

```shell
docker container run -it --rm --memory=512m --memory-swap=512m --memory-swappiness=0 --cpus=1 --security-opt seccomp=$(pwd)/chrome.json -e host="http://host.docker.internal:8080" -e iterations=10000 -e target=syphonx  extracteval:latest
```
