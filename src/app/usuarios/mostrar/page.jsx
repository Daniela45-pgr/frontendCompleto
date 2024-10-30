"use client"
import BorrarUsuario from "@/components/borrar";
import Boton from "@/components/boton";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Usuarios() {
    const [usuarioss, setUsuarioss] = useState([]);

    const getUsuarios = async () => {
        const url = "http://localhost:3000/usuarios";
        const response = await axios.get(url);
        setUsuarioss(response.data); // Actualiza el estado con los usuarios
    };

    useEffect(() => {
        getUsuarios(); // Cargar usuarios al montar el componente
    }, []);

    return (
        <div>
            <h1>Usuarios</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Editar/Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarioss.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td> 
                            <td>{usuario.nombre}</td> 
                            <td>{usuario.usuario}</td> 
                            <td>
                                <Link href={`/usuarios/editar/${usuario.id}`}>
                                    Editar
                                </Link>
                                &nbsp;
                                <BorrarUsuario id={usuario.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Boton />
        </div>
    );
}




