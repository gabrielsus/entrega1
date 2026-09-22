const endpoint = "https://endpoint-l06l.onrender.com/api/traer-productos/"; //endpoint en render

const traerProductos = async () => {
    try {
        const response = await fetch(endpoint);
        
        // Validamos si la respuesta del servidor no es exitosa (ej. 404, 500)
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al traer productos:", error);
        throw error; // Relanzamos el error para que el componente que lo llame se entere
    }
}; 

export default traerProductos;