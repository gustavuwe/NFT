import { v4 as uuidV4 } from 'uuid'
import { Nft } from '../model/Nft'

class Wallet {
    id?: string;
    name: string;
    savePhrase: string;
    ballance: number;
    nftsOwned?: Array<Nft>;

constructor() {
    if(!this.id) {
        this.id = uuidV4();
    }
    
    if(!this.nftsOwned) {
        this.nftsOwned = [];
    }
    }

}

export { Wallet }