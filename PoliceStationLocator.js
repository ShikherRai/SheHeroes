let map;
let service;
let infowindow;

function initMap() {
    // Create a map centered in a default location
    const initialLocation = { lat: 40.7128, lng: -74.0060 }; // Default to New York City
    map = new google.maps.Map(document.getElementById("map"), {
        center: initialLocation,
        zoom: 12,
    });

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    // Search for police stations when the button is clicked
    document.getElementById("locate-button").addEventListener("click", function() {
        searchPoliceStations(initialLocation);
    });

    // Add search box functionality
    const input = document.getElementById("search-box");
    const searchBox = new google.maps.places.SearchBox(input);

    map.addListener("bounds_changed", function() {
        searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener("places_changed", function() {
        const places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }

        // Set the map's center to the new place
        const place = places[0];
        map.setCenter(place.geometry.location);
        searchPoliceStations(place.geometry.location);
    });
}

// Function to search for police stations near a given location
function searchPoliceStations(location) {
    const request = {
        location: location,
        radius: 5000, // 5 km radius
        type: ["police"], // Looking for police stations
    };

    service.nearbySearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(function(place) {
                const marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                });

                google.maps.event.addListener(marker, "click", function() {
                    infowindow.setContent("<strong>" + place.name + "</strong><br>" + place.vicinity);
                    infowindow.open(map, this);
                });
            });
        } else {
            alert("No police stations found.");
        }
    });
}