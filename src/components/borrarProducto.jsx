"use client";
import Link from "next/link";
import axios from "axios";

export default function BorrarProducto({ id }) {
    async function borrar() {
        const url = `http://localhost:3000/productos/borrarProducto/${id}`;
        await axios.delete(url);
        window.location.replace("/productos/mostrar"); // Redirigir después de borrar
    }

    return (
        <Link href="#" onClick={borrar}>
            Borrar
        </Link>
    );
}