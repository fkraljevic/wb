jQuery(document).ready(function ($) {
    // Dynamic offset
    var dnOff = 0;
    if ($(window).width() > 720) {
        dnOff = 80;
    } else {
        dnOff = 50;
    }

    // Smooth scroll via button
    $(".btn--anchor").on('click', function (event) {
        event.preventDefault(); // Prevent default behaviour
        $('html,body').animate({ // Animate scroll
            scrollTop: $("#joinus").offset().top - dnOff
        }, 800, function () {
            window.location.hash = "#joinus"; // Add hash name to url
        });
    });

    // Smooth scroll via links
    $(".navigation__anchor").on('click', function (event) {
        event.preventDefault(); // Prevent default behaviour
        $('html, body').animate({ // Animate scroll
            scrollTop: $(this.hash).offset().top - dnOff
        }, 800, function () {
            window.location.hash = this.hash; // Add hash name to url
        });
    });

    // Sticky nav
    let stickyNavTop = $('.navigation').offset().top;  // Get navigation element
    const stickyNav = function () {
        const scrollTop = $(window).scrollTop(); // Get the current vertical position
        if (scrollTop > stickyNavTop) { // Check if current pos is grater than nav pos
            // Add classes
            $('.navigation').addClass('sticky');
            $('body').addClass('sticky');
        } else {
            // Remove classes
            $('.navigation').removeClass('sticky');
            $('body').removeClass('sticky');
        }
    };
    if ($(window).width() > 720) {
        $('.navigation').removeClass('mobile');
        stickyNav();  // Initialize function
        $(window).scroll(function () { // Repeat on scroll event
            stickyNav();
        });
    } else {
        $('.navigation').addClass('mobile');
    }

    $(window).on('resize', function(){
        if ($(window).width() > 720) {
            // Change dynamic offset
            dnOff = 80;
            $('.navigation').removeClass('mobile');
            stickyNav();  // Initialize function
            $(window).scroll(function () { // Repeat on scroll event
                stickyNav();
            });
        } else {
            // Change dynamic offset
            dnOff = 50;
            $('.navigation').addClass('mobile');
        }
    });

    $('.navigation__switch').on('click', function () {
        $('.navigation').toggleClass('opened');
    });


    // Form validation init
    $("form[name='ajaxForm']").validate({
        // Validation rules
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            message: "required"
        },
        // Validation error messages
        messages: {
            name: "Please enter your full name",
            email: "Please enter a valid email address",
            message: "Please enter a message"
        },
        submitHandler: function (form) {
            $(form).submit(function () {
                console.log(form);
                event.preventDefault();
                const message = $('.form-message');
                const url = 'http(s)://www.hashemian.com/tools/form-post-tester.php';
                const posting = $.post(url, {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    message: $('#message').val()
                });
                posting.done(function (data) {
                    message.show();
                    message.addClass('success');
                    message.text('Message sent!');
                });
                posting.fail(function (data) {
                    message.show();
                    message.addClass('error');
                    message.text('Something went wrong!');
                })
            });
        }
    });
});