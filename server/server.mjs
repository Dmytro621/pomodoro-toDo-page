import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const todos = [
    {name: 'test'}
]

const app = express();
app.use(cors());
app.use(express.json());

const buildPath = path.join(__dirname, '../build');
app.use(express.static(buildPath));

app.get('/todos', (req, res)=> {
    console.log(todos)
    res.send(todos)
})

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is work on http://localhost:${PORT}`));