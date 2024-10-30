"use client";
import { useRouter } from 'next/navigation'; // Asegúrate de importar useRouter

export default function Boton() {
    const router = useRouter(); // Inicializa useRouter

    const nueva = () => {
        // Redirigir a la página de nuevo usuario
        router.push('/ventas/nuevo');
    };

    return (
        <button onClick={nueva}>Nueva Venta</button>
    );
}