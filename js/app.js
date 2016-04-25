'use strict';

/*
 * A Design by GraphBerry
 * Author: GraphBerry
 * Author URL: http://graphberry.com
 * License: http://graphberry.com/pages/license
 */

 // Open offsite navigation.
 $('#nav-expander').on('click', function(e) {
    e.preventDefault();
    $('nav').toggleClass('nav-expanded');
});

// Close offsite navigation.
 $('.menu .close').on('click', function(e) {
    e.preventDefault();
    $('nav').toggleClass('nav-expanded');
});

// Close offsite navigation after user click on an link in navigation.
$('.menu  a').on('click', function(e) {
    e.preventDefault();
    $('nav').removeClass('nav-expanded');
});


//Calculate full with of jumbotron.
 function homeFullScreen() {

    var homeSection = $('.home');
    var windowHeight = $(window).outerHeight();

    if (homeSection.hasClass('home-fullscreen')) {

        $('.home-fullscreen').css('height', windowHeight);
    }
}

 //Load details of single project from portfolio.
 function openProject() {

    var portfolioItem = $('.portfolio-item  a');
    var singleProject = $('#single-project');
    
    portfolioItem.click(function () {

        var link = $(this).attr('href');
        $('html, body').animate({
            scrollTop: singleProject.offset().top - 30
        }, 500);

        singleProject.empty();

        setTimeout(function () {
            singleProject.load(link, function (response, status) {
                if (status === "error") {
                    alert("An error");
                } else {
                    singleProject.slideDown(500);

                    var closeProject = $('#close-project');
                    closeProject.on('click', function () {
                        singleProject.slideUp(500);
                        setTimeout(function () {

                            singleProject.empty();
                        }, 500);
                    });
                }
            });
        }, 500);
        return false;
    });
}
//Initialization
$(window).load(function () {
    openProject();
    homeFullScreen();

    smoothScroll.init();
});


//What happen on window resize
$(window).resize(function () {
    homeFullScreen();
});



//Set langitude and latidute for your location
var lat = 27.206053;
var lng = 77.952654;
var myLangLat = new google.maps.LatLng(lat, lng);

google.maps.Map.prototype.setCenterWithOffset= function(latlng, offsetX, offsetY) {
    var map = this;
    var ov = new google.maps.OverlayView();
    ov.onAdd = function() {
        var proj = this.getProjection();
        var aPoint = proj.fromLatLngToContainerPixel(latlng);
        aPoint.x = aPoint.x+offsetX;
        aPoint.y = aPoint.y+offsetY;
        map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
    }; 
    ov.draw = function() {}; 
    ov.setMap(this); 
};

/*
 * This function initialize google map. More info on 
 * https://developers.google.com/maps/documentation/javascript/
 */
 function initializeMap() {

 	var mapOptions = {
 		zoom: 12,
 		zoomControl: true,
 		scaleControl: true,
 		scrollwheel: false,
 		draggable: true,
 		center: myLangLat,
 		mapTypeControlOptions: {
 			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
 		},
 		
 	};

    var map = new google.maps.Map(document.getElementById('map-canvas2'), mapOptions);

    var marker = new google.maps.Marker({
        position: myLangLat,
        title:"We are here!"
    });
    marker.setMap(map);

}
google.maps.event.addDomListener(window, 'load', initializeMap);

// google.maps.event.addDomListener(window, 'resize', function() {
//     map.setCenterWithOffset(myLangLat, 0, -55);
// });