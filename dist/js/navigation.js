// src/js/navigation.js

// 1. Importamos la función que necesitamos del otro archivo

import { revisarForm } from './formValidation.js';

// 1. Importamos la función que necesitamos del otro archivo
const pantallas = document.querySelectorAll('.pantalla');

const links = document.querySelectorAll('a[href^="#pantalla"]');

export function mostrarPantalla(window,destiny) {

  window.forEach(pant=>{
      pant.classList.remove('flex')
    pant.classList.add('hidden')
  })

  destiny.classList.add('flex')
  destiny.classList.remove('hidden')
}

// 3. Creamos una función "inicializadora" y la exportamos
export function initNavigation() {
    links.forEach((enlaces) => {
        enlaces.addEventListener('click', (e) => {
            e.preventDefault();
            document.activeElement.blur();

            let destino = document.querySelector(enlaces.getAttribute('href'));
            let is_form = enlaces.id.startsWith('form');
            let pantalla_actual = enlaces.closest('.pantalla');
            
            if (is_form) {
                // 'true' es el valor inicial de 'valido'
                const esValido = revisarForm(pantalla_actual, true); 
                if (!esValido) { return }
            }
        
            mostrarPantalla(pantallas, destino);
        });
    });
}