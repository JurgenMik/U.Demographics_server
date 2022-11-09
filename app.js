const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;

const userRouter = require("./routes/users");

app.use(cors());
app.use(bodyParser.json());
app.use("/user-info", userRouter);


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})