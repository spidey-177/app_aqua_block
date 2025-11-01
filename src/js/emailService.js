// src/js/emailService.js

//
// ESTA FUNCIÓN FORMATEA EL HTML PARA EL PDF
//
function prepararDatosParaEmail() {
    let cuerpoEmail = ""; 

    // --- 1. Datos Generales del Usuario ---
    // (Asegúrate de que los IDs como 'nombre', 'correo' coincidan con tu HTML)
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const poblacion = document.getElementById('poblacion').value;
    const cp = document.getElementById('codigo_postal').value;

    cuerpoEmail += `
        <h2>Nuevo Informe de Medición</h2>
        <p><strong>Cliente:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Dirección:</strong> ${direccion}, ${cp}, ${poblacion}</p>
        <hr>
    `;

    // --- 2. Datos de Puertas ---
    const puertas = document.querySelectorAll('.puerta');
    if (puertas.length > 0) {
        cuerpoEmail += `<h3>Puertas (${puertas.length})</h3>`;
        puertas.forEach((puerta, index) => {
            // 'page-break-inside: avoid;' intenta evitar que un solo elemento se corte entre dos páginas
            cuerpoEmail += `
                <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; page-break-inside: avoid;">
                    <strong>Puerta ${index + 1}</strong>
                    <ul>
                        <li>Ancho: ${puerta.querySelector('input[name="puertas-ancho[]"]').value} cm</li>
                        <li>Fondo: ${puerta.querySelector('input[name="puertas-fondo[]"]').value} cm</li>
                        <li>Alto: ${puerta.querySelector('input[name="puertas-alto[]"]').value} cm</li>
                        <li>Tipo: ${puerta.querySelector('select[name="puertas-material[]"]').value}</li>
                        <li>Obs: ${puerta.querySelector('textarea[name="puertas-observaciones[]"]').value || 'Ninguna'}</li>
                    </ul>
                </div>
            `;
        });
    }

    // --- 3. Datos de Garajes ---
    const garajes = document.querySelectorAll('.garaje');
    if (garajes.length > 0) {
        cuerpoEmail += `<h3>Garajes (${garajes.length})</h3>`;
        garajes.forEach((garaje, index) => {
            cuerpoEmail += `
                <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; page-break-inside: avoid;">
                    <strong>Garaje ${index + 1}</strong>
                    <ul>
                        <li>Ancho: ${garaje.querySelector('input[name="garajes_ancho[]"]').value} cm</li>
                        <li>Alto: ${garaje.querySelector('input[name="garajes_alto[]"]').value} cm</li>
                        <li>Automática: ${garaje.querySelector('select[name="garajes_automatica[]"]').value}</li>
                        <li>Material: ${garaje.querySelector('select[name="garajes_material[]"]').value}</li>
                        <li>Obs: ${garaje.querySelector('textarea[name="garajes_observaciones[]"]').value || 'Ninguna'}</li>
                    </ul>
                </div>
            `;
        });
    }

    // --- 4. Datos de Ventanas ---
    const ventanas = document.querySelectorAll('.ventana');
    if (ventanas.length > 0) {
        cuerpoEmail += `<h3>Ventanas (${ventanas.length})</h3>`;
        ventanas.forEach((ventana, index) => {
            cuerpoEmail += `
                <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; page-break-inside: avoid;">
                    <strong>Ventana ${index + 1}</strong>
                    <ul>
                        <li>Ancho: ${ventana.querySelector('input[name="ventanas_ancho[]"]').value} cm</li>
                        <li>Alto: ${ventana.querySelector('input[name="ventanas_alto[]"]').value} cm</li>
                        <li>Dist. Suelo: ${ventana.querySelector('input[name="ventanas_distancia_umbral[]"]').value} cm</li>
                        <li>Apertura: ${ventana.querySelector('select[name="ventanas_apertura[]"]').value}</li>
                        <li>Material: ${ventana.querySelector('select[name="ventanas_material[]"]').value}</li>
                        <li>Obs: ${ventana.querySelector('textarea[name="ventanas_observaciones[]"]').value || 'Ninguna'}</li>
                    </ul>
                </div>
            `;
        });
    }

    return cuerpoEmail;
}