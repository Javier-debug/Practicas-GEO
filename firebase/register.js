class Register {
  constructor(id, nombre, codigo) {
    this.id = id;
    this.nombre = nombre;
    this.codigo = codigo;
  }

  delete(id) {
    db.collection("productos").doc(id).delete();
  }

  post() {
    db.collection("productos").add({
      nombre: this.nombre,
      codigo: this.codigo,
    });
  }

  edit() {
    formularioE.nombre.value = this.nombre
    formularioE.codigo.value = this.codigo
    formularioE.id.value = this.id
  }

  put() {
    db.collection("productos").doc(this.id).update({
      nombre: this.nombre,
      codigo: this.codigo,
    });
  }
}