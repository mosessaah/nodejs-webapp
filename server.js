import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

// variables
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.urlencoded({extended:true}));

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/index.html");
  
});
app.get('/about', (req,res) => {
    res.sendFile(__dirname+'/about.html');
});

app.listen(port, () => {
    console.log('Listening on port 3000');
});