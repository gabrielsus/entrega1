const endpointBase = "https://endpoint-l06l.onrender.com/api/productos/"; // Ajustá según la ruta real de tu backend

const traerProductoPorId = async (id) => {
    try {
        const response = await fetch(`${endpointBase}${id}`);
        
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al traer el producto ${id}:`, error);
        throw error;
    }
}; 

export default traerProductoPorId;