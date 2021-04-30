db.collection("productos").onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if (change.type == "added") {
      showRegisters(change.doc);
    }
    else if (change.type == "removed") {
      let valId = document.getElementById(change.doc.id);
      lista.removeChild(valId)
    }
  })
})