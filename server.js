const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.get('/app',(req,res)=>{
    res.send("it's just a testing application for server side rendering")
})
// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
