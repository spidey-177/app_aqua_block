// src/js/formSubmit.js
import { revisarForm } from './formValidation.js';
import { mostrarPantalla } from './navigation.js';
import { enviarEmailDeDatos } from './emailService.js';

export function initFormSubmit() {
    const form = document.getElementById('multiStepForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const pantallas = document.querySelectorAll('.pantalla');
        let pantallaError = null;
        //    Empezamos asumiendo que todo es válido.
        let formCompletoEsValido = true; 
        const puertas = document.querySelectorAll('.puerta');
        const garajes = document.querySelectorAll('.garaje');
        const ventanas = document.querySelectorAll('.ventana');

        if (puertas.length === 0 && garajes.length === 0 && ventanas.length === 0) {
            alert('¡Espera! Debes añadir al menos una puerta, garaje o ventana antes de enviar.');
            // Llevamos al usuario a la pantalla de selección para que añada algo
            mostrarPantalla(pantallas, document.getElementById('pantalla-selection-typeform'));
            return; // Frena el envío
        }

        // 2. Revisamos cada pantalla
        pantallas.forEach(pantalla => {
            if (pantalla.querySelector('input, select')) {
                
                // 3. ¡AQUÍ ESTÁ EL CAMBIO!
                //    Ya no declaramos 'esValido' aquí.
                //    Simplemente llamamos a 'revisarForm'.
                if (!revisarForm(pantalla, true, false)) { // Pasamos 'false' para validar "en silencio"
                    
                    // 4. Si UNA falla, bajamos la bandera y la dejamos abajo.
                    formCompletoEsValido = false; 
                    
                    if (!pantallaError) {
                        pantallaError = pantalla;
                    }
                }
            }
        }); // <-- AQUÍ TERMINA EL BUCLE

        // 5. La comprobación final se hace AFUERA,
        //    usando nuestra variable "memoria".
        if (!formCompletoEsValido) {
             alert('Revisa el formulario, faltan datos obligatorios.');
            mostrarPantalla(pantallas, pantallaError);
            
            // --- ¡AÑADE ESTA LÍNEA! ---
            revisarForm(pantallaError, true, true);
            // ------------------------------------

             return; // Cortamos el flujo
        }

        // 6. ¡Éxito! (Solo se llega aquí si NADA falló)
        console.log("¡Formulario válido! Listo para enviar.");
        // ... aquí llamaríamos a Email.js ...
        enviarEmailDeDatos();
    });
}