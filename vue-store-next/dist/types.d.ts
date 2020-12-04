export interface NotifyOptions {
    path: string;
    params: any[];
    param: any;
}

export type SubFunction = (options: NotifyOptions) => void;

export class StoreOberser {}

export default class Store {
    install: () => any;
    init: () => any;
    addMoudle: (key: string, module: any) => this;
    subscribe: (callback: SubFunction) => this;
    removeSub: (fn: SubFunction) => this;
    destroySub: () => this;
}
