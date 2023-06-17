import { Nft } from "../model/Nft"

import { Wallet } from '../model/Wallet'

import { Actions } from '../model/Actions'

interface IcreateNftDTO {
    name: string;
    author: string;
    description: string;
    price: number;
    deadline: number;
}

interface ImakeBidDTO {
    walletId: string;
    id: string;
    offer: number;
}

interface IcreateWalletDTO {
    name: string;
    ballance: number;
    savePhrase: string;
}

interface IbuyNftDTO {
    walletId: number;
    nftId: number;
}

interface AdvertiseNFTDTO {
    walletId: number;
    nftId: number;
    price: number;
}

class NftsRepository {
    private actions: Actions[];
    private nfts: Nft[];
    private wallets: Wallet[];

    constructor() {
        this.actions = [];
        this.nfts = [];
        this.wallets = [];
    }

    create({ name, description, deadline, price, author }: IcreateNftDTO): void {
        const nftVerifyAlreadyExists = this.nfts.find(nft => nft.name === name)

        if (!nftVerifyAlreadyExists) {
            const nft = new Nft()

            Object.assign(nft, {
                name,
                author,
                description,
                deadline,
                price
            })
    
            this.nfts.push(nft)
        }
    }

    list(): Nft[] {
        return this.nfts;  
    }

    bid({ walletId, id, offer }: ImakeBidDTO): void {
        if (offer > Number(this.nfts[id].price)) {
            this.nfts[id].price = offer

            var nft = this.nfts[id]

            var walletID = this.wallets[walletId].id

            var nftId = this.nfts[id].id

            var log = "wallet: " + walletID + "| oferta em nft id: " + nftId + "| de: " + offer

            const logBids = new Actions();

            Object.assign(logBids, {
                log,
                nft
            })

            this.actions.push(logBids)

        }
    }

    createWallet({ name, savePhrase, ballance }: IcreateWalletDTO): void {
        const wallet = new Wallet() 

        Object.assign(wallet, {
            name,
            ballance,
            savePhrase,
        })

        this.wallets.push(wallet)
    }

    listWallets(): Wallet[] {
        return this.wallets;
    }

    buyNft({ walletId, nftId }: IbuyNftDTO): void {
        // "buy" the nft, and after get the new balance (balance - nft price)
        if (Number(this.wallets[walletId].ballance) > Number(this.nfts[nftId].price)) {
            this.wallets[walletId].ballance = Number(this.wallets[walletId].ballance) - Number(this.nfts[nftId].price)

            if (this.nfts[nftId].owner) {
                const walletowner = this.nfts[nftId].owner
                this.wallets[walletowner].ballance += Number(this.nfts[nftId].price)
            }

            this.nfts[nftId].owner = walletId

            this.wallets[walletId].nftsOwned?.push(this.nfts[nftId])

            var nftAuthor = "de " + this.nfts[nftId].author

            var walletID = "para wallet id: " + this.wallets[walletId].id   

            var nft = this.nfts[nftId]

            const transactions = new Actions();

            Object.assign(transactions, {
                nftAuthor,
                walletID,
                nft
            })

            this.actions.push(transactions)

            // Removes the NFT
            this.nfts.splice(Number(nftId), 1);

        }
    }
    
    listTransactions(): Actions[] {
        return this.actions;
    }

    advertiseNFT({ walletId, nftId, price }: AdvertiseNFTDTO): void {
        const nft = this.wallets[walletId].nftsOwned?.[nftId]

        if (!nft) return

        nft.price = price

        nft.owner = walletId
        
        this.nfts.push(nft)

        this.wallets[walletId].nftsOwned?.splice(Number(nftId), 1);
    }
}

export { NftsRepository }