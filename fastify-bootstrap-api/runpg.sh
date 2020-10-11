ROOT_DIR=$(pwd)
PG_DATA="$ROOT_DIR/data/postgres"

mkdir -p "$PG_DATA"

docker start mylocalpg || docker run -d --name mylocalpg -p 5432:5432 -e POSTGRES_USER=notes_admin -e POSTGRES_PASSWORD=localhost -e POSTGRES_DB=notes_db -e PGDATA=/var/lib/postgresql/data -v $PG_DATA:/var/lib/postgresql/data postgres:11