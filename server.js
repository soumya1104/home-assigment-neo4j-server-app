const express = require('express'); 
const neo4j = require('neo4j-driver');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());

const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD));
const session = driver.session();

// Root route
app.get('/', async (res) => {
    res.send('Welcome to the Express/js server!');
});

// Data route
app.get('/data', async (req, res) => {
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