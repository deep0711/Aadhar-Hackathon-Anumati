require('dotenv').config();
const express = require('express');
const Server = require('./Routes/route'); 
const cors = require('cors');
const { Client } = require('pg');
const { Sequelize } = require('sequelize');
const db = require('./models')
var pg = require('pg');
pg.defaults.ssl = true;

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended:false
}));

// CONNECT DATABASE
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
  host: process.env.DB_HOST,
  dialect: 'postgres',
  protocol: "postgres",
  logging: console.log,
  ssl:true,
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: true
    }
  }
});

async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

app.get("/", (req, res) => {
  res.json({message : "Server Hosting is successful"})
})

app.use('/anumati-server',Server);
let server; 
//create tables
db.sequelize.sync().then((req) => {
  // Start server 
  server = app.listen(process.env.PORT | port,()=>{
    console.log('---------Server is listening on port',port);
  });
}).catch(err => {
    console.error('-----------Unable to connect to the database:', err);
});



process.on("SIGINT", () =>{
    console.log("Server & Database connection CLosed");
  server.close();
  sequelize.close();
})