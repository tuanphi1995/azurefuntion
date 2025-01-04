import React, { useState, useEffect } from "react";

export default function AssetTable() {
    const [assets, setAssets] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:7071/api/getassetsbyplayer?playerName=all")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setAssets(data);
                } else {
                    setError(data.error || "Failed to fetch");
                }
            })
            .catch((err) => setError(err.message));
    }, []);

    return (
        <div>
            <h3>All Player Assets</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table border="1">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Player Name</th>
                        <th>Level</th>
                        <th>Age</th>
                        <th>Asset Name</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.PlayerName}</td>
                            <td>{item.Level}</td>
                            <td>{item.Age}</td>
                            <td>{item.AssetName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
