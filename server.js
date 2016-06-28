//express
var express = require('express');
var app = express();
//Serve static content for the app from the “public” directory in the application directory:whatever is there in public directory will be serverd to app
app.use(express.static(__dirname + '/public'));

//passport
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

//cookie and session
var cookieParser = require('cookie-parser');// to parse cookies
var  session = require('express-session');
app.use(session({secret:'this is the secret'}));//for starting the session
app.use(cookieParser()); //for parsing the cookies
app.use(passport.initialize());//initialize passport
app.use(passport.session()); // for parsing the session


//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded//url encoded//parameters


var multer  = require('multer'); // v1.0.5
var upload = multer();// for parsing multipart/form-data


var moongoose = require('mongoose');
var db = moongoose.connect('mongodb://localhost/test'); // connecting to database test



// creating user schema
var UserSchema = new moongoose.Schema
({
    username:String,
        password: String,
        email:String,
        firstname:String,
        lastname:String,
        roles:[String]//roles can different as array of roles
});

//creating a model which uses userschema
var UserModel = moongoose.model("UserModel",UserSchema);

//(Commented so that we dont create and save dulpicate entries when a server restarts)
/* create a users
//var admin = new userModel
//({
    username:"ankur",password:"ankur",firstname:"ankur",lastname:"lodha",roles:"[admin]"
});
admin.save();
var user =  new userModel
({
    username:"test",password:"test",firstname:"test",lastname:"test",roles:"[user]"
});
user.save();
*/


// passport parsers username and password and passes this to the function.It also passes a done function
// which tells passport what to do when login succeeds or fails
// the first argument(null) tells whether there was an error while connecting to the database or not
// the second argument(fails) tells whether the user failed to login
// and if it succeeds the condition return with user object as req.user
passport.use(new localStrategy(

    function (username,password,done)
    {
        {
            UserModel.findOne({username:username,password:password},
                function (err,user)
                {
                    if (user)
                    {
                        return done (null,user);
                    }
                    return done(null,false,{message:'unable to login)'})
                })

        }


    }));


//serializeUser parse the object that gets sent back in the request and also can parse it back in there
passport.serializeUser(function (user,done) {
    done(null,user);
});
passport.deserializeUser(function (user,done) {
    done(null,user);
});






//tells passport to use the local strategy
app.post('/login', passport.authenticate('local'), function (req,res) {
    console.log('/login');
    console.log(req.user);
    res.json(req.user);
});

app.get('/loggedin', function (req,res) {
    // will respond > passport has a method isAuthenticated() which remembers if you have already logged in
    // isAuthenticated() returns true it lets you through by returning user in the request req.isAuthenticated()? req.user(user object)
    // or if returns false returns with req.isAuthenticated()? 0, this the 0 we are using in the client to redirect to login page
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/logout',function (req,res) {
    req.logOut();
    res.send(200);
});


app.post('/register',function (req,res)
{
    console.log('/register');
    // checks if user already exits or not,if not then register user and keep him logged in
    UserModel.findOne({username: req.body.username},function (err,user) {
        if(user)
        {
            res.send(null);
            res.json(user);
            return;
        }
        else {
            var newUser = new UserModel(req.body);
            //newUser.roles = ['student'];
            newUser.save(function (err,user,next)
            {
                req.login(user,function(err)
                {
                    if(err){ return next(err);}
                    console.log("user registered")
                    res.json(user);
                });

            });
        }
    });
    var newUser = req.body;
    console.log(newUser);
    res.json(req.newUser);
});

//
var auth =function (req,res,next)
{
  if (!req.isAuthenticated())
      res.send(401);


    else next();
};
// should go the database and fetch all the users
app.get("/rest/user",auth,function (req,res) {
   UserModel.find(function(err,users){
       res.json(users);
    })
});


app.listen(5000);