import { v4 as uuidV4 } from 'uuid'

class Nft {
    id?: string;
    name: string;
    author: string;
    description: string;
    price: number;
    deadline: number;
    owner: number;


constructor() {
    if(!this.id) {
        this.id = uuidV4();
        }
    }

}

export { Nft }