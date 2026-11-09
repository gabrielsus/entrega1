export const subirImagenImgBB = async (archivo) => {
  const formData = new FormData();
  formData.append('image', archivo);

  // Leemos la clave desde las variables de entorno nativas de Vite
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  try {
    const respuesta = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const datos = await respuesta.json();

    if (datos.success) {
      // Acá tenés la URL directa de la imagen subida
      return datos.data.url; 
    } else {
      throw new Error('No se pudo subir la imagen a ImgBB');
    }
  } catch (error) {
    console.error('Error en la subida:', error);
    throw error;
  }
};