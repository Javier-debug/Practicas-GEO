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

const listaPlatillos = document.getElementById("listaPlatillos");

const obtenerPlatillos = (data) => {
  if(data.length) {
    let html = "";
    data.forEach(doc => {
      const platillo = doc.data()
      const columna = `
      <div class="col-12 col-md-4">
        <img src="${platillo.imagen}" alt="${platillo.nombre}">
        <p>${platillo.nombre}</p>
        <p class="text-danger">$ ${platillo.precio}</p>
        <a href="https://paypal.me/grupohernandezalba/${platillo.precio}" target="_blank">
          <button class="btn btn-primary">Pagar Ahora</button>
        </a>
      </div>
      `;
      html += columna;
    })
    listaPlatillos.innerHTML = html;
  }
  else {
    listaPlatillos.innerHTML = "<p class='text-center'>Ingrese sus claves para ver los platillos disponibles</p>"
  }
}