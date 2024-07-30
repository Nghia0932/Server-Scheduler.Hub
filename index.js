const express = require('express');
const cors = require('cors');
const authRouter = require('./src/routers/authRouter');
const taskRouter = require('./src/routers/taskRouter');
const connectDb = require('./src/configs/connectDb');
const {errorMiddleHandle} = require('./src/middlewares/errorMiddleware');
const app = express();

app.use(cors());
app.use(express.json());
const PORT = 3001;

app.use('/auth', authRouter);
app.use('/task', taskRouter);

connectDb();

app.use(errorMiddleHandle);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is starting at http://192.168.1.7:${PORT}`);
});
