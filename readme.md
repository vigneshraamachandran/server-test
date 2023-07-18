# DynamoDB API Documentation

This documentation provides an overview of the API endpoints available for interacting with DynamoDB tables. It includes information about each endpoint's purpose, input format, and response.

## Create Table

**Endpoint:** `POST /createTable/:tableName`

**Purpose:**

Creates a new DynamoDB table with the specified name and schema.

**Input Format:**

- `:tableName` (URL parameter): The name of the table to be created.

**Response:**

The response will contain information about the created table.

## Add Item

**Endpoint:** `POST /addItem/:tableName/:id`

**Purpose:**

Adds a new item to the specified DynamoDB table.

**Input Format:**

- `:tableName` (URL parameter): The name of the table to add the item to.
- `:id` (URL parameter): The primary key value for the new item.

The item details are expected to be sent in the request body in JSON format.

**Response:**

The response will contain the ID of the added item.

## Delete Table

**Endpoint:** `POST /deletetable/:tableName`

**Purpose:**

Deletes an existing DynamoDB table.

**Input Format:**

- `:tableName` (URL parameter): The name of the table to be deleted.

**Response:**

The response will indicate the success or failure of the deletion operation.

## Get Whole Table Items

**Endpoint:** `GET /getwholetableItem/:tableName`

**Purpose:**

Retrieves all items from the specified DynamoDB table.

**Input Format:**

- `:tableName` (URL parameter): The name of the table to retrieve items from.

**Response:**

The response will contain an array of all items in the table.

## Get Single Item

**Endpoint:** `GET /getsingleItem/:tableName/:id`

**Purpose:**

Retrieves a single item from the specified DynamoDB table based on the provided primary key.

**Input Format:**

- `:tableName` (URL parameter): The name of the table to retrieve the item from.
- `:id` (URL parameter): The primary key value of the item to retrieve.

**Response:**

The response will contain the retrieved item.

> **Note:** 
> Please ensure that you have valid AWS credentials for authentication and appropriate access permissions to perform the specified operations.

