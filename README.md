**how to test the backend**

run the backend
```bash
yarn # install depedencies
yarn workspace backend dev
```
access the swagger ui
```bash
http://localhost:3030/api/docs/ #Swagger UI
```

**how to test the frontend**

run the frontend:
```bash
yarn # install depedencies
# you would compile the backend at least once and after update the source of the backend
yarn workspace backend compile
yarn workspace frontend quasar dev -m ssr
```
PS: the HRM only works to the frontend.

access the frontend
```bash
http://localhost:9100/ #frontend
and
http://localhost:9100/api/docs/ #Swagger UI
```