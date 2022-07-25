**how to test the backend**

run the backend
```bash
yarn # install depedencies
yarn backend:dev
```
access the swagger ui
```bash
http://localhost:3030/api/docs/ #Swagger UI
```

**how to test the frontend**

run the frontend:
```bash
yarn # install depedencies
yarn backend:compile # you would compile the backend if you wanna embed that into the frontend
yarn frontend:dev # or `yarn frontend:dev2` if you don't wanna to embed the backend, don't forget to run `yarn backend:dev`in parallel
```
PS: the HRM only works to the frontend.

access the frontend
```bash
http://localhost:9100/ #frontend
and
http://localhost:9100/api/docs/ #Swagger UI (only if embeded)
```
