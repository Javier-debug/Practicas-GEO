var mapa = document.getElementById('map');
var route = document.getElementById('route');
var street_number = document.getElementById('street_number');
var locality = document.getElementById('locality');
var administrative_area_level_1 = document.getElementById('administrative_area_level_1');
var postal_code = document.getElementById('postal_code');
var country = document.getElementById('country');
var autocompletado = document.getElementById('autocomplete');
var autocomplete, placeSearch;

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

var coordenadas = {  lat: 21.152639, lng:  -101.711598 };
var propiedades = {
  center: coordenadas,
  zoom: 12
};

function initAutocomplete(){
  map = new google.maps.Map(mapa,propiedades);
  autocomplete = new google.maps.places.Autocomplete(autocompletado, {types: ['geocode']});
  autocomplete.setFields(['address_component','geometry']);
  autocomplete.addListener('place_changed', obtieneDatos);

}

function obtieneDatos() {
  var place = autocomplete.getPlace();
  console.log(place);
  var marker = new google.maps.Marker({
    position: place.geometry.location,
    map: map
  });
  map.panTo(place.geometry.location);
  map.setZoom(18);
  map.setCenter(place.geometry.location);
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    console.log(addressType);
    if (componentForm[addressType]) {
      var val = place.address_components[i]['long_name'];
      document.getElementById(addressType).value = val;
    }
  }
}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({center: geolocation, radius: position.coords.accuracy});
      autocomplete.setBounds(circle.getBounds());
    });
  }
}