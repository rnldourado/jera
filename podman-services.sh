#!/bin/bash

# Script para gerenciar serviços com Podman
# Baseado no docker-compose.yaml original

set -e

# Carregar variáveis de ambiente
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Valores padrão
DB_HOST=${DB_HOST:-jera-postgres}
DB_PORT=${DB_PORT:-5432}
DB_USER=${DB_USER:-postgres}
DB_PASS=${DB_PASS:-password}
DB_NAME=${DB_NAME:-jera_db}
APP_NAME=${APP_NAME:-jera-app}
APP_PORT=${APP_PORT:-3000}
NODE_ENV=${NODE_ENV:-development}
POSTGRES_VERSION=${POSTGRES_VERSION:-15}

POD_NAME="jera-pod"
NETWORK_NAME="jera-network"

function create_network() {
    echo "Criando rede do Podman..."
    podman network exists $NETWORK_NAME || podman network create $NETWORK_NAME
}

function create_volume() {
    echo "Criando volume para PostgreSQL..."
    podman volume exists postgres_data || podman volume create postgres_data
}

function start_database() {
    echo "Iniciando banco de dados PostgreSQL..."
    podman run -d \
        --name $DB_HOST \
        --network $NETWORK_NAME \
        -e POSTGRES_PASSWORD=$DB_PASS \
        -e POSTGRES_USER=$DB_USER \
        -e POSTGRES_DB=$DB_NAME \
        -p $DB_PORT:5432 \
        -v postgres_data:/var/lib/postgresql/data \
        --restart unless-stopped \
        postgres:$POSTGRES_VERSION
}

function build_app() {
    echo "Construindo aplicação..."
    podman build -t jera-app:latest .
}

function start_app() {
    echo "Iniciando aplicação..."
    podman run -d \
        --name $APP_NAME \
        --network $NETWORK_NAME \
        -e NODE_ENV=$NODE_ENV \
        -e DB_DIALECT=postgres \
        -e DB_HOST=$DB_HOST \
        -e DB_PORT=5432 \
        -e DB_PASS=$DB_PASS \
        -e DB_USER=$DB_USER \
        -e DB_NAME=$DB_NAME \
        -e APP_PORT=3000 \
        -p $APP_PORT:3000 \
        --restart unless-stopped \
        jera-app:latest
}

function start() {
    echo "Iniciando todos os serviços..."
    create_network
    create_volume
    start_database
    echo "Aguardando banco de dados inicializar..."
    sleep 10
    build_app
    start_app
    echo "Serviços iniciados com sucesso!"
    echo "Aplicação disponível em: http://localhost:$APP_PORT"
}

function stop() {
    echo "Parando serviços..."
    podman stop $APP_NAME $DB_HOST 2>/dev/null || true
    echo "Serviços parados."
}

function remove() {
    echo "Removendo containers..."
    podman rm -f $APP_NAME $DB_HOST 2>/dev/null || true
    echo "Containers removidos."
}

function restart() {
    echo "Reiniciando serviços..."
    stop
    remove
    start
}

function status() {
    echo "Status dos containers:"
    podman ps -a --filter name=$APP_NAME --filter name=$DB_HOST
}

function logs() {
    if [ "$2" = "app" ]; then
        podman logs -f $APP_NAME
    elif [ "$2" = "db" ]; then
        podman logs -f $DB_HOST
    else
        echo "Logs da aplicação:"
        podman logs $APP_NAME
        echo "Logs do banco:"
        podman logs $DB_HOST
    fi
}

function cleanup() {
    echo "Limpando recursos..."
    stop
    remove
    podman volume rm postgres_data 2>/dev/null || true
    podman network rm $NETWORK_NAME 2>/dev/null || true
    echo "Limpeza concluída."
}

case "$1" in
    start|up)
        start
        ;;
    stop|down)
        stop
        ;;
    restart)
        restart
        ;;
    remove|rm)
        remove
        ;;
    status|ps)
        status
        ;;
    logs)
        logs "$@"
        ;;
    cleanup)
        cleanup
        ;;
    build)
        build_app
        ;;
    *)
        echo "Uso: $0 {start|stop|restart|remove|status|logs|cleanup|build}"
        echo ""
        echo "Comandos:"
        echo "  start     - Inicia todos os serviços"
        echo "  stop      - Para todos os serviços"
        echo "  restart   - Reinicia todos os serviços"
        echo "  remove    - Remove containers"
        echo "  status    - Mostra status dos containers"
        echo "  logs      - Mostra logs (use 'logs app' ou 'logs db' para específico)"
        echo "  cleanup   - Remove tudo (containers, volumes, rede)"
        echo "  build     - Reconstrói a aplicação"
        exit 1
        ;;
esac
