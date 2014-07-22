    //<![CDATA[

    var customIcons = {
      Restaurant: {
        icon: 'icons/restauranthotel/restaurant.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
      School: {
        icon: 'icons/healtheducation/school.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
	  Embassy: {
        icon: 'icons/offices/embassy.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
	  Library: {
        icon: 'icons/offices/library.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
	  ATM: {
        icon: 'icons/offices/atm-2.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
	  Terminal: {
        icon: 'icons/transportation/bus.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
	  Church: {
        icon: 'icons/tourism/church-2.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
	  Bridge: {
        icon: 'icons/tourism/bridge_modern.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
	  Airport: {
        icon: 'icons/transportation/airport.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
	  Residential: {
        icon: 'icons/people/home-2.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
	  FillingStation: {
        icon: 'icons/transportation/fillingstation.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
	  Farm: {
        icon: 'icons/nature/field.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
	  River: {
        icon: 'icons/nature/river-2.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
	  Bakery: {
        icon: 'icons/stores/bread.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      }
    };
	


    function load() {
      var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(11.974844752931832,123.5181887447834),
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      });
	  
	  //get latlng thru mousemove
	google.maps.event.addListener(map,'mousemove',function(event) {
		document.getElementById('lat').value =event.latLng.lat()
		document.getElementById('lng').value =event.latLng.lng()
		});
	  
	  //get latlng thru click
		google.maps.event.addListener(map,'click',function(event) {
		document.getElementById('latclicked').value = event.latLng.lat()
		document.getElementById('longclicked').value = event.latLng.lng()  
		});
	  
	  
      var infoWindow = new google.maps.InfoWindow;

      // setting up the marker and infowindow
	  //getting the xml data from the phpxml_gen file
		downloadUrl("phpxml_gen.php", function(data) {
		var xml = data.responseXML;
		var markers = xml.documentElement.getElementsByTagName("marker");
		for (var i = 0; i < markers.length; i++) {
        var locname = markers[i].getAttribute("locname");
        var address = markers[i].getAttribute("address");
        var type = markers[i].getAttribute("type");
		var web = markers[i].getAttribute("web");
		var lat = markers[i].getAttribute("lat");
        var lng = markers[i].getAttribute("lng");
        var point = new google.maps.LatLng(
		parseFloat(markers[i].getAttribute("lat")),
        parseFloat(markers[i].getAttribute("lng")));
        var html = "Name of Place:<b> " + locname + "</b> <br/>Address: <b>" + address + "</b><br/>Type: <b>"+ type + "</b>" + "<br/>Website: <a target='_blank' href='"+ web + "'><b>" + web + "</a></b>"+" <br/>Lat.: <b>" + lat + "</b><br> Lng.:<b>" + lng + "</b>";
        var icon = customIcons[type] || {};
        var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: icon.icon,
            shadow: icon.shadow
          });
          bindInfoWindow(marker, map, infoWindow, html);
        }
      });
    }

    function bindInfoWindow(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
    }

    function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request, request.status);
        }
      };
	  
		

      request.open('GET', url, true);
      request.send(null);
    }

    function doNothing() {}

    //]]>

