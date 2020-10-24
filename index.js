const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res)=>{
    res.send('Hello World');
}); // when anyone required get

app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`)
}); //where the api is running