'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Boton from "@/components/botonVentas";
import CancelarVenta from "@/components/cancelar";

export default function Ventas() {
    const [ventass, setVentass] = useState([]);

    const getVentass = async () => {
        try {
            const response = await axios.get('http://localhost:3000/ventas/mostrarVenta');
            setVentass(response.data);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    useEffect(() => {
        getVentass(); // Cargar ventas al montar el componente
    }, []); // Dependencias vacías para que solo se ejecute una vez

    return (
        <div>
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Usuario</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Fecha Hora</th>
                        <th>Estatus</th>
                        <th>Editar/Cancelar</th>
                    </tr>
                </thead>
                <tbody>
                    {ventass.map((venta) => (
                        <tr key={venta.id}>
                            <td>{venta.id}</td> 
                            <td>{venta.nombreUsuario}</td> 
                            <td>{venta.nombreProducto}</td> 
                            <td>{venta.cantidad}</td> 
                            <td>{venta.fecha}</td> 
                            <td>{venta.estatus}</td>
                            <td>
                                <Link href={`/ventas/editar/${venta.id}`}>
                                    Editar
                                </Link>
                                &nbsp;
                                <CancelarVenta id={venta.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Boton />
        </div>
    );
}
