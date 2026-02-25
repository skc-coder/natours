const app = require('./app.js');

// server start
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
