const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
const app = require('./app.js');
// server start
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
