import VueZingTouch from './VueZingTouch';

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.directive(VueZingTouch.name, VueZingTouch);
}

export default VueZingTouch;
