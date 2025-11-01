/* global emailjs */ 
import { stagedFiles } from './dynamicForm.js';

// 📦 CLOUDINARY CONFIG
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtcdsf00t/upload';
const CLOUDINARY_UPLOAD_PRESET = 'forms_aq';

//
// === FUNCIÓN PRINCIPAL PARA ENVIAR EL EMAIL CON FOTOS ===
//
export async function enviarEmailConFotos() {
    // 1. IDs de Email.js
    const serviceID = 'service_nvz8rop';
    const templateID = 'template_s9wawjq';
    // La Public Key ya está en tu index.html con emailjs.init()

    alert('📤 Enviando formulario... Este proceso puede tardar.\nPor favor, espera la confirmación.');

    try {
        // --- PASO A: SUBIR LAS FOTOS ---
        console.log('Iniciando subida de fotos a Cloudinary...');
        alert('⏳ Subiendo fotos, por favor espera...');
        const urlsFotos = await subirTodasLasFotos();
        console.log('Fotos subidas con éxito:', urlsFotos);
        alert('✅ Fotos subidas correctamente. Preparando el correo...');

        // --- PASO B: PREPARAR EL EMAIL CON LOS ENLACES ---
        console.log('Preparando HTML del email...');
        const htmlParaEmail = prepararDatosParaEmail(urlsFotos);

        // --- PASO C: ENVIAR EL EMAIL ---
        const templateParams = {
            from_name: document.getElementById('nombre').value,
            reply_to: document.getElementById('correo').value,
            cuerpo_del_mensaje: htmlParaEmail // Tu plantilla debe tener {{{cuerpo_del_mensaje}}}
        };

        console.log('Enviando email final...');
        await emailjs.send(serviceID, templateID, templateParams);
        
        console.log('¡ÉXITO!');
        alert('🎉 ¡Formulario y fotos enviados con éxito!');
        window.location.reload();

    } catch (error) {
        console.error('❌ ERROR FATAL:', error);
        alert('Hubo un error en el proceso. Por favor, revisa la consola e inténtalo de nuevo.');
    }
}

//
// === FUNCIÓN: SUBE TODAS LAS FOTOS DE "stagedFiles" A CLOUDINARY ===
//
async function subirTodasLasFotos() {
    const urlsPorInput = {}; 
    const todasLasPromesas = []; 

    for (const inputId in stagedFiles) {
        const archivos = stagedFiles[inputId];
        urlsPorInput[inputId] = [];

        for (const archivo of archivos) {
            const formData = new FormData();
            formData.append('file', archivo);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            const promesaDeSubida = fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.secure_url) {
                    console.log(`Foto subida: ${data.secure_url}`);
                    urlsPorInput[inputId].push(data.secure_url);
                } else {
                    console.error('Error en la subida de una foto:', data);
                }
            })
            .catch(err => console.error('Error de red al subir foto:', err));

            todasLasPromesas.push(promesaDeSubida);
        }
    }

    await Promise.all(todasLasPromesas);
    return urlsPorInput;
}

