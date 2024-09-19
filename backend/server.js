const express = require('express');
const mongoose = require('mongoose');
const app = express();
const apiRoutes = require('./routes/api');

mongoose.connect('mongodb://localhost/messDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server running on port `${PORT}`")
})