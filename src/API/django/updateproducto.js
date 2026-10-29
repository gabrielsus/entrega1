const endpoint = 'https://endpoint-l06l.onrender.com/api/actualizar-producto/'; //endpoint en render

const updateProducto = async (productoId, updatedData) => {
    try {
        const response = await fetch(`${endpoint}${productoId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw error;
    }
};
export default updateProducto;