//
// === FUNCIÓN: PREPARA EL HTML DEL EMAIL (CON FOTOS INCLUIDAS) ===
//
function prepararDatosParaEmail(urlsFotos) {
    let cuerpoEmail = ""; 

    // --- 1. Datos Generales ---
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

    // --- 2. Puertas ---
    const puertas = document.querySelectorAll('.puerta');
    if (puertas.length > 0) {
        cuerpoEmail += `<h3>Puertas (${puertas.length})</h3>`;
        puertas.forEach((puerta, index) => {
            const inputId = puerta.querySelector('input[type="file"]').id;
            const urlsDeEstaPuerta = urlsFotos[inputId] || [];
            
            cuerpoEmail += `
                <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                    <strong>Puerta ${index + 1}</strong>
                    <ul>
                        <li>Ancho: ${puerta.querySelector('input[name="puertas-ancho[]"]').value} cm</li>
                        <li>Fondo: ${puerta.querySelector('input[name="puertas-fondo[]"]').value} cm</li>
                        <li>Alto: ${puerta.querySelector('input[name="puertas-alto[]"]').value} cm</li>
                        <li>Tipo: ${puerta.querySelector('select[name="puertas-material[]"]').value}</li>
                        <li>Obs: ${puerta.querySelector('textarea[name="puertas-observaciones[]"]').value || 'Ninguna'}</li>
                    </ul>
                    ${urlsDeEstaPuerta.map(url => `
                        <a href="${url}" target="_blank">
                            <img src="${url.replace('/upload/', '/upload/w_150,h_100,c_fill/')}" 
                                alt="Foto Puerta ${index + 1}" 
                                style="width:150px;height:100px;object-fit:cover;margin:5px;border:1px solid #ddd;">
                        </a>
                    `).join('')}
                </div>
            `;
        });
    }

    // --- 3. Garajes ---
    const garajes = document.querySelectorAll('.garaje');
    if (garajes.length > 0) {
        cuerpoEmail += `<h3>Garajes (${garajes.length})</h3>`;
        garajes.forEach((garaje, index) => {
            const inputId = garaje.querySelector('input[type="file"]').id;
            const urlsDeEsteGaraje = urlsFotos[inputId] || [];

            cuerpoEmail += `
                <div style="border:1px solid #ccc;padding:10px;margin-bottom:10px;">
                    <strong>Garaje ${index + 1}</strong>
                    <ul>
                        <li>Ancho: ${garaje.querySelector('input[name="garajes_ancho[]"]').value} cm</li>
                        <li>Alto: ${garaje.querySelector('input[name="garajes_alto[]"]').value} cm</li>
                        <li>Automática: ${garaje.querySelector('select[name="garajes_automatica[]"]').value}</li>
                        <li>Material: ${garaje.querySelector('select[name="garajes_material[]"]').value}</li>
                        <li>Obs: ${garaje.querySelector('textarea[name="garajes_observaciones[]"]').value || 'Ninguna'}</li>
                    </ul>
                    ${urlsDeEsteGaraje.map(url => `
                        <a href="${url}" target="_blank">
                            <img src="${url.replace('/upload/', '/upload/w_150,h_100,c_fill/')}" 
                                alt="Foto Garaje ${index + 1}" 
                                style="width:150px;height:100px;object-fit:cover;margin:5px;border:1px solid #ddd;">
                        </a>
                    `).join('')}
                </div>
            `;
        });
    }

    // --- 4. Ventanas ---
    const ventanas = document.querySelectorAll('.ventana');
    if (ventanas.length > 0) {
        cuerpoEmail += `<h3>Ventanas (${ventanas.length})</h3>`;
        ventanas.forEach((ventana, index) => {
            const inputId = ventana.querySelector('input[type="file"]').id;
            const urlsDeEstaVentana = urlsFotos[inputId] || [];

            cuerpoEmail += `
                <div style="border:1px solid #ccc;padding:10px;margin-bottom:10px;">
                    <strong>Ventana ${index + 1}</strong>
                    <ul>
                        <li>Ancho: ${ventana.querySelector('input[name="ventanas_ancho[]"]').value} cm</li>
                        <li>Alto: ${ventana.querySelector('input[name="ventanas_alto[]"]').value} cm</li>
                        <li>Dist. Suelo: ${ventana.querySelector('input[name="ventanas_distancia_umbral[]"]').value} cm</li>
                        <li>Apertura: ${ventana.querySelector('select[name="ventanas_apertura[]"]').value}</li>
                        <li>Material: ${ventana.querySelector('select[name="ventanas_material[]"]').value}</li>
                        <li>Obs: ${ventana.querySelector('textarea[name="ventanas_observaciones[]"]').value || 'Ninguna'}</li>
                    </ul>
                    ${urlsDeEstaVentana.map(url => `
                        <a href="${url}" target="_blank">
                            <img src="${url.replace('/upload/', '/upload/w_150,h_100,c_fill/')}" 
                                alt="Foto Ventana ${index + 1}" 
                                style="width:150px;height:100px;object-fit:cover;margin:5px;border:1px solid #ddd;">
                        </a>
                    `).join('')}
                </div>
            `;
        });
    }

    return `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.4;">${cuerpoEmail}</div>`;
}
