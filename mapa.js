AOS.init();

function iniciaMapa() {
  var coordenadas = {
    lat: 21.14785,
    lng: -101.70345
  }

  var map = new google.maps.Map(document.getElementById('mapa'), {
    center: coordenadas,
    zoom: 15
  });
}