import { v4 as uuidV4 } from 'uuid'

class Wallet {
    id?: string;
    savePhrase: string;
    ballance: number;
    nftsOwned?: any;

constructor() {
    if(!this.id) {
        this.id = uuidV4();
        }
    }
}

export { Wallet }