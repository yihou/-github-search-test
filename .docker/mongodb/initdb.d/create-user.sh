#!/bin/bash
# https://www.stuartellis.name/articles/shell-scripting/#enabling-better-error-handling-with-set
set -Eeuo pipefail

# Based on mongo/docker-entrypoint.sh
# phew, spent so much time on this
# https://github.com/docker-library/mongo/blob/master/docker-entrypoint.sh#L303
if [ "$MONGO_INITDB_USERNAME" ] && [ "$MONGO_INITDB_PASSWORD" ]; then
    mongo -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --eval "db.getSiblingDB('${MONGO_INITDB_DATABASE}').createUser({ user: '${MONGO_INITDB_USERNAME}', pwd: '${MONGO_INITDB_PASSWORD}', roles: [ { role: 'readWrite', db: '${MONGO_INITDB_DATABASE}' } ] })"
fi
