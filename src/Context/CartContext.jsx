/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Error en el CartContext Context");
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {

  const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem("carrito")) || []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const actualizarCarrito = () => {
    let dataCarrito = JSON.parse(localStorage.getItem("carrito"));
    setCarrito(dataCarrito);
  };

  const addItemsToCart = (producto) => {
    if(!carrito.some(prodt => prodt.id === producto.id)){
      setCarrito((productosPrevios) => {
        return [...productosPrevios, producto];
      });
    }
  };

  const deleteItemsToCart = (id) => {
    const nuevaData = carrito.filter((data) => data.id !== id);
    setCarrito(nuevaData);
  };
  
  const actualizarCantidad = (id, cantidad) => {
    let cantidadInt = parseInt(cantidad)
    const productoUpt = carrito.map(producto => {
      if(producto.id === id){
        return {
          ...producto,
          cantidad: cantidadInt
        }
      }
      return producto;
    })
    setCarrito(productoUpt);
  }
  
  return (
    <CartContext.Provider
      value={{ carrito, addItemsToCart, deleteItemsToCart, actualizarCarrito, actualizarCantidad}}
    >
      {children}
    </CartContext.Provider>
  );
};
