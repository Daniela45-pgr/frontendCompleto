"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AutoCompleteInput from "@/components/AutoCompleteInput";

export default function EditarVenta({ params }) {
    const { id } = params;
    const [venta, setVenta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [selectedProducto, setSelectedProducto] = useState(null);
    const [cantidad, setCantidad] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchVenta = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/ventas/buscarVentaPorID/${id}`);
                const venta = response.data;
                setVenta(venta);
                setSelectedUsuario({ id: venta.idUsuario, nombre: venta.nombreUsuario });
                setSelectedProducto({ id: venta.idProducto, nombre: venta.nombreProducto });
                setCantidad(venta.cantidad);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching sale:", error);
                setLoading(false);
            }
        };
    
        if (id) {
            fetchVenta();
        }
    }, [id]);
    
    

    const guardarVenta = async (e) => {
        e.preventDefault();
    
        if (!selectedUsuario || !selectedProducto) {
            alert("Por favor selecciona un usuario y un producto válidos.");
            return;
        }
    
        try {
            await axios.put(`http://localhost:3000/ventas/editarVenta/${id}`, {
                idUsuario: selectedUsuario.id,
                idProducto: selectedProducto.id,
                cantidad,
            });
            router.push("/ventas/mostrar");
        } catch (error) {
            console.error("Error al actualizar la venta:", error);
        }
    };
    

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="m-0 row justify-content-center">
             <form onSubmit={guardarVenta} className="col-6 mt-5" action="">
            <h1>Editar Venta</h1>
            <AutoCompleteInput
                placeholder="Buscar Usuario"
                fetchUrl="http://localhost:3000/ventas/buscarUsuarios"
                onSelect={setSelectedUsuario}
                initialValue={venta?.nombreUsuario || ""}
            />
            <AutoCompleteInput
                placeholder="Buscar Producto"
                fetchUrl="http://localhost:3000/ventas/buscarProductos"
                onSelect={setSelectedProducto}
                initialValue={venta?.nombreProducto || ""}
            />
            <input
                type="number"
                value={cantidad || ""}
                onChange={(e) => setCantidad(e.target.value)}
                placeholder="Cantidad"
                className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary col-12">
                Actualizar Venta
            </button>
        </form>
        </div>
       
    );
}



