'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Ventas() {
    const [ventas, setVentas] = useState([]);

    const getVentas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/ventas/mostrarVentas');
            const ventasVendidas = response.data.filter((venta) => venta.estatus === 'vendido');
            setVentas(ventasVendidas);
        } catch (error) {
            console.error('Error al cargar las ventas:', error);
        }
    };

    useEffect(() => {
        getVentas(); 
    }, []);

    return (
        <div>
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Editar/Cancelar</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr key={venta.id}>
                            <td>{venta.nombreUsuario}</td>
                            <td>{venta.nombreProducto}</td>
                            <td>{venta.cantidad}</td>
                            <td>
                                <a href={`/ventas/editar/${venta.id}`} className="btn btn-primary btn-sm me-2">Editar</a>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => cancelarVenta(venta.id)}
                                >
                                    Cancelar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Función para cancelar una venta (cambia el estado a "cancelado")
async function cancelarVenta(id) {
    try {
       const confirmacion = confirm("¿Estás seguro de que deseas cancelar esta venta?");
        if (!confirmacion) return;

        const response = await axios.put(`http://localhost:3000/ventas/cancelarVenta/${id}`);
        if (response.data.success) {
            location.reload(); 
        } else {
        }
    } catch (error) {
    }
}

