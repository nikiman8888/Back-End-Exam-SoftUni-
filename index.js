 global.__basedir = __dirname;

 const dbConector = require('./config/db');

 dbConector().then(()=>{
     const config = require('./config/config');
     const app = require('express')();

     require('./config/express')(app);
     require('./config/routes')(app);

     app.listen(config.port,console.log(`Server start at ${config.port}`))
 }).catch(console.error);