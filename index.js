const app = require('./app');
require('dotenv').config();

const port = process.env.PORT;

app.listen(port,()=>{
    console.info(`server is listening on ${port}`);
});