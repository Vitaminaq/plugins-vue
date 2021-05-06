declare module 'vue/types/vue' {
	interface Vue {
		$pupop: {
			confirm: (options: ConfirmOptions) => any;
			alert: (options: AlertOptions) => any;
			loading: (options: LoadingOptions) => any;
			toast: (options: ToastOptions | string, duration?: number) => any;
		};
	}
}

export const T: any;

export default T;

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

export interface CreateMyPupupButton {
	text: string;
	color?: string;
	callback?: () => any;
}
