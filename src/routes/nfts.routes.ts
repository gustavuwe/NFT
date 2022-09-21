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
    const {name, description, deadline, price} = request.body;

    nftsRepository.create({ name, description, deadline, price });

    return response.status(201).send();
    
});

nftsRoutes.get("/", (request, response) => {
    const allNfts = nftsRepository.list();

    return response.json(allNfts);
})

nftsRoutes.patch("/bid", (request, response) => {
    const { id, offer } = request.body;

    nftsRepository.bid({ id, offer })

    return response.status(200).send();
})

nftsRoutes.post("/createwallet", (request, response) => {
    const { savePhrase, ballance } = request.body;

    nftsRepository.createWallet({ savePhrase, ballance });

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

export { nftsRoutes }