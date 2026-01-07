// src/js/formValidation.js
import { stagedFiles } from "./dynamicForm.js";
// Usamos 'export' para que otros archivos puedan importarla
export function revisarForm(pantalla,valid,showError=true) {
  let esValido = valid

  const inpunt_requireds = pantalla.querySelectorAll('input[required], select[required], textarea[required]')

  inpunt_requireds.forEach(inputs_r=>{
    if (inputs_r.type === 'file' && inputs_r.hidden) {
        return; // 'return' en un forEach es como 'continue' en un 'for'
    }
    if (!inputs_r.checkValidity()) {
          if (showError) {
              inputs_r.reportValidity();
          } 
          esValido = false
      }

  })
  // Si la validación básica ya falló, no sigas
    if (!esValido) return false;
const inputs_fotos = pantalla.querySelectorAll('input[type="file"]');

  // --- ¡LÓGICA MODIFICADA AQUÍ! ---
  inputs_fotos.forEach((input_foto) => {
    const inputId = input_foto.id;

    // Comprueba el 'stagedFiles' en lugar de 'input_foto.files'
    // Si el 'cajón' no existe O si tiene menos de 2 archivos
    if (!stagedFiles[inputId] || stagedFiles[inputId].length < 2) {
      if (showError) {
             // Muestra el conteo correcto desde el 'almacén'
        const fileCount = stagedFiles[inputId] ? stagedFiles[inputId].length : 0;
        Swal.fire({
          title: 'Faltan fotos',
          text: 'Debes subir al menos 2 fotos...',
          icon: 'info', // o 'error', 'warning', 'info'
          confirmButtonText: 'Botón Aceptar'
        });

        input_foto.previousElementSibling.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        
      }
      esValido = false;
    }
  });
  return esValido
  
}