/**
 * @author Guichaguri
 */

$(document).ready(function() {

    $('nav').addClass('hidden');
    $('nav #menu-button').click(function(event) {
        $('nav').toggleClass('hidden');
        event.preventDefault();
    });

    $('nav ul').append('<li id="scroll-button"><a href="#top" title="Scroll to the top">' +
                        '&#xf106;<span>Scroll to the top</span></a></li>');

    $('a').click(function(event) {
        var href = $(this).attr('href');
        if(href.substring(0, 1) == '#') {
            if($(href).length > 0) {
                $('body').animate({scrollTop: $(href).offset().top}, 500, function() {
                    window.location.hash = href == '#top' ? '' : href;
                });
                event.preventDefault();
            }
        }
    });

});