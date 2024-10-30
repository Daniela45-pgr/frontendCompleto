"use client";
import axios from "axios";

async function guardarVenta(e) {
    e.preventDefault();
    console.log("función guardar venta");
    const url = "http://localhost:3000/ventas/nuevaVenta";
    const datos = {
        idUsuario: document.getElementById("idUsuario").value,
        idProducto: document.getElementById("idProducto").value,
        cantidad: document.getElementById("cantidad").value,
    };
    
    try {
        const respuesta = await axios.post(url, datos);
        console.log(respuesta);
        // Redirigir a la página de mostrar ventas después de guardar
        location.replace("http://localhost:3001/ventas/mostrar");
    } catch (error) {
        console.error('Error al guardar la venta:', error);
    }
}

export default function NuevaVenta() {
    return (
        <div className="m-0 row row-justify-content">
            <form onSubmit={guardarVenta} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Nueva Venta</h1>
                    </div>
                    <div className="card-body">
                        <input 
                            style={{ height: "70px" }} 
                            className="form-control mb-3" 
                            type="text" 
                            id="idUsuario" 
                            placeholder="ID del Usuario" 
                            autoFocus 
                        />
                        <input 
                            style={{ height: "70px" }} 
                            className="form-control mb-3" 
                            type="text" 
                            id="idProducto" 
                            placeholder="ID del Producto" 
                        />
                        <input 
                            style={{ height: "70px" }} 
                            className="form-control mb-3" 
                            type="number" 
                            id="cantidad" 
                            placeholder="Cantidad" 
                        />
                    </div>
                    <div className="card-footer">
                        <button type="submit" style={{ height: "50px" }} className="btn btn-primary col-12">Guardar Venta</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
