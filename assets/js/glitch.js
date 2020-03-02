(function($) {
	// 'use strict';

	String.prototype.replaceAt=function(index, replacement) {
		return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
	}


	$.fn.glitch = function() {
		return this.each(function(key, value) {
			let that = '';
			class TextScramble {
				constructor(element) {
					this.randChars = [];
					this.element = element;
					this.chars = '!<>-_\\/[]{}—=+*^?#________';
					this.update = this.update.bind(this);
					this.initalizeChars();
					this.randCurrent = 0;
					that = this;
				}
				initalizeChars(){
					this.charOriginal = this.element.text();
					let charSize = this.charOriginal.length;
					for (let index = 0; index < charSize; index++) {
						this.randChars[index] = this.randomChar();
					}
					
				}
				randCharsOutput(){
					return this.randChars.join("");
				}
				update(){
					if(this.randCurrent <= this.randChars.length){
						this.randCurrent++;
						return this.randChars[this.randCurrent];
					}
					else{
						// do nothing
					}
					
				}

				animateChar(location,parentCallback){

					function setCharAt(str,index,chr) {
						if(index > str.length-1) return str;
						return str.substr(0,index) + chr + str.substr(index+1);
					}
					async function animateStop(timer,callback){
						await clearTimeout(timer);


						await cancelAnimationFrame(animate);
						await callback();
					}
					let frameCount = 0;
					let frameMax = Math.floor(Math.random() * 40) + 10;
					// console.log("Time difference: ",baseline);
					let count = 0;
					function animate(){
						function animateCharNow(){
							if(frameCount >= frameMax){


								
								// console.log("DONE");
								// count += 1;
	
								animateStop(timer,function(){
									console.log('what');
									that.element.text(
										setCharAt(
											currentText,location,
											that.charOriginal.charAt(location))
										);
								});
							}
							else{
								requestAnimationFrame(animate);
								frameCount += 1;
							}
						}
						//console.log('Happening');
						let currentText = that.element.text();
						that.element.text(setCharAt(currentText,location,that.randomChar()));
						let fps = 60;
						
						let timer =  setTimeout(animateCharNow, 1000 / fps);
					}

					

					if(!(location > this.randChars.length)){
						let otherThis = this;
						otherThis.frameRequest = requestAnimationFrame(animate);
						
						parentCallback();


						// this.frame;
					}
					else{
						// Out of bounds scope
					}
				}
				animate(callback){
					let count = 0;
					for (let index = 0; index < this.charOriginal.length; index++) {
						// console.log(this.charOriginal.charAt(index));
						
						this.animateChar(index, function(){
							count++;
							console.log('This Word is now done: ',that.charOriginal, count);
							if(count === that.charOriginal.length){
								console.log("This word is now done");
								callback();
							}
						});
					}
										
				}
				reset(){
					console.log(this.charOriginal);
					
					this.element.text(this.charOriginal);
				}
				randomChar() {
					return this.chars[Math.floor(Math.random() * this.chars.length)];
				}

			}
		
			// console.log(key, value);
			value = $(value);
			// console.log('Ran');
			// Do something to each element here.
			let scramble = new TextScramble(value);
			// console.log(scramble.update());
			value.text(scramble.randCharsOutput());
			scramble.animate(function(){
				scramble.reset();
			});
			// value.html('&nbsp;')
			// const originalText = this.html();
		});

	};



	


})(jQuery);

// //  OPTIONS  //
// (function ( $ ) {
 
// 	$.fn.greenify = function( options ) {
 
// 		// This is the easiest way to have default options.
// 		var settings = $.extend({
// 			// These are the defaults.
// 			color: "#556b2f",
// 			backgroundColor: "white"
// 		}, options );
 
// 		// Greenify the collection based on the settings variable.
// 		return this.css({
// 			color: settings.color,
// 			backgroundColor: settings.backgroundColor
// 		});
 
// 	};
 
// }( jQuery ));