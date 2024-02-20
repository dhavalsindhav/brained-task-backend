const dotenv = require('dotenv');
const express = require('express')
const app = express()
dotenv.config();
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening in http://localhost:${PORT}`);
})