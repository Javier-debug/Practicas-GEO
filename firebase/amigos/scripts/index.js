const listaloggedout = document.querySelectorAll(".logged-out")
const listaloggedin = document.querySelectorAll(".logged-in")
const datosdelacuenta = document.querySelector(".datosdelacuenta");

const configurarMenu = (user) => {
  if(user) {
    
    db.collection("usuarios").doc(user.uid).get().then(doc => {
      console.log(user.uid)
      const html = `
      <p>Nombre: ${doc.data().nombre}</p>
      <p>Correo: ${user.email}</p>
      <p>Telefono: ${doc.data().telefono}</p>
      <p>Direccion: ${doc.data().direccion}</p>
      <p>Coordenadas: ${doc.data().coordenadas.latitude}, ${doc.data().coordenadas.longitude}</p>
      `;

      datosdelacuenta.innerHTML = html;
    })
    listaloggedin.forEach(item => item.style.display = "block")
    listaloggedout.forEach(item => item.style.display = "none")
  }
  else {
    listaloggedin.forEach(item => item.style.display = "none")
    listaloggedout.forEach(item => item.style.display = "block")
  }
}


const obtenerAmigos = (data) => {
  const mapa = document.getElementById("map");

      var propiedades = {
        center: {
          lat: 21.14785,
          lng: -101.70345
        },
        zoom: 15
      }

      map = new google.maps.Map(mapa,propiedades);
      
      data.forEach(user => {
        var informacion = new google.maps.InfoWindow;

        var pos = {
          lat: user.data().coordenadas.latitude,
          lng: user.data().coordenadas.longitude
        }

        informacion.setPosition(pos);
        informacion.setContent(user.data().nombre);
        informacion.open(map);
        map.setCenter(pos);
      })
}