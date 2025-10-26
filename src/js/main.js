const pantallas = document.querySelectorAll('.pantalla');

const links = document.querySelectorAll('a[href^="#pantalla"]');

links.forEach((enlaces)=>{
  enlaces.addEventListener('click',(e)=>{
  //  evita recargar pagina
    e.preventDefault()
    // da error por focus asi xd lo quito 
    document.activeElement.blur();

    let destino = document.querySelector(enlaces.getAttribute('href'))
    let is_form = enlaces.id.startsWith('form')
    let valido = true
    let pantalla_actual = enlaces.closest('.pantalla') //scala hasta el padre
   
    
    // pantallas.forEach(pant=>{
    //    pant.classList.remove('flex')
    //   pant.classList.add('hidden')
    // })
    // destino.classList.add('flex')
    // destino.classList.remove('hidden')
   
    if (is_form) {
      const esValido= revisarForm(pantalla_actual,valido)
      // el return de por si se sale de la funcion mas cercana
      //da impresion de bucle pero no simplemente se sale y sigue
      // si en caso esto no se cumple
      if (!esValido) {return}
      
    }
 
    mostrarPantalla(pantallas,destino)
    

    })

})


function revisarForm(pantalla,valid) {

  const inpunt_requireds = pantalla.querySelectorAll('input[required]')

  inpunt_requireds.forEach(inputs_r=>{
  if (!inputs_r.checkValidity()) {
      inputs_r.reportValidity();
      valid=false }

  })
  return valid
  
}


function mostrarPantalla(window,destiny) {

  window.forEach(pant=>{
      pant.classList.remove('flex')
    pant.classList.add('hidden')
  })

  destiny.classList.add('flex')
  destiny.classList.remove('hidden')
}

// fase uno de la validacion form! 
// const inpunt_requireds = pantalla_actual.querySelectorAll('input[required]')
// inpunt_requireds.forEach(inputs_r=>{
// if (!inputs_r.checkValidity()) {
//     inputs_r.reportValidity();
//     valid=false }

// })
// if (!valid) {
//   return
// }

// -------------forms dinamicos---------

