const express = require('express'); // returns a function
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
const dbURL = "mongodb+srv://admin:Sn95Nryn@cluster0-jkaby.mongodb.net/test?retryWrites=true&w=majority";
const mongoose =  require('mongoose');
const UserModel = require('./models/User');
const RegModel = require('./models/Regular');
mongoose.connect(dbURL,{useNewUrlParser: true,useUnifiedTopology: true }).then(
    () => {
        console.log('db is connected');
    }
);
app.post('/createRegUser',(req,res)=>{
    const formdata = {
        'address': req.body.address,
        'email': req.body.email,
        'password':req.body.password,
        'profilepicture':req.body.profilepicture   
            }  
    UserModel.create(formdata).then(
        function(newUser){
            const data = {
                'details':newUser._id,
                "firstname":req.body.firstname,
                "lastname":req.body.lastname,
                'favfish':req.body.favfish,
                'aqlevel':req.body.aqlevel
            }
            RegModel.create(data).then(
                function(newReqUser)
                {
                    RegModel.findOne({ _id: newReqUser._id }).populate("details").then(
                        function(theRegUser){
                            res.json(theRegUser);
                        }
                    ) ;
                }
            ).catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
              });
        }
    );
    }
    
    );
app.listen(3010,
    () => {
        console.log("You are connected");

    });