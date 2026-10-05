import {createContext, useState, useEffect} from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [carrito, setCarrito] = useState(() =>{
        const guardados = localStorage.getItem('carrito');
        return guardados ? JSON.parse(guardados) : [];
    });

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

 //1. Agregar al carrito (evida duplicados en el localstorage)
const addToCart = (producto) => {
    setCarrito((prevCarrito) => {
        const existe = prevCarrito.find((item) => item.id === producto.id);
        
        if (existe) {
            return prevCarrito.map((item) =>
                item.id === producto.id 
                    ? { ...item, cantidad: (item.cantidad || 1) + 1 } 
                    : item
            );
        } else {
            return [...prevCarrito, { ...producto, cantidad: 1 }];
        }
    });
};

//2. Vaciar carrito completo
const vaciarCarrito = () => {
    setCarrito([]);
}

//3. Total items in the cart
const totalItems = carrito.reduce((acumulador, prod) => acumulador + (prod.cantidad || 1), 0);

//4. Total price of the cart
const totalCompra = carrito.reduce((acumulador, prod) => acumulador + (Number(prod.price || 0) * (prod.cantidad || 1)), 0);

//5. Modificar la cantidad de un producto (suma o resta según el delta)
const updateQuantity = (id, delta) => {
    setCarrito((prevCarrito) => {
        return prevCarrito.map((item) => {
            if (item.id === id) {
                const nuevaCantidad = (item.cantidad || 1) + delta;
                return { ...item, cantidad: nuevaCantidad };
            }
            return item;
        }).filter((item) => item.cantidad > 0); // Si la cantidad resultante es menor o igual a 0, lo elimina automáticamente
    });
};

//6. Eliminar el producto completo sin importar la cantidad (el tacho de la X)
const deleteItem = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
};

return (
    <CartContext.Provider value={{ carrito, addToCart, vaciarCarrito, totalItems, totalCompra, updateQuantity, deleteItem }}>
        {children}
    </CartContext.Provider>
);
}