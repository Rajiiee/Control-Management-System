const express = require("express");
const User= require("./models/schema.js");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
require("./db/conn");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
const port =process.env.PORT || 3000

//gets request of signup page
app.get("/signup",(req,res) =>{
       res.sendFile(__dirname +"/html/signup.html");
});

//CREATE NEW USER
app.post("/signup",(req,res) =>{
    console.log(req.body);
    
    //used to store form data in variables
    const uname = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
          username :uname,
          email:email,
          password:password,
    });

    user.save()
    .then(function () {
        res.redirect("/login"); //sending over to login page
      })
      .catch(function (err) {
        console.log(res.statusCode);
        res.send("Oop! Some error occured. PLease check and try again.");
        console.log(err);
      });   
});

//gets login page
app.get("/login",async(req,res) =>{
    res.sendFile("C:/Users/rajig/OneDrive/Desktop/cms/public/login.html");
  });

  //login authentication
app.post("/login",async (req,res) => {
  console.log("over to login page");
  try{
    const login_email=req.body.email;
    const login_pass=req.body.password;
    console.log(login_email);
    const foundUser = await User.find({email:login_email});
    console.log(foundUser)
    if (foundUser.length == 0){
      console.log("Not found");
      result = "/login";

    }else{
      console.log("Email found");
      if(login_pass === foundUser[0].password ){
      result="/profile";
      } else {
        console.log("Password inncorrect");
        result = "/login";
      }

    }
    res.redirect(result);
  } catch(e){
    console.log(e);
  }
});

//gets profile page
app.get("/profile",function(req,res){
  res.sendFile("C:/Users/rajig/OneDrive/Desktop/cms/public/profile.html");
});

//deletes profile
app.post("/delprofile", async(req,res)=>{
  try{
    const delete_email = req.body.email;
    const delete_pass = req.body.password;
    const foundUser = await User.find({email:delete_email});
    var result = "";
    console.log(req.body.password);
    if(foundUser.length === 0){
      console.log("Wrong email");
    }else{
      if(delete_pass === foundUser[0].password){
      const delUser = await User.deleteOne({email :delete_email});
      delUser
      console.log("user deleted");
      result="/login";
      }
      else{
          result="/profile";
      }
    }
    res.redirect(result)
  }catch(e){
    console.log(e);
    res.send("Profile could not be deleted");
  }
});

//update user
app.post("/edit_profile", async(req,res) => {
  try{
    const email = req.body.email;
  const name = req.body.name;
  const p_no = parseInt(req.body.contact);
  const about = req.body.about_me;
  const p_Update = await User.updateOne(
    { email : email},
    { username : name , phone_number : p_no , about_me : about }
  );
  console.log(p_Update);
  console.log("User profile updated");
  res.redirect("/profile");
}
  catch(e){
    console.log(e);
    res.redirect("/edit_profile");
  }

});



app.listen(port, () => {
    console.log("server is running at port on 3000");
});

