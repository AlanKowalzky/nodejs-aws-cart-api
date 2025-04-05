#!/bin/bash

username=$(echo $RANDOM | md5sum | head -c 16)
password=$1
curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"$username\", \"password\": \"$password\"}" http://localhost:4000/api/auth/register