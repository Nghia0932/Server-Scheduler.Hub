const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
const PORT = 3001;

app.get('/auth/hello', (_req, res) => {
  res.send('<h1> hello word</h1>');
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is starting at http://192.168.1.6:${PORT}`);
});
