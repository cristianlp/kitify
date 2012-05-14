(function(K) {
	/* Private helper */
	var _v = {
		msgs: []
	};
	
	/* Public Validation Namespace */
	V = {
		addMsg: function(html) {
			_v.msgs.push(html);
		},
		prependMsg: function(html) {
			_v.msgs.splice(0, 0, html);
		},
		clearMsgs: function() {
			K.Message.clear();
			_v.msgs.length = 0;
		},
		showMsgs: function() {
			if(_v.msgs.length) {
                                var html = '<ul>';
				$.each(_v.msgs, function(i, msg) {
					html += '<li>' + msg + '</li>';
				});				
				html += '</ul>';
				K.Message.show(html, 'error');
			}
		}
	};
	
	/* Validator Functions */
	V.validators = {};
	
	V.validators.required = function(field, $ctrl, val) {
                if((field.required || $ctrl.attr('required')) && !val) {
			V.addMsg('<strong>' + field.label + '</strong> is required.');
			return false;
		}
		return true;
	};
	
	V.validators.numeric = function(field, $ctrl, val) {
		var numericVal = parseFloat(val);
		if(!$.isNumeric(numericVal)) {
			V.addMsg('<strong>' + field.label + '</strong> must be a number.');
			return false;
		}
		return true;
	};

	V.validators.positiveNumeric = function(field, $ctrl, val) {
		var numericVal = parseFloat(val);
		if(!$.isNumeric(numericVal)) {
			V.addMsg('<strong>' + field.label + '</strong> must be a number.');
			return false;
		}
		if(numericVal <= 0) {
			V.addMsg('<strong>' + field.label + '</strong> must be a positive number.');
			return false;
		}
		return true;
	};
	
	V.validators.integer = function(field, $ctrl, val) {
		var intVal = parseFloat(val);
		if(!$.isNumeric(intVal)) {
			V.addMsg('<strong>' + field.label + '</strong> must be a number.');
			return false;
		}
		return true;
	};

	V.validators.positiveInteger = function(field, $ctrl, val) {
		var intVal = parseInt(val, 10);
		if(!$.isNumeric(intVal)) {
			V.addMsg('<strong>' + field.label + '</strong> must be an integer.');
			return false;
		}
		if(intVal <= 0) {
			V.addMsg('<strong>' + field.label + '</strong> must be a positive integer.');
			return false;
		}
		return true;
	};
	
	V.validators.url = function(field, $ctrl, val) {
	var _urlRe = /^((https?):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
		if(!_urlRe.test(val)) {
			V.addMsg('<strong>' + field.label + '</strong> is not a valid web address.');
			return false;
		}
		return true;
	};

	V.validators.email = function(field, $ctrl, val) {
        	var _emailRe = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i;
		if(!_emailRe.test(val)) {
			V.addMsg('<strong>' + field.label + '</strong> is not a valid email address.');
			return false;
		}
		return true;
	};

	K.Validation = V;
})(Kitify);