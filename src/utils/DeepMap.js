import Function_bindRecursive from '/utils/Function/bindRecursive';

export default class {
	constructor() {
		this.node = new Map();
	}

	set(...path) {
		let value = path.pop();
		Function_bindRecursive((recur, parentNode, path, endNode) => {
			let key = path.pop();
			if (path.length) {
				let childNode = parentNode.get(key);
				if (!childNode) {
					parentNode.set(key, childNode = new Map());
				}
				recur(childNode, path, endNode);
			} else {
				parentNode.set(key, endNode);
			}
		})(this.node, path, value);
	}

	delete(...path) {
		return Function_bindRecursive((recur, parentNode, path) => {
			let key = path.pop();
			if (path.length) {
				let childNode = parentNode.get(key);
				if (childNode) {
					let endNode = recur(childNode, path);
					if (!childNode.size) {
						parentNode.delete(key);
					}
					return endNode;
				}
			} else {
				let endNode = parentNode.get(key);
				parentNode.delete(key);
				return endNode;
			}
		})(this.node, path);
	}
}
