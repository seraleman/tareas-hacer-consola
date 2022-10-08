const colors = require('colors')
const Tareas = require('./models/tareas')
const { guardarDB, leerDB } = require('./helpers/guardarLeerArchivo')
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require('./helpers/inquirer')

const main = async () => {
  let opt = ''
  const tareas = new Tareas()

  const tareasDB = leerDB()
  if (tareasDB) {
    tareas.cargarTareasFromArr(tareasDB)
  }

  do {
    opt = await inquirerMenu()
    switch (opt) {
      case 1:
        const desc = await leerInput('Descripción: ')
        tareas.crearTarea(desc)
        break
      case 2:
        tareas.listadoCompleto()
        break
      case 3:
        tareas.listarPendientesCompletadas(true)
        break
      case 4:
        tareas.listarPendientesCompletadas(false)
        break
      case 5:
        const ids = await mostrarListadoChecklist(tareas.getListadoArr)
        tareas.toggleCompletadas(ids)
        break
      case 6:
        const id = await listadoTareasBorrar(tareas.getListadoArr)
        if (id !== '0') {
          const resp = await confirmar('¿Está seguro?')
          if (resp) {
            tareas.borrarTarea(id)
            console.log('Tarea borrada')
          }
        }
        break
    }

    guardarDB(tareas.getListadoArr)
    if (opt !== 7) await pausa()
  } while (opt !== 7)
}

main()
