// src/js/dynamicForm.js

// 1. Todas las variables y funciones relacionadas con el form dinámico
// (No necesitan 'export' porque solo se usan dentro de este archivo)
const btns_crear = document.querySelectorAll('.crear');
const contenedores_form = document.querySelectorAll('.container-form');
const contadores = {
    puertas: 0,
    garages: 0,
    ventanas: 0
};
export const stagedFiles = {};
//window.misArchivos = stagedFiles; // <--- AÑADE ESTO TEMPORALMENTE
function crearElemento(elemento, contenedor) {
  const uniqueID = Date.now().toString() + Math.floor(Math.random() * 1000);

    switch (elemento) {
      case 'puerta':
        contadores.puertas++;
         contenedor.insertAdjacentHTML("beforeend", `
            <div class="puerta flex flex-col justify-evenly gap-4 mt-4 p-2 rounded-sm w-full h-auto bg-gray-50 shadow-xl border-2 border-gray-400">
              <div class="flex gap-4 items-center justify-between">
                <div class="flex gap-4 items-center">
                  <div class="bg-red-600 text-white px-2.5 py-1 rounded-sm shadow-md num-puerta">${contadores.puertas}</div>
                  <h3 class="text-lg md:text-xl lg:text-xl">Puerta ${contadores.puertas}</h3>
                </div>
                <i class="fa-solid fa-x text-gray-500 cursor-pointer"></i>
              </div>

              <div class="flex gap-2 justify-between items-center">
                <div class="flex flex-col flex-1">
                  <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Ancho </label>
                  <input type="number" name="puertas-ancho[]" class="border border-gray-400 shadow-sm p-2 rounded-sm w-full
                    focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" placeholder="80 (cm)" required min="40" max="150" step="1">
                </div>

                <div class="flex flex-col flex-1">
                  <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Fondo </label>
                  <input type="number" name="puertas-fondo[]" class="border border-gray-400 shadow-sm p-2 rounded-sm w-full
                  focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" placeholder="90 (cm)" min="0" max="150" step="1">
                </div>

                <div class="flex flex-col flex-1">
                  <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Alto </label>
                  <input type="number" name="puertas-alto[]" class="border border-gray-400 shadow-sm p-2 rounded-sm w-full
                  focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" placeholder="200 (cm)" required min="150" max="300" step="1">
                </div>
              </div>

              <div class="flex flex-col">
                <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Tipo de Puerta</label>
                <select name="puertas-material[]" class="border text-gray-400 border-gray-400 shadow-sm p-2 rounded-sm w-full
                 focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" required>
                  <option value="">Selecciona un tipo</option>
                  <option value="madera">Madera</option>
                  <option value="metal">Metal</option>
                  <option value="vidrio">Vidrio</option>
                </select>
              </div>

              <div class="flex flex-col text-lg md:text-xl lg:text-xl">
                <label class="text-gray-800">Observaciones</label>
                <textarea name="puertas-observaciones[]" class="border  border-gray-400 shadow-sm p-2 rounded-sm w-full
                 focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" placeholder="Detalles adicionales (opcional)" maxlength="200"></textarea>
              </div>

              <div class="flex flex-col">
                <h3 class="text-gray-800 text-lg md:text-xl lg:text-xl">Fotos</h3>
                <label id="label-puertas-fotos${uniqueID}" for="puertas-fotos${uniqueID}" class="text-gray-600 w-full  py-5 px-4 border-dashed border-3 border-gray-600 rounded-sm text-center cursor-pointer hover:border-red-700 hover:text-red-700">
                  <i class="fa-solid fa-upload"></i> Subir fotos (mínimo 2)
                </label>
                <input type="file" accept="image/*" id="puertas-fotos${uniqueID}" name="puertas-fotos[]" capture="environment" class="border border-gray-300 bg-gray-100 p-2 rounded-lg" multiple hidden>
                <div class="file-preview-container mt-2 flex flex-col gap-1"></div>
              </div>
            </div>
          `);
        break;
      case 'garage':
        contadores.garages++;
        contenedor.insertAdjacentHTML("beforeend", `
            <div class="garaje flex flex-col justify-evenly gap-4 mt-4 p-4 rounded-sm w-full h-auto bg-gray-50 shadow-xl border-2 border-gray-400">
          <div class="flex gap-4 items-center justify-between">
            <div class="flex gap-4 items-center">
              <div class="bg-red-600 text-white px-2.5 py-1 rounded-sm shadow-md num-garaje">${contadores.garages}</div>
              <h3 class="text-lg md:text-xl lg:text-xl">Puerta de Garaje ${contadores.garages}</h3>
            </div>
            <i class="fa-solid fa-x text-gray-400 cursor-pointer"></i>
          </div>

          <div class="flex gap-4 justify-between items-center">
            <div class="flex flex-col flex-1">
              <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Ancho </label>
              <input 
                type="number" 
                name="garajes_ancho[]" 
                class="border border-gray-400 shadow-sm p-2 rounded-sm w-full
                focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" 
                placeholder="250 (cm)" 
                required 
                min="100" 
                max="500" 
                step="1"
              >
            </div>

            <div class="flex flex-col flex-1">
              <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Alto </label>
              <input 
                type="number" 
                name="garajes_alto[]" 
                class="border border-gray-400 shadow-sm p-2 rounded-sm w-full
                focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" 
                placeholder="200 (cm)" 
                required 
                min="150" 
                max="400" 
                step="1"
              >
            </div>

          </div>
            <div class="flex flex-col ">
              <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Automática</label>
              <select 
                name="garajes_automatica[]" 
                class="border text-gray-400 border-gray-400 p-2 rounded-sm 
                focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" 
                required>
                <option value="">Selecciona una opción</option>
                <option value="sí">Sí</option>
                <option value="no">No</option>
              </select>
            </div>

          <div class="flex flex-col">
            <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Material</label>
            <select 
              name="garajes_material[]" 
              class="border  border-gray-400 p-2 rounded-sm text-gray-400
              focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" 
              required
            >
              <option value="">Selecciona un tipo</option>
              <option value="aluminio">Aluminio</option>
              <option value="acero">Acero</option>
              <option value="madera">Madera</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Observaciones</label>
            <textarea 
              name="garajes_observaciones[]" 
              class="border border-gray-400 shadow-sm p-2 rounded-sm w-full
              focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" 
              placeholder="Detalles adicionales (opcional)" 
              maxlength="200"
            ></textarea>
          </div>

          <div class="flex flex-col">
            <h3 class="text-gray-800 text-lg md:text-xl lg:text-xl">Fotos</h3>
            <label for="garajes-fotos${uniqueID}" 
              class="text-gray-600 w-full  py-5 px-4
                    border-dashed border-3 border-gray-600 rounded-sm text-center cursor-pointer
                    hover:border-red-700 hover:text-red-700">
              <i class="fa-solid fa-upload"></i> Subir fotos (mínimo 2)
            </label>
            <input 
              type="file" 
              accept="image/*" 
              id="garajes-fotos${uniqueID}" 
              name="garajes-fotos[]" 
              capture="environment" 
              class="border border-gray-300 bg-gray-100 p-2 rounded-lg" 
              multiple 
              hidden 
            >
            <div class="file-preview-container mt-2 flex flex-col gap-1"></div>

          </div>
        </div>
          `)
        break;
      case 'ventana':
        contadores.ventanas++;
       contenedor.insertAdjacentHTML("beforeend", `
      <div class="ventana flex flex-col justify-evenly gap-4 mt-4 p-4 rounded-sm w-full h-auto bg-gray-50 shadow-xl border-2 border-gray-400">
        <div class="flex gap-4 items-center justify-between">
          <div class="flex gap-4 items-center">
            <div class="bg-red-600 text-white px-2.5 py-1 rounded-sm shadow-md num-ventana">${contadores.ventanas}</div>
            <h3 class="text-lg md:text-xl lg:text-xl">Ventana ${contadores.ventanas}</h3>
          </div>
          <i class="fa-solid fa-x text-gray-400 cursor-pointer"></i>
        </div>

        <div class="flex gap-4 justify-between items-center">
          <div class="flex flex-col flex-1">
            <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Ancho </label>
            <input 
              type="number" 
              name="ventanas_ancho[]" 
              class="border border-gray-400 shadow-sm p-2 rounded-sm w-full
              focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" 
              placeholder="120 (cm)" 
              required 
              min="30" 
              max="300" 
              step="1"
            >
          </div>

          <div class="flex flex-col flex-1">
            <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Alto</label>
            <input 
              type="number" 
              name="ventanas_alto[]" 
              class="border border-gray-400 shadow-sm p-2 rounded-sm w-full
              focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" 
              placeholder="100 (cm)" 
              required 
              min="30" 
              max="250" 
              step="1"
            >
          </div>
        </div>
        <div class="flex flex-col">
            <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Distancia desde suelo </label>
            <input 
              type="number" 
              name="ventanas_distancia_umbral[]" 
              class="border border-gray-400 shadow-sm p-2 rounded-sm w-full
              focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" 
              placeholder="90 (cm)" 
              required 
              min="0" 
              max="250" 
              step="1"
            >
          </div>

        <div class="flex flex-col">
          <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Tipo de apertura</label>
          <select 
            name="ventanas_apertura[]" 
            class="border  border-gray-400 p-2 rounded-sm text-gray-400
            focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" 
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="abatible">Abatible</option>
            <option value="corredera">Corredera</option>
            <option value="oscilobatiente">Oscilobatiente</option>
            <option value="fija">Fija</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Material</label>
          <select 
            name="ventanas_material[]" 
            class="border border-gray-400 text-gray-400 p-2 rounded-sm 
            focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" 
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="aluminio">Aluminio</option>
            <option value="pvc">PVC</option>
            <option value="madera">Madera</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-gray-800 text-lg md:text-xl lg:text-xl">Observaciones</label>
          <textarea 
            name="ventanas_observaciones[]" 
            class="border border-gray-400 shadow-sm p-2 rounded-sm w-full
            focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50/50 transition-all" 
            placeholder="Detalles adicionales (opcional)" 
            maxlength="200"
          ></textarea>
        </div>

        <div class="caja_fotos flex flex-col">
          <h3 class="text-gray-800 text-lg md:text-xl lg:text-xl">Fotos</h3>
          <label for="ventanas-fotos${uniqueID}" 
            class="text-gray-600 w-full  py-5 px-4
                  border-dashed border-3 border-gray-600 rounded-sm text-center cursor-pointer
                  hover:border-red-700 hover:text-red-700">
            <i class="fa-solid fa-upload"></i> Subir fotos (mínimo 2)
          </label>
          <input 
            type="file" 
            accept="image/*" 
            id="ventanas-fotos${uniqueID}" 
            name="ventanas_fotos[]" 
            capture="environment" 
            class="border border-gray-300 bg-gray-100 p-2 rounded-lg" 
            multiple 
            hidden

          >
          <div class="file-preview-container mt-2 flex flex-col gap-2"></div>
        </div>
        
      </div>
        `)
        break;
    
      default:
        break;
    }


 
}
function actualizarNumeracion(contenedor, tipo) {
    let selector = '';
    let num_selector = '';
    let titulo_prefix = '';

    // Configura las variables según el tipo de elemento
    if (tipo === 'puerta') {
        selector = '.puerta';
        num_selector = '.num-puerta';
        titulo_prefix = 'Puerta ';
    } else if (tipo === 'garage') {
        selector = '.garaje';
        num_selector = '.num-garaje';
        titulo_prefix = 'Puerta de Garaje ';
    } else if (tipo === 'ventana') {
        selector = '.ventana';
        num_selector = '.num-ventana';
        titulo_prefix = 'Ventana ';
    }

    // 1. Selecciona todos los elementos de ese tipo que quedan en el contenedor
    const elementos = contenedor.querySelectorAll(selector);

    // 2. Recorre cada elemento y reasigna su número
    elementos.forEach((elemento, index) => {
        const nuevoNumero = index + 1; // El nuevo número secuencial (1, 2, 3...)

        // Actualiza el número visual (círculo rojo)
        elemento.querySelector(num_selector).textContent = nuevoNumero;

        // Actualiza el título
        elemento.querySelector('h3').textContent = titulo_prefix + nuevoNumero;

    });

    // 3. Actualiza el contador global al número más alto actual
    if (tipo === 'puerta') {
        contadores.puertas = elementos.length;
    } else if (tipo === 'garage') {
        contadores.garages = elementos.length;
    } else if (tipo === 'ventana') {
        contadores.ventanas = elementos.length;
    }
}
// 2. La función "inicializadora" que conecta todo

