"use client"; 

import { useState } from "react"; 
import axios from "axios";
import { useRouter } from "next/navigation";
import AutoCompleteInput from "@/components/AutoCompleteInput"; 


export default function NuevaVenta() {
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [cantidad, setCantidad] = useState("");

    const guardarVenta = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/ventas/nuevaVenta", {
                idUsuario: selectedUsuario.id,
                idProducto: selectedProducto.id,
                cantidad,
            });
            location.replace("/ventas/mostrar");
        } catch (error) {
            console.error("Error al guardar la venta:", error);
        }
    };

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={guardarVenta} className="col-6 mt-5" action="">
            <h1>Nueva Venta</h1>
            <AutoCompleteInput
                placeholder="Buscar Usuario"
                fetchUrl="http://localhost:3000/ventas/buscarUsuarios"
                onSelect={setSelectedUsuario}
            />
            <AutoCompleteInput
                placeholder="Buscar Producto"
                fetchUrl="http://localhost:3000/ventas/buscarProductos"
                onSelect={setSelectedProducto}
            />
            <input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                placeholder="Cantidad"
                className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary col-12">Guardar Venta</button>
        </form>
        </div>
        
    );
}
