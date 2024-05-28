# Back-End Documentation

## Request Body Parsing

Used all built-in Express middleware to parse request body of difference types (i.e. JSON, urlencoded, etc.)
These built-in middleware cover majority of the most commonly used types, but not all. Decided to not bother 
with the rest of those content types for the time being, since they require additional dependencies.

- multipart form: see `multer`


## Hanging questions
- setting up the environment on the vps:
    - for example creating a database and connecting our app to it

- How to parse gigantic raw request to store in MongoDB?
    - Can't JSON.stringify it, because of circular references