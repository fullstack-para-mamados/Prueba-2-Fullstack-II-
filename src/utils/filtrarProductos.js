export function filtrarProductos(productos, texto) {
    return productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto.toLowerCase())
    );
}