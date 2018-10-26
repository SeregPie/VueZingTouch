import ZingTouch from 'zingtouch';

//import Function_isFunction from '/utils/Function/isFunction';

let ztRegion;

export default {
	name: 'ZingTouch',

	install(Vue) {
		Vue.directive(this.name, this);
	},

	//deep: true,

	//acceptStatement: true,

	bind(el, {value, arg}) {
		if (arg) {
			if (!ztRegion) {
				ztRegion = new ZingTouch.Region(document.body);
			}
			let ztObject = ztRegion.bind(el);
			if (ztObject[arg]) {
				ztObject[arg](({detail: {data, events}}) => {
					value(data, ...events);
				});
			}
		}
	},

	unbind(el, {arg}) {
		ztRegion.unbind(el, arg);
	},
};
