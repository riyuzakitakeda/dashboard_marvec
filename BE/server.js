const express = require("express");
const running = process.env.ENVIRONTMENT

//if(running == "production"){
//  require('dotenv').config({ path: '.env.production' })
//};

const UserRoute = require("./routes/user.routes");
const ListDashboardRoute = require("./routes/listdashboard.routes");

const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */


const authenticateJWT = require('./midleware/auth');

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});
app.use("/uploads", express.static("uploads"));
app.use("/api/user", UserRoute);
app.use("/api/listdashboard", ListDashboardRoute);



// set port, listen for requests
const PORT = process.env.PORT || 8099;
app.listen(PORT, () => {
  console.log(`[*] Server is running on port ${PORT}.`);
});
