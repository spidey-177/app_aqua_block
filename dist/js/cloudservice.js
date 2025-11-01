// src/services/cloudinaryService.js

export async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/dtcdsf00t/upload`; // tu Cloud Name aquí
  const preset = 'forms_aq'; // el nombre del upload preset que creaste

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (data.secure_url) {
      console.log('✅ Subida exitosa:', data.secure_url);
      return data.secure_url; // devuelves la URL pública del archivo
    } else {
      throw new Error('Error al subir a Cloudinary: ' + JSON.stringify(data));
    }
  } catch (error) {
    console.error('❌ Error al subir archivo:', error);
    return null;
  }
}
