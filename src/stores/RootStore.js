import { configure } from 'mobx';
import OperationStore from "./OperationStore";


configure({ enforceActions: 'observed' });
class RootStore {
    constructor() {
        this.operationStore= new OperationStore(this);

    }
}

const rootStore = new RootStore();
export default rootStore;
