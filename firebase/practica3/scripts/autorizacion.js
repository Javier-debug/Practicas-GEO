auth.onAuthStateChanged(user => {
  if(user) {
    db.collection("platillos").onSnapshot(snapshot => {
      obtenerPlatillos(snapshot.docs);
    })
    configurarMenu(user);
  }
  else {
    obtenerPlatillos([]);
    configurarMenu();
  }
});

const formaingresar = document.getElementById("formaingresar");

formaingresar.addEventListener("submit", (e) => {
  e.preventDefault();

  let correo = formaingresar['correo'].value;
  let contrasenia = formaingresar['contraseña'].value;

  auth.signInWithEmailAndPassword(correo, contrasenia).then(credencial => {
    console.log(credencial)
    $("ingresarModal").modal("hide")
    formaingresar.reset();
    formaingresar.querySelector('.error').innerHTML = ''
  }).catch(error => {
    console.log(error);
    formaingresar.querySelector('.error').innerHTML = mensajeError(error.code)
  });
})

function mensajeError(codigo) {
  let mensaje = '';
  switch(codigo) {
    case 'auth/wrong-password': 
    mensaje = "Contraseña incorrecta"
    break;
    case 'auth/user-not-found': 
    mensaje = "Usuario no encontrado"
    break;
    case 'auth/weak-password': 
    mensaje = "Contraseña debil"
    break;
    default: 
    mensaje = "Occurio un error al ingresar con este usuario"
  }
  return mensaje;
}

const salir = document.getElementById("salir");

salir.addEventListener("click", (e) => {
  e.preventDefault();

  auth.signOut().then(() => {
    alert("El usuario a salido del sistema")
  })
})

const formaregistrar = document.getElementById("formaregistrar");

formaregistrar.addEventListener("submit", (e) => {
  e.preventDefault();

  const correo = formaregistrar['rcorreo'].value;
  const contrasenia = formaregistrar['rcontraseña'].value;
  console.log(formaregistrar['rnombre'].value)
  console.log(formaregistrar['rtelefono'].value)
  console.log(formaregistrar['rdireccion'].value)
  auth.createUserWithEmailAndPassword(correo, contrasenia).then(credencial => {
    return db.collection("usuarios").doc(credencial.user.uid).set({
      nombre: formaregistrar['rnombre'].value,
      telefono: formaregistrar['rtelefono'].value,
      direccion: formaregistrar['rdireccion'].value
    });
  }).then(() => {
    $('#registrarModal').modal("hide");
    formaregistrar.reset();
    formaregistrar.querySelector('.error').innerHTML = "";
  }).catch(err => {
    formaregistrar.querySelector('.error').innerHTML = mensajeError(err.code);
  });
})

entrarGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(result => {
    var token = result.credential.accessToken;

    console.log(token);

    var user = result .user;

    let html = `
    <p>Nombre: ${user.displayName}</p>
    <p>Correo: ${user.email}</p>
    <img src="${user.photoURL}">
    `;

    datosdelacuenta.innerHTML = html;

    $("#ingresarModal").modal("hide");
    formaingresar.reset();
    formaingresar.querySelector(".error").innerHTML = "";

  }).catch((error) => {
    console.log(error)
  })
}