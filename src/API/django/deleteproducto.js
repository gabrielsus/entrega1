const endpoint = 'https://endpoint-l06l.onrender.com/api/eliminar-producto/';

const deleteProducto = async (productoId) => {
    try {
        const response = await fetch(`${endpoint}${productoId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw error;
    }
};

export default deleteProducto;