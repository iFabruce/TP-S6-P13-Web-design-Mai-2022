const  express = require("express");
const app = express();
const cors = require("cors");
const baseRoute =require("./routes/baseRoute.js");
const Blog =require("./models/blog.js");

app.set('view engine','ejs')
app.use(cors());
app.use(express.json());

const db = require("./models");

app.use(baseRoute);
app.use('/static', express.static(__dirname + '/public'));
db.sequelize.sync().then((req) => {
  app.listen(5000, () => {
      console.log("connected")
  })
});




// app.use('/',baseRoute);