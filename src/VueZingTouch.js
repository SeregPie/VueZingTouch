import ZingTouch from 'zingtouch';

//import Function_isFunction from '/utils/Function/isFunction';
//import Object_isObject from '/utils/Object/isObject';
import DeepMap from '/utils/DeepMap';

let ztGestures = new DeepMap();
let ztRegion;

export default {
	name: 'ZingTouch',

	install(Vue) {
		Vue.directive(this.name, this);
	},

	bind(el, {value, arg}) {
		if (!ztRegion) {
			ztRegion = new ZingTouch.Region(document.body);
		}
		let ztGesture = (() => {
			switch (arg) {
				case 'pan': return new ZingTouch.Pan();
				case 'rotate': return new ZingTouch.Rotate();
				case 'distance': return new ZingTouch.Distance();
				case 'swipe': return new ZingTouch.Swipe();
				case 'tap': return new ZingTouch.Tap();
			}
		})();
		if (ztGesture) {
			ztGestures.set(el, arg, ztGesture);
			ztRegion.bind(el, ztGesture, event => {
				value(event);
			});
		}
	},

	unbind(el, {arg}) {
		let ztGesture = ztGestures.delete(el, arg);
		if (ztGesture) {
			ztRegion.unbind(el, ztGesture);
		}
	},
};
