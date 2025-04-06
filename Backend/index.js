const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const mongoURI = "mongodb+srv://purnendukumarmisra9:KbxiqNJhwYmNOuYX@cluster0.4jwtzsh.mongodb.net/health?retryWrites=true&w=majority&appName=Cluster0";
async function main() {
  await mongoose.connect(mongoURI);
  console.log("Connected to Mongo");
}
main();
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/message', require('./routes/message'));
app.use('/api/prompt', require('./routes/chat'));
app.listen(port, () => {
  console.log(`Listening at ${port}`);
})