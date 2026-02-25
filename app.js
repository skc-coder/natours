const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the server sides' });
});

app.post('/', (req, res) => {
  res.send('You are trying to post at this endpoint...');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
