AOS.init();

function iniciaMapa() {
  var coordenadas = {
    lat: 21.14785,
    lng: -101.70345
  }

  var map = new google.maps.Map(document.getElementById('map'), {
    center: coordenadas,
    zoom: 15
  });
}