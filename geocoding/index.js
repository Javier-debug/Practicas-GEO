var mapa = document.getElementById('map');
var btnBuscar = document.getElementById("btnBuscar")
var txtDomicilio = document.getElementById("domicilio")
var resultados = document.getElementById("resultados")
var mapa2 = document.getElementById('map2');
var btnBuscar2 = document.getElementById("btnBuscar2")
var resultados2 = document.getElementById("resultados2")
var resultados2 = document.getElementById("resultados2")
var txtlatitudlongitud = document.getElementById("txtlatitudlongitud")
var map;
var valor;

function iniciaMapa(){
  var coordenadas = {  lat: 21.152639, lng:  -101.711598 };
  var propiedades = {
    center: coordenadas,
    zoom: 12
  };
  map = new google.maps.Map(mapa,propiedades);

  btnBuscar.addEventListener("click", () => {
    var domicilio = txtDomicilio.nodeValue;
    console.log(domicilio)

    var geocoder = new google.maps.Geocoder();
    geocoder.geocoder({'address': domicilio, region: "Guanajuato"}, (results, status) => {
      if(status == 'OK') {
        console.log(results);
        resultados.innerHTML = `
        <p>Coordenadas: ${ results[0].geometry.location} </p>
        <p>Detalles: ${ results[0].formatted_address } </p>
        `;

        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        })
      }
      else {
        alert("Geocode no se ejecuto con exito")
      }
    })
  })

  var map2 = new google.maps.Map(mapa2, propiedades)
  btnBuscar2.addEventListener("click", () => {
    var latLngStr = txtlatitudlongitud.value.split(",", 2);
    var LatLng = {
      lat: parseFloat(latLngStr[0]),
      lng: parseFloat(latLngStr[1])
    }
    var geocoder = geocoder.geocoder({'location': LatLng}, (results, status) => {
      if(status == 'OK') {
        console.log(results);
        resultados2.innerHTML = `
        <p>Detalles: ${ results[0].formatted_address } </p>
        `;

        map2.setCenter(LatLng);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        })
      }
      else {
        alert("Geocode no se ejecuto con exito")
      }
    })
  })
}
