const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const multer = require("multer");

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Mongo DB is connected"))
  .catch((err) => console.log(err));

  const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
      cb(null, "images")
    },filename:(req,file,cb) => {
      cb(null, "hello")
    }
  });

  const upload = multer({storage:storage});
  app.post("api/upload", upload.single("file"), (req,res)=>{
    res.status(200).json("File uploaded")
  })

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute);

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
