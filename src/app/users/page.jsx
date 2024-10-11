import Boton from "@/components/boton";
import axios from "axios";
import Link from "next/link";

async function usuarioss() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const usuarios = await axios.get(url);
    return usuarios.data;
}

export default async function Usuarios() {
    const usuarios = await usuarioss();

    return (
        <div>
            <h1>Usuarios</h1>
            <p>Estas en usuarios</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Correo</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, i) => (
                        <tr key={usuario.id}>
                            <td>{i + 1}</td>
                            <td>
                                <Link href={`/users/${usuario.id}`}>
                                    {usuario.name}
                                </Link>
                            </td>
                            <td>{usuario.username}</td>
                            <td>{usuario.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Boton />
        </div>
    );
}
