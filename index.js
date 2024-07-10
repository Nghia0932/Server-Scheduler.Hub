const express = require('express');
const cors = require('cors');
const authRouter = require('./src/routers/authRouter');
const connectDb = require('./src/configs/connectDb');
const {errorMiddleHandle} = require('./src/middlewares/errorMiddleware');
const app = express();

app.use(cors());
app.use(express.json());
const PORT = 3001;

app.use('/auth', authRouter);

connectDb();

app.use(errorMiddleHandle);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is starting at http://192.168.1.2:${PORT}`);
});
