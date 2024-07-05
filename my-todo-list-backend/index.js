const express = require("express");
var cors = require("cors");
const connectToMongo = require("./db");
connectToMongo();
require("dotenv").config({ path: ".env.local" });

// const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
//middleware 
app.use(express.json());

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

// app.post("/login/forgotPassword", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const checkUser = await User.findOne({ email: email });
//     if (!checkUser) {
//       res.json("Please enter the Email from which you have signed up ");
//     }
//     const secret = JWT_SECRET + checkUser.password;
//     //jwt will creat a token that will contain this email and id
//     const token = jwt.sign(
//       { email: checkUser.email, id: checkUser.id },
//       secret,
//       { expiresIn: "10m" }
//     );

//     //this link will be sent to our user
//     const link = `http://localhost:3000/reset-password/${checkUser.id}/${token}`;

//     var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'youremail@gmail.com',
//         pass: 'yourpassword'
//       }
//     });

//     var mailOptions = {
//       from: 'anaya29003@gmail.com',
//       to: 'myfriend@yahoo.com',
//       subject: 'Reset your password',
//       text: link
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get('/reset-password/:id/:token', async (req, res)=>{
//   const { id,token } = req.params;
//   const checkUser = await User.findOne({_id:id});
//   if(!checkUser){
//     res.json("User do not exists")
//   }
//   const secret = JWT_SECRET + checkUser.password;
//   try {
//     const verify = jwt.verify(token, secret)
//   } catch (error) {
//     res.send("not verified")
//   }
// })

var listener = app.listen(port, () => {
  console.log("Todosync app listening on port " + listener.address().port);
});
