import { Router } from "express";

import  { Nft } from "../model/Nft"

import { Wallet } from '../model/Wallet'

import { NftsRepository } from "../Repository/NftsRepository"

const nftsRoutes = Router();
const nftsRepository = new NftsRepository()
const nft = new Nft()
const wallet = new Wallet()

function verifyIfNftAlreadyExists(request, response, next) {
    

    const { name } = request.headers



}

nftsRoutes.post("/", (request, response) => {
    const {name, author, description, deadline, price} = request.body;

    nftsRepository.create({ name, author, description, deadline, price });

    return response.status(201).send();
    
});

nftsRoutes.get("/listnfts", (request, response) => {
    const allNfts = nftsRepository.list();

    return response.json(allNfts);
})

nftsRoutes.patch("/bid", (request, response) => {
    const { walletId, id, offer } = request.body;

    nftsRepository.bid({ walletId, id, offer })

    return response.status(200).send();
})

nftsRoutes.post("/createwallet", (request, response) => {
    const { name, savePhrase, ballance } = request.body;

    nftsRepository.createWallet({ name, savePhrase, ballance });

    return response.status(201).send();
    
});

nftsRoutes.get("/wallets", (request, response) => {
    const allWallets = nftsRepository.listWallets();

    return response.json(allWallets);
})

nftsRoutes.patch("/buynft", (request, response) => {
    const { walletId, nftId } = request.body;

    nftsRepository.buyNft({ walletId, nftId })

    return response.status(200).send();
})

nftsRoutes.get("/transactions", (request, response) => {
    const allTransactions = nftsRepository.listTransactions();

    return response.json(allTransactions)
})

nftsRoutes.post("/advertise", (request, response) => {
    const { walletId, nftId, price } = request.body
    
    const consolelog = nftsRepository.advertiseNFT({ walletId, nftId, price })

    return response.json(consolelog).send()
})

export { nftsRoutes }