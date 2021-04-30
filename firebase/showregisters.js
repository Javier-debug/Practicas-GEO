function showRegisters(doc) {
  var register = new Register(doc.id,doc.data().nombre, doc.data().codigo)

  let li = document.createElement("li")
  li.setAttribute("id", register.id)
  li.style.background = "blue"
  li.style.padding= "10px"
  li.style.borderRadius = "25px"
  li.style.margin = "10px"
  li.style.boxShadow = "inset 0 -3em 3em rgba(0,0,0,0.1), 0 0  0 2px rgb(255,255,255), 0.3em 0.3em 1em rgba(0,0,0,0.3)"

  let nombre = document.createElement("input")
  nombre.type = "text"
  nombre.value = register.nombre
  nombre.className = "nombre form-control"

  let codigo = document.createElement("input")
  codigo.type = "text"
  codigo.value = register.codigo
  codigo.className = "codigo form-control"

  let btnBorrar = document.createElement("button");
  btnBorrar.className = "btn btn-danger m-3"
  btnBorrar.textContent = "borrar"

  let btnEditar = document.createElement("button");
  btnEditar.className = "btn btn-warning m-3"
  btnEditar.textContent = "Editar"
  btnEditar.setAttribute("data-toggle", "modal")
  btnEditar.setAttribute("data-target", "#modalEditar")

  li.appendChild(btnBorrar)
  li.appendChild(btnEditar)
  li.appendChild(nombre);
  li.appendChild(codigo);

  lista.appendChild(li)

  btnBorrar.addEventListener("click", (e) => {
    let id = e.target.parentElement.getAttribute("id");
    register.delete(id)
  })

  btnEditar.addEventListener("click", (e) => {
    register.edit()
  })
}