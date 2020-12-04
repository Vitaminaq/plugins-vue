export interface NotifyOptions {
    path: string;
    params: any[];
    param: any;
}

export type SubFunction = (options: NotifyOptions) => void;

