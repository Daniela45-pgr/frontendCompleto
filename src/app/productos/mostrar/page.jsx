"use client"
import BorrarProducto from "@/components/borrarProducto";
import Boton from "@/components/botonProducto";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Productos() {
    const [productoss, setProductoss] = useState([]);

    const getProductoss = async () => {
        const url = "http://localhost:3000/productos";
        const response = await axios.get(url);
        setProductoss(response.data); // Actualiza el estado con los usuarios
    };

    useEffect(() => {
        getProductoss(); // Cargar usuarios al montar el componente
    }, []);

    return (
        <div>
            <h1>Productos</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Editar/Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {productoss.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td> 
                            <td>{producto.nombre}</td> 
                            <td>{producto.precio}</td> 
                            <td>{producto.stock}</td>
                            <td>
                            <Link href={`/productos/editar/${producto.id}`}>
                                    Editar
                                </Link>
                                &nbsp;
                                <BorrarProducto id={producto.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Boton />
        </div>
    );
}

