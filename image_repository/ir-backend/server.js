// setup express
const express = require('express');
const app = express();

// setup cookie-parser
const cookieParser = require('cookie-parser');

// setup cors
const cors = require('cors');

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

// setup port
const port = process.env.PORT || 8000;

// setup dotenv
const dotenv = require('dotenv');
dotenv.config();

// setup mongodb
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_ATLAS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, (err) => {
    if (err) return console.log(err);
    console.log('MongoDB connected successfully!')
});

// setup routes
app.use('/', require('./routers/authRouter'));
app.use('/account', require('./routers/accountRouter'));
app.use('/user', require('./routers/userRouter'));
app.use('/image', require('./routers/imageRouter'));
app.use('/buy', require('./routers/buyRouter'));

// start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});