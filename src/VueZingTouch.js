import ZingTouch from 'zingtouch';

import DeepMap from '/utils/DeepMap';
import Function_isFunction from '/utils/Function/isFunction';
import Function_noop from '/utils/Function/noop';

let ztGestures = new DeepMap();
let ztRegion;

let VueZingTouch = {
	name: 'ZingTouch',

	bind(el, {value, arg}) {
		if (!ztRegion) {
			ztRegion = new ZingTouch.Region(document.body);
		}
		let gesture;
		let handler;
		let options;
		if (Function_isFunction(value)) {
			handler = value;
			gesture = arg;
		} else
		if (value) {
			options = value;
			handler = options.handler || Function_noop;
			gesture = options.extends || arg;
		}
		let ztGesture = (() => {
			switch (gesture) {
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

	update(el, {value, oldValue, arg}) {
		if (value !== oldValue) {
			VueZingTouch.unbind(el, {arg});
			VueZingTouch.bind(el, {value, arg});
		}
	},

	unbind(el, {arg}) {
		let ztGesture = ztGestures.delete(el, arg);
		if (ztGesture) {
			ztRegion.unbind(el, ztGesture);
		}
	},
};

export default VueZingTouch;
