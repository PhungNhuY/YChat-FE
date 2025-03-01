build with arm64 architecture

```bash
docker run --privileged --rm tonistiigi/binfmt --install all
docker buildx build -t yphung282/ychat-fe-arm --platform linux/arm64 .
```
