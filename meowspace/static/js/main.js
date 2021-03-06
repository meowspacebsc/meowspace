(function($) {
    "use strict";
    jQuery(document).on('ready', function() {
        $('.header-nav-center .nav-link').on('click', function(e) {
            $('.header-nav-center .navbar-collapse').collapse('hide');
            $('.header-nav-center .menu.ripplemenu').removeClass('active');
        });
        if ($('header').offset().top > 50) {
            $('body').addClass('fixed-header');
        } else {
            $('body').removeClass('fixed-header');
        }
        $(window).on('scroll', function() {
            if ($('header').offset().top > 50) {
                $('body').addClass('fixed-header');
            } else {
                $('body').removeClass('fixed-header');
            }
        });
        document.querySelectorAll('.effect-letter').forEach(button => {
            let div = document.createElement('div'),
                letters = button.textContent.trim().split('');

            function elements(letter, index, array) {
                let element = document.createElement('span'),
                    part = (index >= array.length / 2) ? -1 : 1,
                    position = (index >= array.length / 2) ? array.length / 2 - index + (array.length / 2 - 1) : index,
                    move = position / (array.length / 2),
                    rotate = 1 - move;
                element.innerHTML = !letter.trim() ? '&nbsp;' : letter;
                element.style.setProperty('--move', move);
                element.style.setProperty('--rotate', rotate);
                element.style.setProperty('--part', part);
                div.appendChild(element);
            }
            letters.forEach(elements);
            button.innerHTML = div.outerHTML;
            button.addEventListener('mouseenter', e => {
                if (!button.classList.contains('out')) {
                    button.classList.add('in');
                }
            });
            button.addEventListener('mouseleave', e => {
                if (button.classList.contains('in')) {
                    button.classList.add('out');
                    setTimeout(() => button.classList.remove('in', 'out'), 950);
                }
            });
        });
        document.querySelectorAll('.menu').forEach(btn => {
            btn.addEventListener('click', e => {
                btn.classList.toggle('active');
            });
        });
        $('body').scrollspy({
            target: ".navbar",
            offset: 50
        });
        $("#myNavbar a").on('click', function(event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function() {
                    window.location.hash = hash;
                });
            }
        });
        $('.collapse').on('show.bs.collapse', function() {
            $(this).siblings('.card-header').addClass('active');
        });
        $('.collapse').on('hide.bs.collapse', function() {
            $(this).siblings('.card-header').removeClass('active');
        });
        $('select[data-menu]').each(function() {
            let select = $(this),
                options = select.find('option'),
                menu = $('<div />').addClass('select-menu'),
                button = $('<div />').addClass('button'),
                list = $('<ul />'),
                arrow = $('<em />').prependTo(button);
            options.each(function(i) {
                let option = $(this);
                list.append($('<li />').text(option.text()));
            });
            menu.css('--t', select.find(':selected').index() * -41 + 'px');
            select.wrap(menu);
            button.append(list).insertAfter(select);
            list.clone().insertAfter(button);
        });
        $(document).on('click', '.select-menu', function(e) {
            let menu = $(this);
            if (!menu.hasClass('open')) {
                menu.addClass('open');
            }
        });
        $(document).on('click', '.select-menu > ul > li', function(e) {
            let li = $(this),
                menu = li.parent().parent(),
                select = menu.children('select'),
                selected = select.find('option:selected'),
                index = li.index();
            menu.css('--t', index * -41 + 'px');
            selected.attr('selected', false);
            select.find('option').eq(index).attr('selected', true);
            menu.addClass(index > selected.index() ? 'tilt-down' : 'tilt-up');
            setTimeout(() => {
                menu.removeClass('open tilt-up tilt-down');
            }, 500);
        });
        $(document).on('click', e => {
            e.stopPropagation();
            if ($('.select-menu').has(e.target).length === 0) {
                $('.select-menu').removeClass('open');
            }
        });
        $("#show_hide_password").on('click', 'a', function(event) {
            event.preventDefault();
            if ($('#show_hide_password input').attr("type") == "text") {
                $('#show_hide_password input').attr('type', 'password');
                $('#show_hide_password .hide_show span').addClass("hidden_outlined");
                $('#show_hide_password .hide_show span').removeClass("visible_outlined");
            } else if ($('#show_hide_password input').attr("type") == "password") {
                $('#show_hide_password input').attr('type', 'text');
                $('#show_hide_password .hide_show span').removeClass("hidden_outlined");
                $('#show_hide_password .hide_show span').addClass("visible_outlined");
            }
        });
        setTimeout(function() {
            $('body').addClass('loaded_page');
        }, 3000);
        var progressPath = document.querySelector('.prgoress_indicator path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function() {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).on('scroll', updateProgress);
        var offset = 250;
        var duration = 550;
        jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.prgoress_indicator').addClass('active-progress');
            } else {
                jQuery('.prgoress_indicator').removeClass('active-progress');
            }
        });
        jQuery('.prgoress_indicator').on('click', function(event) {
            event.preventDefault();
            jQuery('html, body').animate({
                scrollTop: 0
            }, duration);
            return false;
        });
        var galleryThumbs = new Swiper('.img_persong', {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });
        var galleryTop = new Swiper('.content_swiper', {
            spaceBetween: 10,
            autoplay: {
                delay: 2500,
                disableOnInteraction: true,
            },
            thumbs: {
                swiper: galleryThumbs
            }
        });
        var galleryThumbs = new Swiper('.person_thumbs', {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });
        var galleryTop = new Swiper('.swipe_circle', {
            spaceBetween: 10,
            autoplay: {
                delay: 2500,
                disableOnInteraction: true,
            },
            thumbs: {
                swiper: galleryThumbs
            }
        });
        var swiper = new Swiper(".swiper_default", {
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: true,
            },
        });
        var swiper = new Swiper('.swipe_basic_topic', {
            slidesPerView: 4,
            spaceBetween: 30,
            freeMode: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            breakpoints: {
                240: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                540: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }
        });
        var swiper = new Swiper('.feature_strories', {
            slidesPerView: 4,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                240: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                540: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }
        });
        $(".countdown").countdown();
        var delay = 400;
        $(".progress-bar").each(function(i) {
            $(this).delay(delay * i).animate({
                width: $(this).attr('aria-valuenow') + '%'
            }, delay);
        });
        $('.bxslider').bxSlider({
            minSlides: 1,
            maxSlides: 8,
            slideWidth: 160,
            slideMargin: 0,
            ticker: true,
            speed: 20000
        });
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
        var swiper = new Swiper('.swiper__center', {
            slidesPerView: 3,
            centeredSlides: false,
            spaceBetween: 30,
            grabCursor: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                240: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                540: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }
        });
        $('.dropdown.dropdown-hover').hover(function() {
            $(this).addClass('show')
        }, function() {
            $(this).removeClass('show')
        });
        $('.dropdown-submenu.dropdown-hover').hover(function() {
            $(this).addClass('show')
        }, function() {
            $(this).removeClass('show')
        });
        var coll = document.getElementsByClassName("dropdown_menu");
        var i;
        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.height) {
                    content.style.height = null;
                } else {
                    content.style.height = content.scrollHeight + "px";
                }
            });
        };
    });
    var $videoSrc;
    $('.btn_video').on('click', function() {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#mdllVideo').on('shown.bs.modal', function(e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#mdllVideo').on('hide.bs.modal', function(e) {
        $("#video").attr('src', $videoSrc);
    });
    setTimeout(() => {
        $("#myTost").toast('show')
    }, 8000);
    AOS.init({
        easing: 'ease-in-out',
        once: false,
        duration: 500,
    });
    var image = document.getElementsByClassName('cover-parallax');
    new simpleParallax(image, {
        delay: .6,
        transition: 'cubic-bezier(0,0,0,1)'
    });
    var image = document.getElementsByClassName('basic-parallax');
    new simpleParallax(image, {
        delay: .6,
        transition: 'cubic-bezier(0,0,0,1)'
    });
    var image = document.getElementsByClassName('horizontal-parallax');
    new simpleParallax(image, {
        orientation: 'right'
    });
    var image = document.getElementsByClassName('scale-parallax');
    new simpleParallax(image, {
        scale: 1.5
    });
    var image = document.getElementsByClassName('transition-parallax');
    new simpleParallax(image, {
        delay: .6,
        transition: 'cubic-bezier(0,0,0,1)'
    });
    $('.checkbox-item .item-select').on('click', function() {
        $(this).parent().find('.item-select.active').removeClass('active');
        $(this).addClass('active');
    });
    var swiper = new Swiper('.blog-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            240: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            540: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });
    var swiper = new Swiper('.swiper_vertical', {
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    });
    var sticky = new Sticky('.fixSide_scroll');
}(jQuery));
var controller = new ScrollMagic.Controller();