export function initDynamicForms() {
    btns_crear.forEach(btn => {
        btn.addEventListener('click', () => {
            // ... (tu lógica de click en 'btn_crear') ...
            if (btn.id.includes('puerta_nueva')) {
                btn.remove();
                 crearElemento('puerta', contenedores_form[0]);
                 contenedores_form[0].append(btn);
            } else if (btn.id.includes('garages_nueva')) {
                btn.remove();
            crearElemento('garage', contenedores_form[1]);
                contenedores_form[1].append(btn);
            } else if (btn.id.includes('windows_nueva')) {
                btn.remove();
                crearElemento('ventana', contenedores_form[2]);
            contenedores_form[2].append(btn);
            } 
        });
    });

    contenedores_form.forEach(contenedor => {
        contenedor.addEventListener('click', (e) => {
            if (e.target.classList.contains('fa-x')) {
                // ... (tu lógica de borrado 'fa-x') ...
                const elementoEliminado = e.target.closest('.puerta, .garaje, .ventana');
                // ... etc ...
                if (elementoEliminado) {
                  // --- NUEVO: BORRAR FOTOS DE LA MEMORIA ---
                  // Buscamos el input de archivo dentro del elemento que vamos a borrar
                  const inputDeFotos = elementoEliminado.querySelector('input[type="file"]');
                  if (inputDeFotos && inputDeFotos.id) {
                      // ¡Adiós fotos! Liberamos la memoria
                      delete stagedFiles[inputDeFotos.id];
                      console.log(`Fotos borradas del ID: ${inputDeFotos.id}`);
                    }
                    // -----------------------------------------
                    let tipo = '';
                    if (elementoEliminado.classList.contains('puerta')) tipo = 'puerta';
                    else if (elementoEliminado.classList.contains('garaje')) tipo = 'garage';
                    else if (elementoEliminado.classList.contains('ventana')) tipo = 'ventana';
                    
                    if (tipo) {
                        elementoEliminado.remove();
                        actualizarNumeracion(contenedor, tipo);
                    }
                }
            }
            if (e.target.tagName === 'LABEL' && e.target.htmlFor.includes('-fotos')) {    
                // Esto es lo que querías hacer en tu función 'mostrarDatos'
                // console.log("Datos mostrados (clic en label):", e.target.htmlFor);

                // Desde aquí, puedes encontrar el input real si lo necesitas:
                const inputId = e.target.htmlFor;
                const inputDeArchivo = document.getElementById(inputId);
                // console.log("Input de archivo asociado:", inputDeArchivo);
             }
             if (e.target.classList.contains('remove-file-btn')) {
              const inputId= e.target.dataset.inputId
              const indexFoto=e.target.dataset.index
              stagedFiles[inputId].splice(indexFoto,1)
              const inputDeArchivo = document.getElementById(inputId);
              actualizarVistaPrevia(inputDeArchivo, stagedFiles[inputId]);
             }
             
        });
    });
   // ... dentro de initDynamicForms ...
contenedores_form.forEach(contenedor => {
    //  listener de 'change' 
    contenedor.addEventListener('change', (e) => {
        if (e.target.tagName === 'INPUT' && e.target.type === 'file' && e.target.id.includes('-fotos')) {
            
            const inputDeArchivo = e.target;
            const inputId = inputDeArchivo.id; // Ej: "puertas-fotos1"
            // 1. Inicializa el almacén para este input si no existe
            if (!stagedFiles[inputId]) {
                stagedFiles[inputId] = [];
            }

            // 2. Convierte el FileList (que no es un array) en un Array real
            const nuevosArchivos = Array.from(inputDeArchivo.files);
            if (stagedFiles[inputId].length + nuevosArchivos.length>2) {
              Swal.fire({
              icon: 'error',
              title: '¡Solo puedes subir 2 fotos!',
              text: 'Por favor recuerdalo!.',
              confirmButtonColor: '#E60012', // Rojo AquaBlock
              confirmButtonText: 'Entendido'
            });
              // Limpiamos el input para que el usuario pueda intentarlo de nuevo
              inputDeArchivo.value = ''; 
              return; // <-- ¡Esto CORTA EL FLUJO! La función se detiene aquí.
            }
            // 3. ¡ACUMULA! Añade los archivos nuevos a los que ya teníamos
            stagedFiles[inputId].push(...nuevosArchivos);

            // console.log("Archivos acumulados para", inputId, stagedFiles[inputId]);

            // 4. Llama a la función que "dibuja" la vista previa
            actualizarVistaPrevia(inputDeArchivo, stagedFiles[inputId]);

            // 5. Opcional pero recomendado: limpia el input
            // para que el 'change' se dispare si el usuario
            // vuelve a seleccionar el mismo archivo.
            inputDeArchivo.value = '';
        }
    });
});

    // P.D.: Aquí también iría la lógica de 'stagedFiles' y 'handleFileAdd'
    // que te pasé en la respuesta anterior.
    // <div id="ventanas_fotos_preview" class="mostrar gap-2 overflow-x-auto hidden"> </div>
}
function actualizarVistaPrevia(inputElement, archivos) {
    // 1. Encuentra el <div> de vista previa que está JUSTO ANTES del input
    const previewContainer = inputElement.nextElementSibling;
    const label = inputElement.previousElementSibling;

    // 2. Limpia la vista previa anterior
    previewContainer.innerHTML = '';
// --- 4. ¡NUEVA LÓGICA PARA ACTUALIZAR EL LABEL! ---
    
    // Comprueba si se alcanzó el límite de 2 fotos
    if (archivos.length === 2) {
        // SÍ LLEGÓ AL LÍMITE:
        // Añade clases de "éxito" (ej. verde)
        label.classList.add('border-green-500', 'text-green-600', 'bg-green-50');
        // Quita clases de "hover" o "normal"
        label.classList.remove('hover:border-red-700', 'hover:text-red-700', 'border-gray-300');
        
        // Reemplaza el contenido
        label.innerHTML = `<i class="fa-solid fa-check"></i> 2 fotos subidas (Límite)`;
    
    } else {
        // NO HA LLEGADO AL LÍMITE (o el usuario borró una):
        // Asegúrate de que tenga las clases originales
        label.classList.remove('border-green-500', 'text-green-600', 'bg-green-50');
        label.classList.add('hover:border-red-700', 'hover:text-red-700', 'border-gray-300');
        
        // Pon el contenido original, pero actualizado con el contador
        label.innerHTML = `<i class="fa-solid fa-upload"></i> Subir fotos (${archivos.length} / 2)`;
    }


    // 3. Si no hay archivos, muestra un mensaje
    if (archivos.length === 0) {
        previewContainer.innerHTML = '<p class="text-xs text-gray-500 italic">No hay fotos seleccionadas.</p>';
        return;
    }

    // 4. "Dibuja" la lista de archivos
    archivos.forEach((file, index) => {
        previewContainer.innerHTML += `
          <div class="file-preview-item flex justify-between  text-sm bg-gray-100 p-2 rounded shadow-sm my-1">
              <span class="truncate w-4/5">${file.name}</span>
              
              <i class="fa-solid fa-trash-can text-red-600 cursor-pointer remove-file-btn hover:scale-110 transition"
                data-input-id="${inputElement.id}" data-index="${index}"></i>
          </div>
        `;
    });
}