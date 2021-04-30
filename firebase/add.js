formularioA.addEventListener("submit", (e) => {
  e.preventDefault();
  var register = new Register(null, formularioA.nombre.value, formularioA.codigo.value);
  register.post();
  formularioA.nombre.value = ""
  formularioA.codigo.value = ""
  $('#modalNuevo').modal('hide')
})