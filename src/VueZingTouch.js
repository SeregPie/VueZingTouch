import ZingTouch from 'zingtouch';

import DeepMap from '/utils/DeepMap';
import Function_isFunction from '/utils/Function/isFunction';

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
		let handler;
		let options;
		if (Function_isFunction(value)) {
			handler = value;
		} else {
			options = value;
			({handler} = options);
		}
		let ztGesture = (() => {
			switch (arg) {
				case 'pan': return new ZingTouch.Pan(options);
				case 'rotate': return new ZingTouch.Rotate(options);
				case 'distance': return new ZingTouch.Distance(options);
				case 'swipe': return new ZingTouch.Swipe(options);
				case 'tap': return new ZingTouch.Tap(options);
			}
		})();
		if (ztGesture) {
			ztGestures.set(el, arg, ztGesture);
			ztRegion.bind(el, ztGesture, handler);
		}
	},

	unbind(el, {arg}) {
		let ztGesture = ztGestures.delete(el, arg);
		if (ztGesture) {
			ztRegion.unbind(el, ztGesture);
		}
	},
};
