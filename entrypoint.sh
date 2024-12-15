#!/bin/sh

echo "Waiting for PostgreSQL..."
until nc -z db 5432; do
  echo "Waiting for database to be ready..."
  sleep 10
done

echo "Generate prisma client.."
npx prisma generate
sleep 2

echo "Starting the app..."
yarn start:dev
