formularioE.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = formularioE.id.value;
  let nombre = formularioE.nombre.value
  let codigo = formularioE.codigo.value;

  var register = new Register(id, nombre, codigo)
  register.put();

  var idregister = document.getElementById(id);
  console.log(id)
  idregister.querySelector(".nombre").value = nombre + " "
  idregister.querySelector(".codigo").value = codigo + " "

  formularioE.nombre.value = ""
  formularioE.codigo.value = ""
  $('#modalEditar').modal('hide')
})