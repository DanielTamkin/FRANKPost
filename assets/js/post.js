(function ($) {
    'use strict';

    /*START WOW ANIMATION JS*/
    new WOW().init();
    /*END WOW ANIMATION JS*/

// ——————————————————————————————————————————————————
// Glitch Effect
// ——————————————————————————————————————————————————

class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '!<>-_\\/[]{}—=+*^?#________'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.5) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }
  
  const phrases = [
    'Post Services'
  ]
  
  const el = document.querySelector('#post-hero-glitch')
  const fx = new TextScramble(el)
  
  let counter = 0
  const next = () => {
    fx.setText(phrases[counter])
    counter = (counter) % phrases.length
  }
  
  next()

      jQuery(document).on('ready', function() {
          /*START MENU JS*/
          $('a.page-scroll').on('click', function(e) {
              var anchor = $(this);
              $('html, body').stop().animate({
                  scrollTop: $(anchor.attr('href')).offset().top - 130
              }, 1500);
              e.preventDefault();
          });

          $(window).on('scroll', function() {
              if ($(this).scrollTop() > 100) {
                  $('.menu-top').addClass('menu-shrink'),
                  $('.post-logo').addClass('logo-invert');
              } else {
                  $('.menu-top').removeClass('menu-shrink'),
                  $('.post-logo').removeClass('logo-invert');
              }
          });

          $(document).on('click', '.navbar-collapse.in', function(e) {
              if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                  $(this).collapse('hide');
              }
          });
          /*END MENU JS*/
      });


})(jQuery);