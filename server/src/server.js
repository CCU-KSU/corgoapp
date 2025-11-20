import express from 'express';
import cors from 'cors';

import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Server is running!' }));
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});