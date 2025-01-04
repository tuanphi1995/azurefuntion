import React, { useState } from "react";

export default function RegisterPlayerForm() {
    const [form, setForm] = useState({
        PlayerName: "",
        FullName: "",
        Age: "",
        Level: "",
        Email: "",
    });
    const [response, setResponse] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:7071/api/registerplayer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            setResponse(JSON.stringify(data));
        } catch (err) {
            setResponse("Error: " + err.message);
        }
    };

    return (
        <div>
            <h3>Register Player</h3>
            <form onSubmit={handleSubmit}>
                <input name="PlayerName" placeholder="PlayerName" onChange={handleChange} />
                <input name="FullName" placeholder="FullName" onChange={handleChange} />
                <input name="Age" placeholder="Age" type="number" onChange={handleChange} />
                <input name="Level" placeholder="Level" type="number" onChange={handleChange} />
                <input name="Email" placeholder="Email" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
            <p>{response}</p>
        </div>
    );
}
