// src/js/main.js

// 1. Importa las funciones "init" de los otros módulos
import { initNavigation } from './navigation.js';
import { initDynamicForms } from './dynamicForm.js';
// import { initFormSubmit } from './formSubmit.js'; 
// 2. Ejecuta las funciones cuando el documento esté listo
// (Es una buena práctica esperar a que todo el HTML esté cargado)
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initDynamicForms();
    // initFormSubmit();
});







// const btn_crear = document.getElementById('nueva_puerta');
// const container_puertas = document.getElementById('puertas_container');
// let contador = 0;

// Delegación para borrar puertas
// container_puertas.addEventListener('click', (e) => {
//   if (e.target.classList.contains('fa-x')) {
//     e.target.closest('.puerta').remove();
//     // actualizarNumeros()
//   }
// });

// Crear nueva puerta
// btn_crear.addEventListener('click', () => {
//   btn_crear.remove()
//   crearPuertas(container_puertas);
//   container_puertas.append(btn_crear)

// });
// function actualizarNumeros() {
//   const puertas = document.querySelectorAll('#puertas_container .bg-red-700')
//   puertas.forEach((num, i) => {
//     num.textContent = i + 1
//     num.nextElementSibling.textContent = `Puerta ${i + 1}`
//   })
// }

// function crearPuertas(contenedor) {
//   contador++;

//   contenedor.insertAdjacentHTML("beforeend", `
//     <div class="puerta flex flex-col justify-evenly gap-4 mt-4 p-4 rounded-lg w-full h-auto bg-gray-50 shadow-md">
//       <div class="flex gap-4 items-center justify-between">
//         <div class="flex gap-4 items-center">
//           <div class="bg-red-700 text-white px-2.5 py-1 rounded-lg shadow-md">${contador}</div>
//           <h3>Puerta ${contador}</h3>
//         </div>
//         <i class="fa-solid fa-x text-gray-400 cursor-pointer"></i>
//       </div> bla bla blaa

// }
