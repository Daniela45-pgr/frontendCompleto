'use client'; // Asegúrate de que esto esté presente para que sea un componente del lado del cliente

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
    const { id } = params; // Extrae el id de los parámetros de la URL
    const [venta, setVenta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nombreProducto: '',
        cantidad: ''
    });

    const router = useRouter();

    // Función para cargar la venta
    useEffect(() => {
        const fetchVenta = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/ventas/buscarVentaPorID/${id}`);
                setVenta(response.data);
                setLoading(false);
                setFormData({
                    nombreProducto: response.data.nombreProducto,
                    cantidad: response.data.cantidad
                });
            } catch (error) {
                console.error('Error fetching sale:', error);
                setLoading(false); // Para dejar de mostrar "Cargando..." incluso si hay un error
            }
        };

        if (id) {
            fetchVenta();
        }
    }, [id]);

    const guardarVenta = async (e) => {
        e.preventDefault();
        
        const updatedData = {};
        if (formData.nombreProducto) updatedData.nombreProducto = formData.nombreProducto;
        if (formData.cantidad) updatedData.cantidad = formData.cantidad;
    
        try {
            await axios.put(`http://localhost:3000/ventas/editarVenta/${id}`, updatedData);
           // alert('Venta actualizada con éxito');
            router.push('/ventas/mostrar'); // Redirigir a la lista de ventas después de guardar
        } catch (error) {
            console.error('Error al actualizar la venta:', error);
           // alert('Error al actualizar la venta');
        }
    };
    
    

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!venta) {
        return <p>Venta no encontrada.</p>;
    }

    return (
        <div className="m-0 row row-justify-content">
            <form onSubmit={guardarVenta} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Editar Venta</h1>
                    </div>
                    <div className="card-body">
                        <input
                            style={{ height: "70px" }}
                            className="form-control mb-3"
                            type="text"
                            id="nombreProducto"
                            placeholder="Nombre del Producto"
                            value={formData.nombreProducto}
                            onChange={(e) => setFormData({ ...formData, nombreProducto: e.target.value })}
                            autoFocus
                        />
                        <input
                            style={{ height: "70px" }}
                            className="form-control mb-3"
                            type="number"
                            id="cantidad"
                            placeholder="Cantidad"
                            value={formData.cantidad}
                            onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                        />
                    </div>
                    <div className="card-footer">
                        <button type="submit" style={{ height: "50px" }} className="btn btn-primary col-12">Actualizar Venta</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Page;
