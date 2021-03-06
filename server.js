const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: "./.env"});

app.use(cors());
app.use(express.json());
app.use(require("./routes/user"));
app.use(require("./routes/characters"));

const dbo = require("./db/conn");

let port = process.env.PORT;

if (port == null || port == "") {
  port = 5000;
}
app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });
    console.log(`Server is running on port ${port}`);
})