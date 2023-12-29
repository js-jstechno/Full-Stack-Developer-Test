### A brief description of the project

```
The project demonstrates the CRUD operations on a RESTful Movie Application using the following tech stack:
Backend: NodeJS, ExpressJS
Database: MySQL
Authentication and Authorization: JWT and Cookie
Architecture: MVC

```

### Different routes

#### 1. Auth routes
`POST /signup`: This is a public route to sign up a new user.

`POST /login`: This is a public route to log in an existing user.

`POST /logout`: This is a public route to log out a user who is currently logged in.

#### 2. User and Movie routes
`GET /movies`: This is a public route to fetch all the movies from the Database.

`POST /movies`: This is a private route to create a new movie.

`GET /movies/:id`: This is a public route to fetch a movie by it's id.

`PATCH /movies/:id`: This is a private route to update a movie corresponding to an id.

`DELETE /movies/:id`: This is a private route to delete a movie corresponding to an id.

`GET /users/:id`: This is a private route to fetch a user by it's id.

`PATCH /users/:id`: This is a private route to update a user corresponding to an id.

`DELETE /users/:id`: This is a private route to delete a user corresponding to an id.

### Database schemas

#### 1. User schema
`id (type: INT)`: This column denotes a unique id for a user which is also the Primary Key for the table.

`username (type: VARCHAR)`: This column denotes the unique username of a user.

`password (type: VARCHAR)`: This column denotes the user's hashed password.

#### 2. Movie schema
`id (type: INT)`: This column denotes a unique id for a movie which is also the Primary Key for the table.

`title (type: VARCHAR)`: This column denotes the title of a movie.

`description (type: VARCHAR)`: This column denotes the description of a movie.

`userId (type: INT)`: This column refers to the id of an existing user who created the movie, which is the Foreign Key of the table.

`created_at (type: TIMESTAMP)`: This column denotes the time when a movie was created.

`updated_at (type: TIMESTAMP)`: This column denotes the time when a movie was last updated.

### Environment variables
#### 1. Environment variables for database configuration
`DB_HOST` `DB_USER` `DB_PASSWORD` `DB_NAME`

#### 2. Other environment variables
`PORT` `JWT_SECRET`

### Steps to run

1. Make sure that you have `node` and `nodemon` installed.
2. If you are using VS Code, make sure that you have the `ESLint` extension enabled to avoid the possible linting errors.
3. Clone the repository.
4. Move into the project directory using `cd <path_to_project_directory>`
5. Install the required packages using `npm install`
6. Create a `.env` file and set the environment variables.
7. Run the `db.sql` file to create the database and the related tables using the command `source <path_to_sql_file>;`
8. Make sure that the database is created successfully.
9. Now run the application using `npm run start`