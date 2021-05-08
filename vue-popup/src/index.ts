import { App } from 'vue';
import createPupop, {
	ConfirmOptions,
	AlertOptions,
	LoadingOptions,
	ToastOptions,
	IframeOptions,
} from './wrap';

const plugin = (_Vue: App, injectKey: string) => {
	_Vue.provide(injectKey || 'popup', this);
	_Vue.config.globalProperties.$popup = createPupop;
};

export default plugin;

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$popup: {
			confirm: (options?: ConfirmOptions) => any;
			alert: (options?: AlertOptions) => any;
			loading: (options?: LoadingOptions) => any;
			toast: (options?: ToastOptions | string, duration?: number) => any;
			iframe: (options?: IframeOptions) => any;
		};
	}
}
