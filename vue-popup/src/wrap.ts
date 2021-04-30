import { createApp } from 'vue';
import Popup from './popup.vue';

// 此写法暂时有bug
// const vn: VNode = createVNode(Popup, {
// 	...propsData,
// 	onClose: function (r: any) {
// 		resolve(r);
// 		const el = vn.el as Node;
// 		if (!document.body.contains(el)) return;
// 		document.body.removeChild(el);
// 	},
// });
// render(vn, document.body);

// console.log(vn, 'ooooooooooooooooooooooooooooooo');

// document.body.appendChild((vn as any).el);

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
}

export interface CreateMyPupupButton {
	text: string;
	color?: string;
	callback?: () => any;
}

const hasCallback = (propsData: any) => {
	return new Promise((resolve) => {
		const vn = createApp(Popup, {
			...propsData,
			onClose: function (r: any) {
				resolve(r);
				vn.unmount();
			},
		});
		vn.mount('#popup');
	});
};

export const confirm = (options: ConfirmOptions = {}): Promise<any> => {
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
	return hasCallback({ ...options, type: 'confirm' });
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

export const toast = (
	options: ToastOptions | string,
	duration?: number
): any => {
	const propsData: any = {
		type: 'toast',
	};
	if (typeof options === 'string') {
		propsData.message = options;
		propsData.bgOpacity = 0;
		duration && (propsData.duration = duration);
	} else {
		Object.assign(propsData, options);
	}
	const vn = createApp(Popup, {
		...propsData,
		onClose: function () {
			vn.unmount();
		},
	});
	vn.mount('#popup');
};

export default {
	confirm,
	alert,
	loading,
	toast,
};
