import { v4 as uuidV4 } from 'uuid'

class Wallet {
    id?: string;
    savePhrase: string;
    ballance: number;
    nftsOwned?: Array<any>;

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