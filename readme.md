
# Extraction Evaluation

Evaluation of headless extraction techniques.

## Using

1. [Build](#build-extracteval-docker-image) `extracteval` Docker image
2. Run [Host](#run-host-container) Docker container
3. Run [extracteval](#run-extracteval-container) Docker container

### Build `extracteval` Docker Image

This is the image that contains the evaluation logic.

```shell
docker build -t extracteval:latest . 
```

### Run Host Container

This is the host that will be targetted by extractions.


```shell
docker run -dit --rm --name extract-eval-host -p 8080:80 -v ./host:/usr/local/apache2/htdocs/ httpd
```

### Run `extracteval` Container

Evaluation is isolated to individual extraction methods. The only thing that differs in the commands below are the `target` environment variables.

#### Playwright (Native)

```shell
docker container run -it --rm --memory=512m --memory-swap=512m --memory-swappiness=0 --cpus=1 --security-opt seccomp=$(pwd)/chrome.json -e host="http://host.docker.internal:8080" -e iterations=10000 -e target=native extracteval:latest
```

#### Playwright (SyphonX via jQuery)

```shell
docker container run -it --rm --memory=512m --memory-swap=512m --memory-swappiness=0 --cpus=1 --security-opt seccomp=$(pwd)/chrome.json -e host="http://host.docker.internal:8080" -e iterations=10000 -e target=syphonx  extracteval:latest
```
