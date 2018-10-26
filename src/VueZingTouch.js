import ZingTouch from 'zingtouch';

//import Function_isFunction from '/utils/Function/isFunction';
//import Object_isObject from '/utils/Object/isObject';

let ztRegion;

export default {
	name: 'ZingTouch',

	install(Vue) {
		Vue.directive(this.name, this);
	},

	bind(el, {value, arg}) {
		if (arg) {
			if (!ztRegion) {
				ztRegion = new ZingTouch.Region(document.body);
			}
			let ztObject = ztRegion.bind(el);
			if (ztObject[arg]) {
				ztObject[arg](event => {
					value(event);
				});
			}
		}
	},

	unbind(el, {arg}) {
		ztRegion.unbind(el, arg);
	},
};
