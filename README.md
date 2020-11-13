# Shipment Tracking REST API

REST API Express JS server to get data from a shipment tracking database.

The database consist of four basic tables: 
 * courier
 * store
 * parcel
 * store_order

## Concepts you will see on this application

* How to work with a Express JS server
    * Organize routes and handlers
    * Define custom handler
* How to connect to a Postgres database using node-postgres
* How to work with Jest and node-mocks-http for unit testing
* How to create a Postgres DB with running an initial script

## Technlogoies

* Back end server
    * Node + Express JS
* Database
    * Postgres 12.2

## Running the Application

### 1) Create Postgres DB

Simple run the `docker-compose up` located on the `/db` folder. This will launch a Postgres DB with initial data. You can 

### 2) Run server

Execute `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server

### `npm test`

Launches the test runner in the interactive watch mode.\

## Contributor

Juan Camilo Marin
