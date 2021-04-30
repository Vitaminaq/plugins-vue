<template>
	<div class="my-pupop" @touchmove.prevent>
		<div
			class="my-pupop-bg"
			:style="{ opacity: show ? bgOpacity : 0 }"
			@click="!isLoadingOrToast && $emit('close')"
		></div>
		<transition name="min-toast" appear>
			<div v-if="type === 'toast' && !icon && show" class="min-toast">
				{{ message }}
			</div>
		</transition>
		<transition name="popup" appear>
			<div
				v-if="(type !== 'toast' || icon) && show"
				class="my-pupop-content"
			>
				<div
					v-if="isLoadingOrToast"
					:class="['loading-content', message ? '' : 'no-message']"
				>
					<img :src="relIcon" />
				</div>
				<div v-if="message" class="my-pupop-message">
					{{ message }}
				</div>
				<div class="my-pupop-operate" v-if="buttons.length">
					<button
						v-for="item in buttons"
						:key="item.text"
						class="my-pupop-btn"
						:style="{ color: item.color }"
						@click="opetateBtn(item)"
					>
						{{ item.text }}
					</button>
				</div>
				<div class="my-pupop-operate" v-if="btnText">
					<button
						class="my-pupop-btn"
						:style="{ color: btnColor }"
						@click="opetateBtn()"
					>
						{{ btnText }}
					</button>
				</div>
			</div>
		</transition>
	</div>
</template>
<script lang="ts">
import { PropType } from 'vue';
import successIcon from './images/success.svg';
import warnIcon from './images/warn.svg';
import errorIcon from './images/error.svg';
import loadingIcon from './images/loading.gif';

export interface VuePupupButton {
	text: string;
	color?: string;
	callback?: () => any;
}

export type PopupType = 'confirm' | 'alert' | 'loading' | 'toast';

export type PopupCallback = () => Promise<any>;

export type PopupIcon = 'success' | 'warn' | 'error';

export type PopupButton = {
	text: string;
	color?: string;
};

export interface PopupOption {
	type: PopupType;
	message?: string;
	buttons?: PopupButton[];
	callback?: PopupCallback;
	btnText?: string;
	btnColor?: string;
	duration?: number;
	icon?: PopupIcon;
	bgOpacity?: number;
}

interface Data {
	timer: any;
	show: boolean;
}

export default {
	props: {
		type: {
			type: String as PropType<PopupType>,
			default: 'toast',
		},
		message: {
			type: String,
			default: '',
		},
		buttons: {
			type: Array as PropType<PopupButton[]>,
			default: () => [],
		},
		callback: {
			type: Function as PropType<PopupCallback>,
			default: null,
		},
		btnText: {
			type: String,
			default: '',
		},
		btnColor: {
			type: String,
			default: 'orange',
		},
		duration: {
			type: Number,
			default: 500,
		},
		icon: {
			type: String as PropType<PopupIcon>,
			default: '',
		},
		bgOpacity: {
			type: Number,
			default: 0.4,
		},
	},
	data(): Data {
		return {
			timer: 0,
			show: false,
		};
	},
	computed: {
		isLoadingOrToast(): boolean {
			return this.type === 'loading' || this.type === 'toast';
		},
		relIcon(): string {
			const icons = {
				success: successIcon,
				warn: warnIcon,
				error: errorIcon,
			};
			const { icon } = this;
			if (!icon) return loadingIcon;
			return icons[icon] || icon;
		},
	},
	async mounted() {
		this.show = true;
		if (this.isLoadingOrToast) {
			if (this.callback) {
				const r = await this.callback();
				this.$emit('close', r);
				return;
			} else {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.show = false;
					setTimeout(() => {
						this.$emit('close', null);
					}, 300);
				}, this.duration);
			}
		}
	},
	methods: {
		async opetateBtn(btn?: VuePupupButton) {
			if (!btn && !this.callback) return this.emitParent(null);
			let r = null;
			if (!btn && this.callback) {
				r = await this.callback();
				return this.emitParent(r);
			}
			if (!btn) return;
			const { text, callback } = btn;
			if (callback) {
				r = await callback();
			}
			if (!callback && this.callback && text === '确定') {
				r = await this.callback();
			}
			this.emitParent(r);
		},
		emitParent(r: any) {
			this.show = false;
			setTimeout(() => {
				this.$emit('close', r);
			}, 300);
		},
	},
};
</script>
<style lang="less">
.my-pupop {
	.my-pupop-bg {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 9998;
		background-color: #333;
		opacity: 0;
		transition: all 0.3s;
	}
	@keyframes showToast {
		from {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0);
		}

		to {
			opacity: 0.8;
			transform: translate(-50%, -50%) scale(1);
		}
	}
	@keyframes hideToast {
		from {
			opacity: 0.8;
			transform: translate(-50%, -50%) scale(1);
		}

		to {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0);
		}
	}
	.min-toast {
		position: fixed;
		top: 50%;
		left: 50%;
		font-size: 14px;
		transform: translate(-50%, -50%) scale(1);
		background-color: #333;
		opacity: 0.8;
		color: #fff;
		padding: 4px 10px;
		border-radius: 100px;
	}
	.min-toast-enter-active {
		animation: showToast 0.3s;
	}
	.min-toast-leave-active {
		animation: hideToast 0.3s;
	}

	@keyframes showPopup {
		from {
			opacity: 0;
			transform: translateY(-50%) scale(0);
		}

		to {
			opacity: 1;
			transform: translateY(-50%) scale(1);
		}
	}
	@keyframes hidePopup {
		from {
			opacity: 1;
			transform: translateY(-50%) scale(1);
		}

		to {
			opacity: 0;
			transform: translateY(-50%) scale(0);
		}
	}
	.my-pupop-content {
		position: fixed;
		top: 50%;
		left: 15%;
		right: 15%;
		z-index: 9999;
		padding-top: 22px;
		transform: translateY(-50%);
		background-color: #fff;
		border-radius: 10px;
		display: flex;
		flex-direction: column;

		.loading-content {
			text-align: center;
			&.no-message {
				margin-bottom: 15px;
			}
			img,
			svg {
				height: 40px;
				width: 40px;
			}
		}

		.my-pupop-message {
			margin-bottom: 20px;
			font-size: 14px;
			text-align: center;
			font-weight: 300;
		}
		.my-pupop-operate {
			display: flex;
			margin-top: 5px;
			// prettier-ignore
			border-top: 1PX solid #dfdfe6;
			.my-pupop-btn {
				margin: 0;
				padding: 12px 0;
				outline: none;
				border-style: none;
				background-color: rgba(255, 255, 255, 0);
				font-size: 15px;
				flex-grow: 1;
				cursor: pointer;
				&:nth-child(1) {
					// prettier-ignore
					border-right: 1PX solid #dfdfe6;
				}
			}
		}
	}
	.popup-enter-active {
		animation: showPopup 0.3s;
	}
	.popup-leave-active {
		animation: hidePopup 0.3s;
	}
}
</style>
