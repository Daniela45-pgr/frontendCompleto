import axios from "axios";

export default async function Usuario({ params }) {
    const { id } = params; // Obtener el ID de los parámetros
    let usuario;
    
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        usuario = response.data;
    } catch (err) {
        error = err;
    }

    // Concatenar dirección en una sola línea
    const direccion = `${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}, ${usuario.address.zipcode}`;

    return (
        <>
            <h1>Detalles del Usuario</h1>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Id</th>
                        <td>{usuario.id}</td>
                    </tr>
                    <tr>
                        <th>Dirección</th>
                        <td>{direccion}</td>
                    </tr>
                    <tr>
                        <th>Teléfono</th>
                        <td>{usuario.phone}</td>
                    </tr>
                    <tr>
                        <th>Web</th>
                        <td>{usuario.website}</td>
                    </tr>
                    <tr>
                        <th>Compañía</th>
                        <td>{usuario.company.name}</td>
                    </tr>
                    <tr>
                        <th>Frase</th>
                        <td>{usuario.company.catchPhrase}</td>
                    </tr>
                    <tr>
                        <th>Descripción</th>
                        <td>{usuario.company.bs}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}



