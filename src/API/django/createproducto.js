const endpoint = 'https://endpoint-l06l.onrender.com/api/insertar-producto/';

const createProducto = async (productoData) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoData)
        });
        if (!response.ok) {
            throw new Error('Error al crear el producto');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw error;
    }
};

export default createProducto;