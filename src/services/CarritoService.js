const ivaPorcentaje = 0.16;

export function calcularSubtotal(cartItems) {
  return cartItems.reduce(
    (total, item) => total + item.cantidad * parseFloat(item.precio),
    0
  );
}

export function calcularIVA(subtotal) {
  return subtotal * ivaPorcentaje;
}

export function calcularTotal(subtotal, iva) {
  return subtotal + iva;
}

export function eliminarProducto(cartItems, itemId) {
  return cartItems.filter((item) => item.id !== itemId);
}