;
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const mongoose = require('mongoose');

// Replace with your actual MongoDB URI
const uri = 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority';

mongoose.set('strictQuery', false); // Address deprecation warning

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
