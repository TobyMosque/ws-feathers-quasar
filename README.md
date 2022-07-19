**how to test the backend**

run the backend
```bash
yarn workspace backend dev
```
access the swagger ui
```bash
http://localhost:3030/api/docs/ #Swagger UI
```

**how to test the frontend**

compile the backend:
```bash
yarn workspace backend compile
```
so run the frontend
```bash
yarn workspace frontend quasar dev -m ssr
```
access the frontend
```bash
http://localhost:9100/ #frontend
and
http://localhost:9100/api/docs/ #Swagger UI
```