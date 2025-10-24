const pantallas = document.querySelectorAll('.pantalla');

const links = document.querySelectorAll('a[href^="#pantalla"]');

links.forEach((enlaces)=>{
  enlaces.addEventListener('click',(e)=>{
  //  evita recargar pagina
    e.preventDefault()
    // da error por focus asi xd lo quito 
    document.activeElement.blur();


    let destino = document.querySelector(enlaces.getAttribute('href'))
    let hr = enlaces.getAttribute('href')
    let valid = true

    // pantallas.forEach(pant=>{
    //    pant.classList.remove('flex')
    //   pant.classList.add('hidden')
    // })

    // destino.classList.add('flex')
    // destino.classList.remove('hidden')

   
    

    if (hr==='#pantalla-election-typeform') {
      const inpunt_requireds = document.querySelectorAll('#pantalla-form input[required]')

      inpunt_requireds.forEach(inputs_r=>{
      if (!inputs_r.checkValidity()) {
          inputs_r.reportValidity();
          valid=false }

      })
      if (!valid) {
        return
      }
    
      
    }
 
    mostrarPantalla(pantallas,destino)
    

    })

})

function mostrarPantalla(window,destiny) {

   window.forEach(pant=>{
       pant.classList.remove('flex')
      pant.classList.add('hidden')
    })

    destiny.classList.add('flex')
    destiny.classList.remove('hidden')
}




// const steps = document.querySelectorAll(".step");
// let currentStep = 0;

// document.getElementById("next1").addEventListener("click", () => {
//   const current = steps[currentStep];
//   const inputs = current.querySelectorAll("input[required]");

//   // Usa la validación nativa del navegador
//   let valid = true;
//   inputs.forEach(input => {
//     if (!input.checkValidity()) {
//       input.reportValidity(); // muestra el mensaje nativo del navegador
//       valid = false;
//     }
//   });

//   if (valid) {
//     // Ocultar paso actual
//     current.classList.add("hidden");
//     currentStep++;
//     // Mostrar siguiente
//     steps[currentStep].classList.remove("hidden");
//   }
// });




// function mostrarPantalla(id) {
//   pantallas.forEach(p => p.classList.remove('activa'));
//   document.getElementById(id).classList.add('activa');
// }

// document.getElementById('btn-empezar').addEventListener('click', () => {
//   mostrarPantalla('pantalla-form');
// });

// document.getElementById('btn-enviar').addEventListener('click', () => {
//   mostrarPantalla('pantalla-confirm');
// });

// document.getElementById('btn-volver').addEventListener('click', () => {
//   mostrarPantalla('pantalla-inicio');
// });


