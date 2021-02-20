AOS.init();

function iniciaMapa() {
  var coordenadas = {
    lat: 21.152639,
    lng: -101.711598
  }

  var map = new google.maps.Map(document.getElementById('mapa'), {
    center: coordenadas,
    zoom: 15
  });
}