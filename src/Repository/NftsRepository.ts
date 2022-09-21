import { Nft } from "../model/Nft"

import { Wallet } from '../model/Wallet'

interface IcreateNftDTO {
    name: string;
    description: string;
    price: number;
    deadline: number;
}

interface ImakeBidDTO {
    id: string;
    offer: number;
}

interface IcreateWalletDTO {
    ballance: number;
    savePhrase: string;
}

interface IbuyNftDTO {
    walletId: number;
    nftId: number;
}

class NftsRepository {
    private nfts: Nft[];
    private wallets: Wallet[];

    constructor() {
        this.nfts = [];
        this.wallets = [];
    }

    create({ name, description, deadline, price }: IcreateNftDTO): void {
        const nftVerifyAlreadyExists = this.nfts.find(nft => nft.name === name)

        if (!nftVerifyAlreadyExists) {
            const nft = new Nft()

            Object.assign(nft, {
                name,
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

    bid({ id, offer }: ImakeBidDTO): void {
        if (offer > Number(this.nfts[id].price)) {
            this.nfts[id].price = offer

        }
    }

    createWallet({ savePhrase, ballance }: IcreateWalletDTO): void {
        const wallet = new Wallet() 

        Object.assign(wallet, {
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

            this.wallets[walletId].nftsOwned.push(this.nfts[nftId])

            // Removes the NFT
            this.nfts.splice(Number(nftId), 1);
            
        }
    }
    
}

export { NftsRepository }