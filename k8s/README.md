# Demo en Kubernetes (OrbStack + Traefik)

## 1. Prerequisitos

- OrbStack con Kubernetes habilitado (Settings → Kubernetes → Enable).
- `kubectl` apuntando al contexto `orbstack`:
  ```bash
  kubectl config use-context orbstack
  kubectl get nodes
  ```
- `helm` instalado (`brew install helm`).

## 2. Buildear las imágenes localmente

OrbStack comparte el daemon de Docker con su Kubernetes, así que **no hace falta** push a un registry — alcanza con que la imagen exista en Docker local.

```bash
docker compose build
docker images | grep nestjs-ms
# debe listar:
#   nestjs-ms/api-gateway       local
#   nestjs-ms/users-service     local
#   nestjs-ms/products-service  local
#   nestjs-ms/orders-service    local
```

## 3. Instalar Traefik

```bash
helm repo add traefik https://traefik.github.io/charts
helm repo update
helm install traefik traefik/traefik \
  --namespace traefik --create-namespace \
  --set ports.web.port=80 \
  --set service.type=LoadBalancer
```

OrbStack expone los `LoadBalancer` directo en `localhost`, así que Traefik queda escuchando en `http://localhost:80` sin hacer nada más.

Comprobá:
```bash
kubectl get svc -n traefik traefik
# EXTERNAL-IP debe ser localhost (o 127.0.0.1)
```

## 4. Resolver el dominio local

Agregá una entrada a `/etc/hosts` para que `api.tiendamia.local` apunte a localhost:

```bash
echo "127.0.0.1 api.tiendamia.local" | sudo tee -a /etc/hosts
```

## 5. Desplegar los microservicios

```bash
kubectl apply -k k8s/base
kubectl get pods -n demo -w
```

Cuando los 4 pods estén `Running`:

```bash
curl http://api.tiendamia.local/users
curl http://api.tiendamia.local/products
curl -X POST http://api.tiendamia.local/orders \
  -H 'content-type: application/json' \
  -d '{"userId":1,"productId":2,"quantity":3}'
curl http://api.tiendamia.local/orders
```

## 6. Dashboard de Traefik (opcional, queda lindo en la demo)

```bash
kubectl -n traefik port-forward deploy/traefik 9000:9000
```
Abrí http://localhost:9000/dashboard/ — vas a ver el router `api-gateway@kubernetes` y el flujo de requests en vivo.

## 7. Limpiar

```bash
kubectl delete -k k8s/base
helm uninstall traefik -n traefik
```

## Flujo de la demo

```
Browser / curl
   │
   │  Host: api.tiendamia.local
   ▼
Traefik (LoadBalancer, puerto 80)
   │
   │  Ingress → service api-gateway:80
   ▼
api-gateway (HTTP, NestJS)
   │
   ├── TCP ──► users-service:3001
   ├── TCP ──► products-service:3002
   └── TCP ──► orders-service:3003
                    │
                    ├── TCP ──► users-service:3001
                    └── TCP ──► products-service:3002
```
