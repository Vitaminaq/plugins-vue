import { createApp } from 'vue';
import Popup from './popup.vue';

const targetId = 'wefly-vue-popup';

export interface ConfirmOptions {
	message?: string;
	bgOpacity?: number;
	buttons?: CreateMyPupupButton[];
	callback?: () => any;
}

export interface AlertOptions {
	message?: string;
	bgOpacity?: number;
	btnText?: string;
	btnColor?: string;
	callback?: () => any;
}

export interface LoadingOptions {
	icon?: string;
	message?: string;
	bgOpacity?: number;
	duration?: number;
	callback?: () => any;
}

export interface ToastOptions {
	icon?: 'success' | 'warn' | 'error';
	message?: string;
	duration?: number;
	bgOpacity?: number;
}

export interface IframeOptions {
	url: string;
}

export interface CreateMyPupupButton {
	text: string;
	color?: string;
	callback?: () => any;
}

const create = (propsData: any, resolve?: any) => {
	const isExit = document.getElementById(targetId);
	if (isExit) return;
	const vn = createApp(Popup, {
		...propsData,
		onClose: function (r: any) {
			resolve && resolve(r);
			vn.unmount();
			const oldDom = document.getElementById(targetId);
			oldDom && document.body.removeChild(oldDom);
		},
	});
	const dom = document.createElement('div');
	dom.id = targetId;
	document.body.appendChild(dom);
	vn.mount(`#${targetId}`);
};

const hasCallback = <R>(propsData: any): Promise<R> => {
	return new Promise((resolve) => {
		create(propsData, resolve);
	});
};

export const confirm = <R>(options: ConfirmOptions = {}): Promise<R> => {
	const { buttons } = options;
	if (!buttons || !buttons.length) {
		options.buttons = [
			{
				text: '确定',
				color: 'orange',
			},
			{
				text: '取消',
			},
		];
	}
	return hasCallback<R>({ ...options, type: 'confirm' });
};

export const alert = (options: AlertOptions = {}): Promise<any> => {
	const { btnText } = options;
	if (!btnText) {
		options.btnText = '确定';
	}
	return hasCallback({ ...options, type: 'alert' });
};

export const loading = (options: LoadingOptions): Promise<any> => {
	return hasCallback({ ...options, type: 'loading' });
};

export interface ToastPropsData extends ToastOptions {
	type: 'toast';
}

export const toast = (
	options: ToastOptions | string,
	duration?: number
): any => {
	const propsData: ToastPropsData = {
		type: 'toast',
	};
	if (typeof options === 'string') {
		propsData.message = options;
		propsData.bgOpacity = 0;
		duration && (propsData.duration = duration);
	} else {
		Object.assign(propsData, options);
	}
	create(propsData);
};

export interface IframePropsData extends IframeOptions {
	type: 'iframe';
}

export const iframe = (options: IframeOptions) => {
	return hasCallback({ ...options, type: 'iframe' });
};

export default {
	confirm,
	alert,
	loading,
	toast,
	iframe,
};
