
function Options() {
	this.options = {
		// If enable, the rpx conversion is automatically added
		rpx: { enable: true, size: 750 },

	};
}

Options.prototype.set = function(key, value) {
	this.options[key] = value;
}

Options.prototype.get = function(key) {
	return this.options[key];
}

module.exports = new Options();
