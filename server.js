const express = require('express'); // returns a function
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
const dbURL = "mongodb+srv://admin:Sn95Nryn@cluster0-jkaby.mongodb.net/test?retryWrites=true&w=majority";
const mongoose =  require('mongoose');
const regularRoutes =  require("./routes/Regular");
const dealerRoutes = require("./routes/Dealer");
const userRoutes = require("./routes/User");
const fishRoutes = require("./routes/Fish");
const itemRoutes = require("./routes/Item");
mongoose.connect(dbURL,{useNewUrlParser: true,useUnifiedTopology: true }).then(
    () => {
        console.log('db is connected');
    }
);
app.use('/regular',regularRoutes);
app.use('/dealer',dealerRoutes);
app.use('/user',userRoutes);
app.use('/fish',fishRoutes);
app.use('/item',itemRoutes);
app.listen(3010,
    () => {
        console.log("You are connected");

    });