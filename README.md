# Frontend for Shap Emotions Correction

This demo detects sentiment (positive/neutral/negative)

![](docs/gifs/Emotions.gif)

the predictions update as you type

![](docs/gifs/Hello.gif)

## How to run

1. Run sentiment API:

```commandline
docker run -p 8000:8000 finloop/shap-emotions-correction-api:latest
```

1. Intall npm dependencies:

```commandline
npm install
```

3. Run server:

```commandline
npx parcel src/index.html
```
