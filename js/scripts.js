// Global variables
var slideIndex = 1; 
var projectSelect = 0;
var viewWidths = ['42vw', '52vw', '45vw', '50vw']

// Open lightbox gallery
function openModal(n) {
    slideIndex = 1

    // Hide header
    document.getElementById("myModal").style.display = "block";
    document.getElementById("nav-header").style.zIndex = -10;

    projectSelect = n;

    // Enable current thumbnail gallery
    var thumb_select = "thumbnailSlides" + n.toString()
    document.getElementById(thumb_select).style.display = "inline";

    document.body.style.overflow = "hidden";
    document.getElementsByClassName("modal-content")[0].style.maxWidth = viewWidths[n - 1];
    showSlides(slideIndex)
}

// Close lightbox gallery
function closeModal() {

    // Unhide header
    document.getElementById("myModal").style.display = "none";
    document.getElementById("nav-header").style.zIndex = 10;
    
    // Hide thumbnail gallery
    var select = "thumbnailSlides" + projectSelect.toString()
    document.getElementById(select).style.display = "none";

    var gallerySelect = "gallery" + projectSelect.toString()
    var slides = document.getElementById(gallerySelect).getElementsByClassName("mySlides");

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    document.body.style.overflow = "visible"
}

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {

    var i;

    // Get current possible slide images
    var gallerySelect = "gallery" + projectSelect.toString()
    var slides = document.getElementById(gallerySelect).getElementsByClassName("mySlides");

    // Get current thumbnail gallery
    var thumb_select = "thumbnailSlides" + projectSelect.toString()
    var dots = document.getElementById(thumb_select).getElementsByClassName("demo");

    // Get caption text
    var captionText = document.getElementById("caption");

    // Loop to beginning
    if (n > slides.length) {
        slideIndex = 1;
    }

    // Loop to end
    if (n < 1) {
        slideIndex = slides.length;
    }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Deactivate all thumbnails
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display selected current image
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;

}

// Jquery functions
(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Return current year
    $("#current-year").text(new Date().getFullYear());

    // Animate motion to selected heading with navigation header is clicked
    $('header a').click(function(e) {

        e.preventDefault();
        var selected_heading = $(this).attr('href');
        var scrollDistance = $(selected_heading).offset().top - 50; // Page offset required

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(scrollDistance / 1.5)); // Animation length proportional to scroll distance

        // Hide menu on mobile if clicked
        if ($('header').hasClass('clicked')) {
            $('header, body').removeClass('clicked');
        }
    });

    // Scroll from bottom to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, Math.abs(window.pageYOffset));
    });

    // Scroll from top to first heading
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 300);
    });

    // Toggle mobile menu open
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('clicked');
    });

    // Toggle mobile menu closed
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('clicked');
    });

})(jQuery);
