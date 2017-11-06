jQuery(document).ready(function ($) {
    // Smooth scroll
    $(".anchor").on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 80
        }, 800, function () {
            window.location.hash = this.hash;
        });
    });

    // Sticky nav
    const stickyNavTop = $('.navigation').offset().top;
    const stickyNav = function () {
        const scrollTop = $(window).scrollTop();
        if (scrollTop > stickyNavTop) {
            $('.navigation').addClass('sticky');
            $('body').addClass('sticky');
        } else {
            $('.navigation').removeClass('sticky');
            $('body').removeClass('sticky');
        }
    };
    stickyNav();
    $(window).scroll(function () {
        stickyNav();
    });

    // Ajax form submit
    $("#ajaxform").submit(function (event) {
        event.preventDefault();
        const message = $('.message');
        const $form = $(this),
            url = 'http(s)://www.hashemian.com/tools/form-post-tester.php';
        const posting = $.post(url, {name: $('#name').val(), email: $('#email').val(), message: $('#message').val()});
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

});