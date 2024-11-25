const express = require('express'); 
const neo4j = require('neo4j-driver');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3000;

const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));

// Use CORS Middleware
app.use(cors());

// Root route
app.get('/', async (req, res) => {
    res.send('Welcome to the Express/js server!');
});

// Health check route
app.get('/health', async (req, res) => {
    res.status(200).send('OK');
});

// Data route
app.get('/data', async (req, res) => {
    const session = driver.session();
    try {
        const result = await session.run(
            'MATCH (n) RETURN n'); 
            const data = result.records.map(record => record.get('n').properties); 
            res.json(data);
    } catch (error) {
        console.error('Error fetching data from Neo4j:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        await session.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

process.on('exit', async () => {
    await driver.close();
});
