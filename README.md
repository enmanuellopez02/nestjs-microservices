# NestJS Microservices Monorepo (demo)

Un solo repo, varias apps independientes — cada una empaqueta y despliega por separado.

## Estructura

```
apps/
  api-gateway/       HTTP público (puerto 3000)
  users-service/     microservicio TCP (3001)
  products-service/  microservicio TCP (3002)
  orders-service/    microservicio TCP (3003), llama a users + products
libs/common/         DTOs y constantes compartidas (alias @app/common)
docker/Dockerfile    genérico, parametrizado por --build-arg APP=<app>
docker-compose.yml   levanta los 4 servicios juntos en local
.github/workflows/ci-cd.yml   buildea/despliega solo lo que cambió
```

Solo el **api-gateway** expone HTTP. El resto se comunica vía TCP (`@nestjs/microservices`). Para producción real, cambiá el transport a Redis / NATS / Kafka editando un solo objeto en cada `main.ts` + `ClientsModule`.

## Correr en local (sin Docker)

```bash
npm install
# en 4 terminales:
npm run start:users
npm run start:products
npm run start:orders
npm run start:gateway
```

## Correr en local con Docker

```bash
docker compose up --build
```

Buildea una imagen por servicio reusando el mismo `docker/Dockerfile`.

## Probar la demo

```bash
curl http://localhost:3000/users
curl http://localhost:3000/products
curl -X POST http://localhost:3000/orders \
  -H 'content-type: application/json' \
  -d '{"userId":1,"productId":2,"quantity":3}'
curl http://localhost:3000/orders
```

El último request muestra el flujo entre microservicios: gateway → orders → (users + products) → respuesta.

## CI/CD selectivo

`.github/workflows/ci-cd.yml` usa `dorny/paths-filter` para detectar qué carpeta `apps/*` cambió y dispara una **matrix** que builda/pushea **solo** esa imagen. Si tocás `libs/` o el Dockerfile, se rebuildean todos (porque afecta a todos).

Cambia el step final `Deploy to k8s` por tu `kubectl set image` / `helm upgrade` / ArgoCD sync real.

## Build de un solo servicio en Docker

```bash
docker build -f docker/Dockerfile --build-arg APP=users-service -t users-service:dev .
docker run --rm -p 3001:3001 users-service:dev
```
