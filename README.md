# Express Neo4j Server Project

This project is a Node.js Express server that fetches data from a Neo4j Aura web graph database. The data includes many nodes with parent-child relationships to show a tree-like structure from left to right. The server uses the Neo4j driver npm package to connect to the Neo4j database using a connection string (including Neo4j URI, username, and password). The server provides a base route (`/`) and a data route (`/data`) to fetch the results, which are mapped according to their properties. The Express.js web service is hosted on Render and is used by a front-end Vue.js website to fetch the results.


## Installation

1. Clone the repository:
    ```sh
    git clone home-assigment-neo4j-server-app
    cd <repository-directory>
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```env
    NEO4J_URI=neo4j+s://<your-neo4j-uri>
    NEO4J_USERNAME=<your-neo4j-username>
    NEO4J_PASSWORD=<your-neo4j-password>
    ```

## Usage

1. Start the server:
    ```sh
    node server.js
    ```

2. The server will be running on `http://localhost:3000`.

## Routes

- **Base Route (`/`)**: Returns a welcome message.
- **Data Route (`/data`)**: Fetches data from the Neo4j database and returns it as JSON.

## Deployment

The Express.js web service is hosted on Render. The URL provided by Render is used by the front-end Vue.js website to fetch the results.

'https://node-neo4j-server-app.onrender.com'

## Dependencies

- `express`: ^4.21.1
- `neo4j-driver`: ^5.26.0
- `dotenv`: ^16.4.5
- `cors`: ^2.8.5

## License

This project is licensed under the ISC License.
