/**
 * Filtering input - acceping only numerical chars
 *
 * @author Branko Sekulic
 *
 * Options description:
 * @param {Number} length - max length acceptable
 * @param {boolean} addcommas - separate thousands by comma
 * @param {boolean} init - format input initially
 */
(function( $ ) {
	$.fn.numericInput = function(options){

		options = options ? options : {};
		var format = function(input){

			var caretPos = $(input).caret().start,
				valueOrig = $(input).attr('value'),
				i;


			value = valueOrig.match(/([\d]+)/g);
			value = value ? value.join('') : '';

			if(options.length)
				value = value.slice(0, options.length);

			if(options.addcommas){
				/** Adding commas */
				var rgx = /(\d+)(\d{3})/;
				while (rgx.test(value)) {
					value = value.replace(rgx, '$1' + ',' + '$2');
				}
			}else if(options.type == 'phone'){

				var parts = [value.slice(0,3),value.slice(3,6),value.slice(6,10)];

				value = parts[0];
				if(parts[0].length == '3'){
					value += '-';
				}
				value += parts[1];
				if(parts[1].length == '3'){
					value += '-';
				}
				value += parts[2];
			}

			if(valueOrig != value){

				var right = valueOrig.substring(caretPos, valueOrig.length);
				var numCount = 0;

				for(i in right){
					if(String(right[i]).match(/^\d$/)){
						numCount++;
					}
				}

				$(input).attr('value', value);

				var caretTo = value.length;
				for(i = value.length - 1; i >=0; i--){
					if(numCount == 0){
						break;
					}
					if(value[i].match(/^\d$/)){
						numCount--;
					}
					caretTo--;
				}
				$(input).caretTo(caretTo);
			}
		};
		$(this).each(function(){

			if(options.init){
				format(this);
			}

			$(this).keydown(function(e) {
				var caretPos = $(this).caret().start;

				if(e.keyCode == 8 && caretPos > 0){

					var value = $(this).val();
					if(!value[caretPos - 1].match(/^\d$/)){
						$(this).caretTo(caretPos - 1);
					}
				}
			});

			/* do not apply any formatting if key is left/right arrow */
			$(this).keyup(function(e) {

				if ( e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 ) {
					format(this);
				}
			});
		});
	};
})(jQuery);
