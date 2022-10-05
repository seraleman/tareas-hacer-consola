const inquirer = require('inquirer')
const colors = require('colors')

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

const inquirerMenu = async () => {
  console.clear()
  console.log(colors.green('====================='))
  console.log(colors.green('Seleccione una opción'))
  console.log(colors.green('====================='))

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

module.exports = {
  inquirerMenu,
  pausa,
}
