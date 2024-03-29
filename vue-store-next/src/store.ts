import Vue, { reactive } from 'vue'
import {
	getDescriptors,
	getPrototypes
} from './utils';
import Dep, { SubFunction } from './dep';

const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
const PolySymbol = (name) => 
hasSymbol
    ? Symbol('[vue-store-next]: ' + name )
    : ('[vue-store-next]: ' ) + name;

const storeInjectKey = PolySymbol('store' );


export const dep: Dep = new Dep();

const log = (path: string, args: any[]) => {
	console.log('');
	console.log('path：', path);
	console.log('params：', args);
	console.log('param：', args[0] || '');
	console.log('')
}

export class StoreObserve {
    public static showLog: boolean = false;

 	public constructor() {
		const descriptors = getDescriptors(getPrototypes(this, StoreObserve.prototype));
		Object.keys(descriptors).forEach(type => {
			const descriptor: PropertyDescriptor | undefined = descriptors[type];
			if (typeof descriptor !== 'undefined' && /^\$/.test(type) && typeof descriptor.value === 'function') {
				Object.defineProperty(this, type, {
					...descriptor,
					value: new Proxy((this as any)[type], {
						apply(target, thisArg, args) {
							StoreObserve.showLog && log(thisArg.path, args);
							dep.notify({
								path: `${thisArg.path}.${type}`,
								params: args,
								param: args[0]
							})
							return target.call(thisArg, ...args);
						}
					})
				});
				return;
			}
		});
	}
}

export default class Store extends StoreObserve {
	public constructor(modules?: any) {
		super();
		this.mergeOptions(modules);
	}

    public install(_Vue: any) {
		_Vue.provide(storeInjectKey, this);
        _Vue.config.globalProperties.$store = this;
	}

	public mergeOptions(modules: any): this {
		if (!modules) return this;
		Object.keys(modules).forEach((k) => {
			(this as any)[k] = modules[k];
		});
		return this;
	}

	public getState(father: any, target: any) {
		Object.getOwnPropertyNames(target).forEach(k => {
            	if (target[k] instanceof StoreObserve) {
				    this.getState(target, target[k]);
				} else {
					father && Object.keys(father).forEach(fk => {
						if (father[fk] === target) {
                            target.path = father.path ? `${father.path}.${fk}` : fk;
						}
					});
				}
		});
	}

	public init(status?: boolean) {
		this.getState(null, this);
		if (typeof status !== 'undefined') {
			StoreObserve.showLog = status;
		}
		return reactive(this);
	}

	// 添加模块
	public addModule(key: string, module: any): this {
		if (!module) return this;
		(this as any)[key] = module;
		this.getState(this, (this as any)[key]);
		return this;
	}

	public subscribe(callback: SubFunction):this {
		dep.addSub(callback)
		return this;
	}
	public removeSub(fn: SubFunction):this {
		dep.removeSub(fn);
		return this;
	}
	public destroySub():this {
		dep.destroy();
		return this;
	}
	// public replace(store: any) {}
}


export const useStore = () => {
	return Vue.inject(storeInjectKey);
}