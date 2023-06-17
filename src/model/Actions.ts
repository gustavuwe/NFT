import { Nft } from '../model/Nft'

class Actions {
    transactions?: Array<Nft>;

constructor() {
    if(!this.transactions) {
        this.transactions = [];
        }
    }
}
export { Actions }