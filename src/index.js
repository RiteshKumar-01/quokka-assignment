const express = require('express');
const connectDB = require('./config/db');
const middleware = require('./middlewares/consoller');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(middleware)

app.get('/test', (req, res) => {
    res.status(200).json({
        message: "testing route"
    })
})
app.use('/api/v1/', require('./routes/authRoutes'));
app.use('/api/v1/', require('./routes/userRoutes'));
app.use('/api/v1/articles/', require('./routes/articleRoutes'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
