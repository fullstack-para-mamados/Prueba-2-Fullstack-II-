export function validarResena(nombre, comentario) {
    return nombre.trim().length > 0 && comentario.trim().length >= 10;
}
