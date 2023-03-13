const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.ts');
const passportConfig = require('./config/passport.ts');

// Load env's
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

const app = express();

// Express Middleware
app.use(express.json());

// Routes
app.use('/api/V0/user', require('./routes/userApi.ts'));
app.use('/api/V0/auth', require('./routes/auth.ts'));
// app.use('/api/V0/feed', require('./routes/feed.ts'));    // Not built
app.use('/api/V0', require('./routes/restaurantsApi.ts'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT} for weird noises👂`);
});