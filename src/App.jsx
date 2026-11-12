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
        <div className="min-vh-100 bg-body-tertiary">
            <nav className="navbar navbar-dark bg-dark shadow-sm">
         
                <div className="container">
                    <span className="navbar-brand fw-bold">GOTYSHOP</span>
                    <span className="navbar-text text-white">
                        Tu tienda de videojuegos
                    </span>
                </div>
            </nav>

       
            <main className="container py-4">
          
                <section className="mb-4">
                    <h1 className="display-5 fw-bold">Bienvenido a GOTYSHOP</h1>
                    <p className="lead">
                        Encuentra tus juegos favoritos y agrégalos al carrito.
                    </p>

               
                    <Buscador texto={texto} setTexto={setTexto} />
                </section>

               
                <section aria-label="Catálogo de productos">
                    <h2 className="h3 mb-3">Catálogo</h2>

              
                    <div className="row g-4">
                        {filtrados.map(p => (
                        
                            <div className="col-12 col-sm-6 col-xl-4" key={p.id}>
                              
                                <ProductoCard
                                    producto={p}
                                    agregarAlCarrito={agregarAlCarrito}
                                    agregarFavorito={agregarFavorito}
                                />
                            </div>
                        ))}
                    </div>

                  
                    {filtrados.length === 0 && (
                        <p className="alert alert-info mt-3">
                            No se encontraron juegos.
                        </p>
                    )}
                </section>

                <section className="row g-4 mt-2" aria-label="Carrito y favoritos">
                 
                    <div className="col-12 col-lg-6">
                        <Carrito
                            carrito={carrito}
                            quitarDelCarrito={quitarDelCarrito}
                        />
                    </div>

            
                    <div className="col-12 col-lg-6">
                        <Favoritos
                            favoritos={favoritos}
                            quitarFavorito={quitarFavorito}
                        />
                    </div>
                </section>

           
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
