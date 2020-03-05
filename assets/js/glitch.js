(function($) {

	$.fn.glitch = function(options) {
		/**
		 * Itterate over each instance.
		 * @param  {Object}                key     Relative to the element assignment
		 * @param  {Object}                element The current Element assigned
		 * @return {[type]}                        [description]
		 */
		return this.each(function(key, element) {
			let settings = $.extend({
					// These are the defaults.
					done: function(){console.log('done!');},
					backgroundColor: "white"
			}, options );
			let dfd = $.Deferred();

			// Prevent any collisions with context function context
			let that = '';
      element = $(element);
      let originalText = element.text();
			/**
			 * Full fledged class containing the glitch effect,
			 * Will contain other glitch effects. Where currently
			 * the only effect is "randomly" glitching each char.
			 *
			 * @return {function}
			 */
      let TextScramble = (function(){
        let that = {};
        function TextScramble (elementRefrence,chars) {
          if(chars === undefined){
            that.chars = '!<>-_\\/[]{}—=+*^?#________';
          }
          that.element = elementRefrence;
          that.scrambledText = initalizeScramble();
        }
        /**
         * Random Scramble
         * @return {[type]}                [description]
         */
        function initalizeScramble(){
          that.originalText = that.element.text();
          let scrambleSet = []
          for (var i = 0; i < that.originalText.length; i++) {
            if(that.originalText[i] === ' '){
              scrambleSet.push(' ')
            }
            else{
              scrambleSet.push(randomChar())
            }
          }
          return scrambleSet;
        }
        /**
         * Randomly return a char from the set of chars defined
         * @return {String}                [description]
         */
        function randomChar() {
          return that.chars[Math.floor(Math.random() * that.chars.length)];
        }
				/**
				 * Thank you @darrenplace for this module, cleaned up the replace code.
				 * @param {[type]}                str   [description]
				 * @param {[type]}                index [description]
				 * @param {[type]}                chr   [description]
				 */
        function setCharAt(str,index,chr) {
          if(index > str.length-1) return str;
          return str.substr(0,index) + chr + str.substr(index+1);
        }
        function animateChar(index){
          let dfd = $.Deferred();

          let timeDiff = Math.floor(Math.random() * 80) + 10;
          let animateAmount = Math.floor(Math.random() * 5) + 10;
          
          // console.log("Determined time diff: ", timeDiff);
          /**
           * Animation effect
           * @return {[type]}                [description]
           */
          if(that.originalText[index] === ' '){
            that.element.text(
                setCharAt(
                  that.element.text(),
                  index,
                  that.originalText.charAt(index)
                )
              );
              dfd.resolve();
          }
          else{
            let intervalSignit = setInterval(function(){
              if(animateAmount === 0){
                clearInterval(intervalSignit);
                that.element.text(
                  setCharAt(
                    that.element.text(),
                    index,
                    that.originalText.charAt(index)
                  )
                );
                dfd.resolve();
              }
              else{
                that.element.text(
                  setCharAt(
                    that.element.text(),
                    index,
                    randomChar()
                  )
                );
                animateAmount--;
              }
            }, timeDiff);
          }



          return dfd.promise();
        }
        TextScramble.prototype.getScrambledText = function(){
          return that.scrambledText.join("");
        }
        TextScramble.prototype.animate = function(){
          let dfd = $.Deferred();
          let promiseChain = [];
          /**
           * Each character is animated on their own timeframe
           * @param  {[type]}                var [description]
           * @return {[type]}                    [description]
           */
          for (var i = 0; i < element.text().length; i++) {
            promiseChain.push(animateChar(i));
          }
          Promise.all(promiseChain)
            .then(function(){
              dfd.resolve();
            })
          // dfd.resolve();
          return dfd.promise();
        }
        return TextScramble;
      })();
			/**
			 * Initalize the effect with a reference of the elmeent passed.
			 * @type {TextScramble}
			 */
      let effect = new TextScramble(element)
			/**
			 * Change the elements text to a generally scrambled Text
			 */
      element.text(effect.getScrambledText());
			/**
			 * Animate the glitch effect
			 */
      effect.animate()
        .then(function(){
					settings.done(element);
        })

    });
	};
})(jQuery);
