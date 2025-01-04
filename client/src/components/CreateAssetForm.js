import React, { useState } from "react";

export default function CreateAssetForm() {
    const [form, setForm] = useState({
        AssetName: "",
        LevelRequire: "",
        OwnerPlayerName: "",
    });
    const [response, setResponse] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:7071/api/createasset", {
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
            <h3>Create Asset</h3>
            <form onSubmit={handleSubmit}>
                <input name="AssetName" placeholder="AssetName" onChange={handleChange} />
                <input name="LevelRequire" placeholder="LevelRequire" type="number" onChange={handleChange} />
                <input name="OwnerPlayerName" placeholder="OwnerPlayerName (optional)" onChange={handleChange} />
                <button type="submit">Create</button>
            </form>
            <p>{response}</p>
        </div>
    );
}
