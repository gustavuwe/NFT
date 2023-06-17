import express from "express";

import cors from "cors";

import { NftsRepository } from "./Repository/NftsRepository";

import { nftsRoutes } from "./routes/nfts.routes";

const app = express();

app.use(cors());

// const emails = ["exemplo1@gmail.com", "exemplo2@gmail.com", "exemplo3@gmail.com"];

const nftsRepository = new NftsRepository();
// Setup Handlebars

const handlebars = require('express-handlebars')

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))

app.set('view engine', 'handlebars')

app.use(express.static('public'));

app.use(express.json());

app.use("/nfts", nftsRoutes)

app.get("/", function(req, res){
    res.render('inicio');
})

/* app.post("/login/:id", function(req, res){

    const { email } = req.body
    
    const user = emails.find(el => el === email)

    if (!user) res.status(404).send("email ou senha incorretos!")

    console.log(user)

    res.send(user)
})
*/

app.get("/nfts/wallet", function(req, res){
    const nfts = nftsRepository.list();
    console.log('teste', nfts )
    res.render('wallets', { nfts });
})

app.listen(3333, () => console.log("Server is running!"));