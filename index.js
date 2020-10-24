const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

app.get('/', (req, res)=>{
    res.send('Hello World');
}); // when anyone required get

app.listen(port, hostname, ()=>{
    console.log(`App listening at http://${hostname}:${port}`);
}); //where the api is running