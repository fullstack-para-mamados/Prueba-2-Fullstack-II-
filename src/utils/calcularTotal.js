export function calcularTotal(carrito) {
    return carrito.reduce((suma, item) => suma + item.precio, 0);
}