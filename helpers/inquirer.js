const inquirer = require('inquirer')
const colors = require('colors')

const inquirerMenu = async () => {
  console.clear()
  console.log(colors.green('====================='))
  console.log(colors.green('Seleccione una opción'))
  console.log(colors.green('====================='))

  const preguntas = [
    {
      type: 'list',
      name: 'opcion',
      message: '¿Qué desea hacer?',
      choices: [
        {
          value: 1,
          name: `${'1.'.green} Crear tarea`,
        },
        {
          value: 2,
          name: `${'2.'.green} Listar tareas`,
        },
        {
          value: 3,
          name: `${'3.'.green} Listar tarea completadas`,
        },
        {
          value: 4,
          name: `${'4.'.green} Listar tarea pendientes`,
        },
        {
          value: 5,
          name: `${'5.'.green} Completar tarea(s)`,
        },
        {
          value: 6,
          name: `${'6.'.green} Borrar tarea`,
        },
        {
          value: 7,
          name: `${'7.'.green} Salir`,
        },
      ],
    },
  ]

  const { opcion } = await inquirer.prompt(preguntas)
  return opcion
}

const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presion ${'enter'.green} para continuar`,
    },
  ]
  console.log('\n')
  await inquirer.prompt(question)
}

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true
      },
    },
  ]
  const { desc } = await inquirer.prompt(question)
  return desc
}

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar',
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    },
  ]

  const { id } = await inquirer.prompt(preguntas)
  return id
}

const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ]

  const { ok } = await inquirer.prompt(question)
  return ok
}

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    }
  })

  const preguntas = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices,
    },
  ]

  const { ids } = await inquirer.prompt(preguntas)
  return ids
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
}
