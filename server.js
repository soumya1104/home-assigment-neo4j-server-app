const express = require('express'); 
const neo4j = require('neo4j-driver');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'Calgary@2015'));

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