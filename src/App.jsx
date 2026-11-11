import { useState, useEffect } from "react";
import productos from "./data/productos";
import Buscador from "./components/Buscador";
import ProductoCard from "./components/ProductoCard";
import Carrito from "./components/Carrito";
import Favoritos from "./components/Favoritos";
import Resenas from "./components/Resenas";
import { filtrarProductos } from "./utils/filtrarProductos";


function leerListaGuardada(clave) {
    try {
        const datos = localStorage.getItem(clave);

        if (datos === null) {
            return [];
        }

        const lista = JSON.parse(datos);
        return Array.isArray(lista) ? lista : [];
    } catch {
        return [];
    }
}



function App() {
    const [texto, setTexto] = useState("");
    const [carrito, setCarrito] = useState(() =>
    leerListaGuardada("gotyshop_carrito")
    );
    const [favoritos, setFavoritos] = useState(() =>
        leerListaGuardada("gotyshop_favoritos")
    );;
    const [resenas, setResenas] = useState([]);

    useEffect(() => {
        try {
            localStorage.setItem(
                "gotyshop_carrito",
                JSON.stringify(carrito)
            );
        } catch (error) {
            console.error("No se pudo guardar el carrito:", error);
        }
    }, [carrito]);

    useEffect(() => {
        try {
            localStorage.setItem(
                "gotyshop_favoritos",
                JSON.stringify(favoritos)
            );
        } catch (error) {
            console.error("No se pudieron guardar los favoritos:", error);
        }
    }, [favoritos]);



    function agregarAlCarrito(producto) {
        setCarrito([...carrito, producto]);
    }

    function quitarDelCarrito(indice) {
        setCarrito(carrito.filter((item, i) => i !== indice));
    }

    function agregarFavorito(producto) {
        const existe = favoritos.some(item => item.id === producto.id);

        if (!existe) {
            setFavoritos([...favoritos, producto]);
        }
    }

    function quitarFavorito(id) {
        setFavoritos(favoritos.filter(item => item.id !== id));
    }

    function agregarResena(resena) {
        setResenas([...resenas, resena]);
    }

    const filtrados = filtrarProductos(productos, texto);

        return (
        // Contenedor de toda la página: ocupa al menos el alto de la pantalla y usa un fondo gris claro.
        <div className="min-vh-100 bg-body-tertiary">
            {/* Barra superior oscura con el nombre de la tienda y un mensaje breve. */}
            <nav className="navbar navbar-dark bg-dark shadow-sm">S
                {/* Centra el contenido de la barra y limita su ancho. */}
                <div className="container">
                    <span className="navbar-brand fw-bold">GOTYSHOP</span>
                    <span className="navbar-text text-white">
                        Tu tienda de videojuegos
                    </span>
                </div>
            </nav>

            {/* Contenido principal: centrado y con espacio vertical. */}
            <main className="container py-4">
                {/* Presentación de la tienda y buscador. */}
                <section className="mb-4">
                    <h1 className="display-5 fw-bold">Bienvenido a GOTYSHOP</h1>
                    <p className="lead">
                        Encuentra tus juegos favoritos y agrégalos al carrito.
                    </p>

                    {/* Recibe y actualiza el texto usado para filtrar productos. */}
                    <Buscador texto={texto} setTexto={setTexto} />
                </section>

                {/* Catálogo de productos filtrados por el buscador. */}
                <section aria-label="Catálogo de productos">
                    <h2 className="h3 mb-3">Catálogo</h2>

                    {/* Bootstrap organiza las tarjetas en filas y agrega separación entre ellas. */}
                    <div className="row g-4">
                        {filtrados.map(p => (
                            // En móvil ocupa todo el ancho; en pantallas mayores muestra varias columnas.
                            <div className="col-12 col-sm-6 col-xl-4" key={p.id}>
                                {/* Tarjeta del producto con acciones para carrito y favoritos. */}
                                <ProductoCard
                                    producto={p}
                                    agregarAlCarrito={agregarAlCarrito}
                                    agregarFavorito={agregarFavorito}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Mensaje visible cuando el filtro no encuentra productos. */}
                    {filtrados.length === 0 && (
                        <p className="alert alert-info mt-3">
                            No se encontraron juegos.
                        </p>
                    )}
                </section>

                {/* Fila para mostrar carrito y favoritos. */}
                <section className="row g-4 mt-2" aria-label="Carrito y favoritos">
                    {/* En celular ocupa todo el ancho; desde pantallas grandes comparte la fila. */}
                    <div className="col-12 col-lg-6">
                        <Carrito
                            carrito={carrito}
                            quitarDelCarrito={quitarDelCarrito}
                        />
                    </div>

                    {/* Panel de favoritos con el mismo comportamiento adaptable. */}
                    <div className="col-12 col-lg-6">
                        <Favoritos
                            favoritos={favoritos}
                            quitarFavorito={quitarFavorito}
                        />
                    </div>
                </section>

                {/* Sección de reseñas, separada del resto del contenido. */}
                <section className="mt-5">
                    <Resenas
                        productos={productos}
                        resenas={resenas}
                        agregarResena={agregarResena}
                    />
                </section>
            </main>
        </div>
    );
}

export default App;
