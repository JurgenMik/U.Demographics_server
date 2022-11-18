const express = require("express");
const http = require('https');
const fs = require('fs');
const app = express();
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;

const userRouter = require("./routes/users");

app.use(cors());
app.use(bodyParser.json());
app.use("/user-info", userRouter);

/*
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})
 */

const sslServer = http.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

sslServer.listen(port, () => console.log(`Server started on port: ${port}`));