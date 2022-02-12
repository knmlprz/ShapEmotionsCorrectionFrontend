# Frontend for Shap Emotions Correction

## How to run
1. Run sentiment API:
``` commandline
docker run -p 8000:8000 finloop/shap-emotions-correction-api:latest
```
1. Intall npm dependencies:
``` commandline
npm install
```

3. Run server:

``` commandline
npx parcel src/index.html
```