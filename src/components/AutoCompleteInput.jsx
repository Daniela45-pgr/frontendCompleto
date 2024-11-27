"use client"
import { useState, useEffect } from "react";
import axios from "axios";

export default function AutoCompleteInput({ placeholder, fetchUrl, onSelect, initialValue }) {
    const [inputValue, setInputValue] = useState(initialValue || "");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setInputValue(initialValue || ""); // Sincroniza con el valor inicial
    }, [initialValue]);

    const fetchSuggestions = async (query) => {
        if (!query) return setSuggestions([]);
        try {
            const response = await axios.get(fetchUrl, { params: { q: query } });
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleSelect = (item) => {
        setInputValue(item.nombre); // Actualiza con el nombre del producto o usuario
        setSuggestions([]);
        onSelect(item); // Envía el objeto seleccionado al componente padre
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                placeholder={placeholder}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    fetchSuggestions(e.target.value);
                }}
                className="form-control mb-2"
            />
            {suggestions.length > 0 && (
                <ul className="list-group">
                    {suggestions.map((item) => (
                        <li
                            key={item.id}
                            className="list-group-item"
                            onClick={() => handleSelect(item)}
                            style={{ cursor: "pointer" }}
                        >
                            {item.nombre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


