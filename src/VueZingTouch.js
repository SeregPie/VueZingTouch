import ZingTouch from 'zingtouch';

import DeepMap from '/utils/DeepMap';
import Function_isFunction from '/utils/Function/isFunction';
import Function_noop from '/utils/Function/noop';

let ztGestures = new DeepMap();
let ztRegion;

let VueZingTouch = {
	name: 'ZingTouch',

	bind(el, {
		arg,
		value,
	}) {
		if (!ztRegion) {
			ztRegion = new ZingTouch.Region(document.body);
		}
		let handler;
		let options;
		let type;
		if (Function_isFunction(value)) {
			handler = value;
			type = arg;
		} else {
			({
				handler = Function_noop,
				type = arg,
				...options
			} = value);
		}
		let ztGesture = (() => {
			switch (type) {
				case 'distance': return new ZingTouch.Distance(options);
				case 'pan': return new ZingTouch.Pan(options);
				case 'rotate': return new ZingTouch.Rotate(options);
				case 'swipe': return new ZingTouch.Swipe(options);
				case 'tap': return new ZingTouch.Tap(options);
			}
		})();
		if (ztGesture) {
			ztGestures.set(el, arg, ztGesture);
			ztRegion.bind(el, ztGesture, handler);
		}
	},

	update(el, {
		arg,
		oldValue,
		value,
	}) {
		if (value !== oldValue) {
			VueZingTouch.unbind(el, {arg});
			VueZingTouch.bind(el, {
				arg,
				value,
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

export default VueZingTouch;
