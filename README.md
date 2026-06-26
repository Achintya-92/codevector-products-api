# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Project Title:
-------------
This project is a backend logic focused application which works for serving filetered and new product in every loading in otherhand not gives already seen product categories.
this is designed for dynamic data updates while maintaining 
consistent pagination results.
It uses cursor-based pagination.
==================================================
Features:
---------
RESTfull API architecture.
Optimized database queries using MongoDB Indexes.
Batch based seeding of data products in amount of 200k.
Cursor-Based Pagination for effective and consistent browsing of data.
User loads more data and get new and consistent data.
=====================================================
Tech Stack:
Frontend:
React.js
Vite.

Backend:
Node.js
Express.js
Mongoose

DataBase:
---------
MongoDB Atlas
MongoDB compass(Local Testing)

Database Schema:

Field	   Type 	Description
-------------------------------------------
name	   String	Product name
categoryv  String	Product category
price	   Number	Product price
createdAt	Date	Creation timestamp
updatedAt	Date	Last updated timestamp


Project Structures:
--------------------
src/models - Database Schema.
src/routes - API routes
src/server.js - server entry ponit
seed.js - Generates Products in Batches (5000) and in Amount of 200k
frontend/- react ui

=======================================

API EndPoints
-------------

Seed Products 
-------------
Method 
.Post - send data in DB

End point:
/api/seed

Purpose:

Populate database with sample products.


Get Products
------------
Method

GET

Endpoint

/api/products


Query Parameters
----------------
category
cursorDate
cursorId

Example Request
--------------
/api/products?category=Books
/api/products?cursorDate=...&cursorId=...

============================================
Indexing Strategy
-----------------
.Compound index on updatedAt and _id for efficient sorting.
.Compound index on category, updatedAt, and _id for filtered queries.
.Reduces query execution time.
.Supports fast cursor pagination.


Pagination Approach
-------------------------
Implemented Cursor-Based Pagination.
Uses updatedAt and _id as the cursor.
Prevents duplicate or missing products when data changes.
More efficient than offset (skip) pagination on large datasets.

Seed Script
---------------------------
Generates 200,000 random products.
Inserts data in batches.
Uses insertMany() for better performance.
Supports easy database initialization.


============================================
Installation
-------------------------
Clone Repository
Clone the GitHub repository.


Install Dependencies
---------------------------------
Install backend dependencies using npm.
Install frontend dependencies (optional).

Environment Variables
---------------------------------
PORT
MONGO_URI
Run Backend
Start the Express server.
Run seed script if database is empty.
Deployment

Backend

Render

Database

MongoDB Atlas

Frontend

Vercel (Optional)