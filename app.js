const express = require('express');
const bodyParser = require('body-parser')
const sequelize = require('./conect')
const cors = require('cors')



const app = express();
const PORT = 5000

app.use(express.json())
app.use(express.json({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use('/users', require("./routes/auth"))


app.get('/', function (req, res) {
  res.send('Hello World!');
});




async function start(){
    try{
        /*sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch(err => {console.error('Unable to connect to the database:', err);});
  */

        app.listen(PORT, ()=>console.log(`App has been started on port ${PORT}...`))
    }catch(e){
        console.log("Server error", e.message)
        process.exit(1)
    }
}

start()