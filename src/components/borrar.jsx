"use client";
import Link from "next/link";
import axios from "axios";

export default function BorrarUsuario({ id }) {
    async function borrar() {
        const url = `http://localhost:3000/usuarios/borrarUsuario/${id}`;
        await axios.delete(url);
        window.location.replace("/usuarios/mostrar"); // Redirigir después de borrar
    }

    return (
        <Link href="#" onClick={borrar}>
            Borrar
        </Link>
    );
}
