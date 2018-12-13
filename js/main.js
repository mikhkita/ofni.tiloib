$(document).ready(function(){	
    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
        if( myWidth > 1179 ){
            isDesktop = true;
            isTablet = false;
            isMobile = false;
        }else if( myWidth > 767 ){
            isDesktop = false;
            isTablet = true;
            isMobile = false;
        }else{
            isDesktop = false;
            isTablet = false;
            isMobile = true;
        }
    }
    $(window).resize(resize);
    resize();

    //  if( $("#video").length ){
    //     var video = document.getElementById('video');
    //     // video.src = $("#videosource").attr("src");
    //     // video.load();

    //     video.addEventListener('loadeddata', function() {
    //        // $(".b-main .b-video-cont").addClass("dark");
    //        $(".b-bg-video-cont img").css("opacity", "0");
    //        $(".b-bg-video-cont img").css("visibility", "hidden");
    //     }, false);
    // }
    
    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();

    function videoResize(){
        if ((myWidth / myHeight) >= 1.7795100223) {
            $(".b-bg-video-cont .b-video").width(myWidth);
            $(".b-bg-video-cont .b-video").height("auto");
        }else{
            $(".b-bg-video-cont .b-video").width("auto");
            $(".b-bg-video-cont .b-video").height(myHeight);
        };
    }

    videoResize();
    

    $(window).resize(function(){
        videoResize();
    });
    

    // if (!isMobile){
    //   $(".b-event-green").height( $(".b-event-green").width());
    //   $(".b-event-green").css("top", - ($(".b-event-green").width() / 2));
    //   $(".b-event-description").css("top", - ($(".b-event-description").width() / 2 - 80));
    // }

    if (!isMobile) { 
      $('.b-demo-video').enllax();
      $(".b-production-point").removeClass("fancy");
    }
    if (isMobile) { 
      // $('.b-info-items').slick();
      // $(".b-production-point").addClass("fancy");
      $('.b-logos').slick();
    }
    $(".b-info-items").slick({
            infinite: true,
            speed: 500,
            slidesToScroll: 1,
            slidesToShow: 4,
            touchThreshold: 100,
            arrows: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                    dots: true,
                    slidesToShow: 3
                  }
                },
                {
                    breakpoint: 768,
                    settings: {
                    dots: true,
                    slidesToShow: 2
                  }
                },
                {
                    breakpoint: 600,
                    settings: {
                    dots: false,
                    slidesToShow: 1
                  }
                }
            ]
    });
    // $(".b-logos").slick({
    //         infinite: true,
    //         speed: 500,
    //         slidesToScroll: 1,
    //         slidesToShow: 4,
    //         touchThreshold: 100,
    //         arrows: true,
    //         dots: true,
    //         responsive: [
    //             {
    //                 breakpoint: 1024,
    //                 settings: {
    //                 dots: true,
    //                 slidesToShow: 3
    //               }
    //             },
    //             {
    //                 breakpoint: 768,
    //                 settings: {
    //                 dots: true,
    //                 slidesToShow: 2
    //               }
    //             },
    //             {
    //                 breakpoint: 600,
    //                 settings: {
    //                 dots: false,
    //                 slidesToShow: 1
    //               }
    //             }
    //         ]
    // });


    // $(".b-round-btn").on("click", function(){
    //     $(".b-embedded-video").css("opacity", "1");
    //     $(".b-round-btn").css("opacity", "0");
    // });

    $(".b-production-slider").slick({
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        touchThreshold: 100,
        arrows: true,
        dots: false,
        useCSS: true,
        useTransform: true
    });
    $('.b-production-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $(".b-production-tabs ul li").removeClass("active");
        $('[data-id = ' + nextSlide + ']').addClass("active");
    });

     $(".fancy:not(.fancy-binded)").each(function(){
            var $popup = $($(this).attr("data-block")),
                $this = $(this);
            console.log($(this).attr("data-manager"));
            $this.fancybox({
                padding : 0,
                content : $popup,
                touch: false,
                helpers: {
                    overlay: {
                        locked: true 
                    }
                },
                beforeShow: function(){
                    $(".fancybox-wrap").addClass("beforeShow");
                    $popup.find(".custom-field").remove();
                    if( $this.attr("data-value") ){
                        var name = getNextField($popup.find("form"));
                        $popup.find("form").append("<input type='hidden' class='custom-field' name='"+name+"' value='"+$this.attr("data-value")+"'/><input type='hidden' class='custom-field' name='"+name+"-name' value='"+$this.attr("data-name")+"'/>");
                    }
                    if( $this.attr("data-beforeShow") && customHandlers[$this.attr("data-beforeShow")] ){
                        customHandlers[$this.attr("data-beforeShow")]($this);
                    }
                },
                afterShow: function(){
                    $(".fancybox-wrap").removeClass("beforeShow");
                    $(".fancybox-wrap").addClass("afterShow");
                    if( $this.attr("data-afterShow") && customHandlers[$this.attr("data-afterShow")] ){
                        customHandlers[$this.attr("data-afterShow")]($this);
                    }
                    $popup.find("input[type='text'],input[type='number'],textarea").eq(0).focus();
                },
                beforeClose: function(){
                    $(".fancybox-wrap").removeClass("afterShow");
                    $(".fancybox-wrap").addClass("beforeClose");
                    if( $this.attr("data-beforeClose") && customHandlers[$this.attr("data-beforeClose")] ){
                        customHandlers[$this.attr("data-beforeClose")]($this);
                    }
                },
                afterClose: function(){
                    $(".fancybox-wrap").removeClass("beforeClose");
                    $(".fancybox-wrap").addClass("afterClose");
                    if( $this.attr("data-afterClose") && customHandlers[$this.attr("data-afterClose")] ){
                        customHandlers[$this.attr("data-afterClose")]($this);
                    }
                }
            });
                $this.addClass("fancy-binded");
        });
    // $('.b-production-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    //     slide = $(this).attr("data-id");
    //     $(".b-production-tabs ul li").removeClass("active");
    //     $(this).addClass("active");
    //     $(".b-production-slider").slick('slickGoTo', slide);
    // });
    // $(".b-floating-right").stick_in_parent({
    //   offset_top: 24
    // });

    $(".b-production-tabs ul li").on("click", function(){
        slide = $(this).attr("data-id");
        $(".b-production-tabs ul li").removeClass("active");
        $(this).addClass("active");
        $(".b-production-slider").slick('slickGoTo', slide);
    });

    if (isMobile) {
      var slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 250,
        'tolerance': 70,
        'side': 'right',
        'touch': false
      }); 

      $('#menu').css('display','block');
      $('#menu').css('opacity','0');
          function close(eve) {
          eve.preventDefault();
          slideout.close();
          }
          slideout
              .on('beforeopen', function() {
                $(" #panel ").addClass("panel-open");
                $('#menu').css('opacity','1');
              })
              .on('open', function() {
                 this.panel.addEventListener('click', close);
              })
              .on('beforeclose', function() {
                $(" #panel ").removeClass("panel-open");
                this.panel.removeEventListener('click', close);
                 $('#menu').css('opacity','0');
              });
          slideout.once('open', slideout._initTouchEvents);
          slideout.on('open', slideout.enableTouch);
          slideout.on('close', slideout.disableTouch);
          document.querySelector('.toggle-button').addEventListener('click', function() {
          slideout.toggle();
          });

  };



    
	// var myPlace = new google.maps.LatLng(56.4742102, 85.0501512);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    };
 //    var map = new google.maps.Map(document.getElementById("b-map"), myOptions); 

 //    var marker = new google.maps.Marker({
	//      icon: {
 //                url: "../i/marker.svg",
 //                scaledSize: new google.maps.Size(28, 40), // scaled size
 //                origin: new google.maps.Point(0,0), // origin
 //                anchor: new google.maps.Point(17,53), // anchor
 //            },
 //        position: myPlace,
	//     map: map,
	//     title: 'ООО "Биолит"'
	// });

    var russiaPlace = new google.maps.LatLng(61.0325544, 91.8396064);
    var greenPlace = new google.maps.LatLng(56.4742102, 85.0501512);
    var yellowPlace = new google.maps.LatLng(55.4742102, 86.0501512);
    var grayPlace = new google.maps.LatLng(54.4742102, 82.0501512);
    
    var myEventMapOptions = {
        zoom: 3.2,
        center: russiaPlace,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            elementType: 'geometry',
            stylers: [{color: '#F4F7FC'}]
          },
          {
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          },
          {
            elementType: 'labels.text.fill',
            stylers: [{color: '#616161'}]
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [{color: '#f5f5f5'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#bdbdbd'}]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#eeeeee'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#757575'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#e5e5e5'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#ffffff'}]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [{color: '#757575'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#dadada'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#616161'}]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#e5e5e5'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#eeeeee'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#ffffff'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
          },
          {
            featureType: 'administrative.country',
            elementType: 'geometry.stroke',
            stylers: [{color: '#A3A3A3'}]
          },
          {
            featureType: 'administrative.province',
            elementType: 'geometry.stroke',
            stylers: [{color: '#A3A3A3'}]
          }
        ]
    };

    var eventMap = new google.maps.Map(document.getElementById("b-event-map"), myEventMapOptions); 

    var eventMarkerGreen = new google.maps.Marker({
        icon: {
                url: "../i/event-marker-green.svg",
                scaledSize: new google.maps.Size(16, 16),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(8,8),
            },
        position: greenPlace,
        map: eventMap,
        title: 'Экскурсия по заводу'
    });
    var eventMarkerYellow = new google.maps.Marker({
        icon: {
                url: "../i/event-marker-yellow.svg",
                scaledSize: new google.maps.Size(16, 16),
                origin: new google.maps.Point(0,0), 
                anchor: new google.maps.Point(8,8),
            },
        position: yellowPlace,
        map: eventMap,
        title: 'Лекция по препаратам'
    });
    var eventMarkerGray = new google.maps.Marker({
        icon: {
                url: "../i/event-marker-gray.svg",
                scaledSize: new google.maps.Size(16, 16),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(8,8),
            },
        position: grayPlace,
        map: eventMap,
        title: 'Фармацевтический форум'
    });
  

    // function initMap() {
    //   var biolit = {lat: 56.4742102, lng: 85.0501512};
    //   var map = new google.maps.Map(document.getElementById('b-map'), {
    //     zoom: 16,
    //     center: biolit,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP,
    //     disableDefaultUI: true,
    //     scrollwheel: false,
    //     zoomControl: true
    //   });
    // };
  // initMap();
  var contentString1 =  '<div class="b-bubble-cont">' +
                            '<div class="b-event-green-bubble">' +
                                '<div class="b-event-date-bubble">22 октября</div>' +
                                '<div class="b-event-time-bubble">16:00</div>' +
                            '</div>' +
                            '<div class="b-event-description-bubble">' +
                                '<div class="b-event-header-bubble">Экскурсия по заводу</div>' +
                                '<p class="b-event-adress-bubble">г.Томск, ул Дальне-ключевская 162</p>' +
                                '<p>Биолит проводит экскурсию по заводу в городе Томске, где будут показаны новые технологии в области химии и биологии</p>' +
                            '</div>' +
                        '</div>';
  var contentString2=  '<div class="b-bubble-cont">' +
                            '<div class="b-event-green-bubble">' +
                                '<div class="b-event-date-bubble">22 октября</div>' +
                                '<div class="b-event-time-bubble">16:00</div>' +
                            '</div>' +
                            '<div class="b-event-description-bubble">' +
                                '<div class="b-event-header-bubble">Экскурсия по заводу</div>' +
                                '<p class="b-event-adress-bubble">г.Томск, ул Дальне-ключевская 162</p>' +
                                '<p>Биолит проводит экскурсию по заводу в городе Томске, где будут показаны новые технологии в области химии и биологии</p>' +
                            '</div>' +
                        '</div>';
  var contentString3 =  '<div class="b-bubble-cont">' +
                            '<div class="b-event-green-bubble">' +
                                '<div class="b-event-date-bubble">22 октября</div>' +
                                '<div class="b-event-time-bubble">16:00</div>' +
                            '</div>' +
                            '<div class="b-event-description-bubble">' +
                                '<div class="b-event-header-bubble">Экскурсия по заводу</div>' +
                                '<p class="b-event-adress-bubble">г.Томск, ул Дальне-ключевская 162</p>' +
                                '<p>Биолит проводит экскурсию по заводу в городе Томске, где будут показаны новые технологии в области химии и биологии</p>' +
                            '</div>' +
                        '</div>';

   var infoBubble1 = new InfoBubble({
      map: eventMap,
      content: contentString1,
      position: greenPlace,
      shadowStyle: 0,
      padding: 0,
      minWidth: 350,
      minHeight: 308,
      backgroundColor: '#fff',
      borderRadius: 30,
      arrowSize: 20,
      borderWidth: 0,
      borderColor: '#2c2c2c',
      disableAutoPan: true,
      hideCloseButton: false,
      arrowPosition: '50',
      backgroundClassName: 'transparent',
      tabClassName: 'bubble',
      arrowStyle: 0,
      closeSrc: '../i/close-cross.svg'

});
   var infoBubble2 = new InfoBubble({
      map: eventMap,
      content: contentString2,
      position: yellowPlace,
      shadowStyle: 0,
      padding: 0,
      minWidth: 350,
      minHeight: 308,
      backgroundColor: '#fff',
      borderRadius: 30,
      arrowSize: 20,
      borderWidth: 0,
      borderColor: '#2c2c2c',
      disableAutoPan: true,
      hideCloseButton: false,
      arrowPosition: '50',
      backgroundClassName: 'transparent',
      tabClassName: 'bubble',
      arrowStyle: 0,
      closeSrc: '../i/close-cross.svg'
});
   var infoBubble3 = new InfoBubble({
      map: eventMap,
      content: contentString3,
      position: grayPlace,
      shadowStyle: 0,
      padding: 0,
      minWidth: 350,
      minHeight: 308,
      backgroundColor: '#fff',
      borderRadius: 30,
      arrowSize: 20,
      borderWidth: 0,
      borderColor: '#2c2c2c',
      disableAutoPan: true,
      hideCloseButton: false,
      arrowPosition: '50',
      backgroundClassName: 'transparent',
      tabClassName: 'bubble',
      arrowStyle: 0,
      closeSrc: '../i/close-cross.svg'
});
  // var marker = new google.maps.Marker({
  //   icon: {
  //       url: "../i/marker.svg",
  //       scaledSize: new google.maps.Size(28, 40), // scaled size
  //       origin: new google.maps.Point(0,0), // origin
  //       anchor: new google.maps.Point(17,53), // anchor
  //   },
  //   position: biolit,
  //   map: map,
  //   title: 'ООО Биолит'
  // });
  eventMarkerGreen.addListener('click', function() {
    setTimeout(function () {
        $(".js-info-bubble-close").click();
        infoBubble1.open(eventMap, eventMarkerGreen);
    }, 50);
  });
  eventMarkerYellow.addListener('click', function() {
    setTimeout(function () {
        $(".js-info-bubble-close").click();
        infoBubble2.open(eventMap, eventMarkerYellow);
    }, 50);
  });
  eventMarkerGray.addListener('click', function() {
     setTimeout(function () {
        $(".js-info-bubble-close").click();
        infoBubble3.open(eventMap, eventMarkerGray);
    }, 50);
  });

});