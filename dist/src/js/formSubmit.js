// src/js/formSubmit.js
import { revisarForm } from './formValidation.js';
import { mostrarPantalla } from './navigation.js';
import { enviarEmailConFotos } from './emailService.js'

export function initFormSubmit() {
    const form = document.getElementById('multiStepForm');
    const pantalla_carga = document.getElementById('pantalla-carga')
    const pantalla_confirm = document.getElementById('pantalla-confirm')

    if (!form) return;

    form.addEventListener('submit',async (e) => {
        e.preventDefault();
        
        const pantallas = document.querySelectorAll('.pantalla');
        let pantallaError = null;
        //    Empezamos asumiendo que todo es válido.
        let formCompletoEsValido = true; 
        const puertas = document.querySelectorAll('.puerta');
        const garajes = document.querySelectorAll('.garaje');
        const ventanas = document.querySelectorAll('.ventana');

        if (puertas.length === 0 && garajes.length === 0 && ventanas.length === 0) {
                Swal.fire({
                title: '¡Espera!',
                text: 'Debes añadir al menos una puerta, garaje o ventana antes de enviar.',
                icon: 'info', // o 'error', 'warning', 'info'
                confirmButtonColor: '#E60012', // Rojo AquaBlock
                confirmButtonText: 'Botón Aceptar'
                });
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
                Swal.fire({
                icon: 'warning',
                title: '¡Faltan datos!',
                text: 'Por favor, rellena los campos obligatorios.',
                confirmButtonColor: '#E60012', // Rojo AquaBlock
                confirmButtonText: 'Entendido'
                });
            mostrarPantalla(pantallas, pantallaError);

             return; // Cortamos el flujo
        }

        // 6. ¡Éxito! (Solo se llega aquí si NADA falló)
        // console.log("¡Formulario válido! Listo para enviar.");
        //     pantalla_carga.classList.remove('hidden')
        //     pantalla_carga.classList.add('flex')
        // // ... aquí llamaríamos a Email.js ...
        // enviarEmailConFotos();
        try {
            // 1. MOSTRAMOS la pantalla de carga
            pantalla_carga.classList.remove('hidden');
            pantalla_carga.classList.add('flex');

            // 2. HACEMOS el trabajo pesado y ESPERAMOS
            console.log("¡Formulario válido! Llamando a enviarEmailConFotos...");
            await enviarEmailConFotos(); // <-- ¡Tu 'await' está aquí!
            
            // 3. ¡ÉXITO! Si llegamos aquí, todo salió bien.
            //    Mostramos la pantalla de confirmación.
            mostrarPantalla(pantallas, pantalla_confirm);

        } catch (error) {
            // 4. ¡PLAN B! Si 'enviarEmailConFotos' falló.
            //    (Tu 'enviarEmailConFotos' ya muestra sus propios 'alert'
            //    así que solo lo registramos en consola).
            console.error("Error capturado en formSubmit:", error);
        
        } finally {
            // 5. ¡LIMPIEZA! Esto se ejecuta SIEMPRE.
            //    Nos aseguramos de que la pantalla de carga desaparezca.
            pantalla_carga.classList.add('hidden');
            pantalla_carga.classList.remove('flex');
        }
    });
}