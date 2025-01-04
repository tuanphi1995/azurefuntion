const db = require("../db");

module.exports = async function (context, req) {
    try {
        const { playerName } = req.query;

        if (!playerName) {
            throw new Error("Missing playerName in query");
        }

        if (playerName === "all") {
            const allReports = db.playerAssets.map((playerAsset) => {
                const player = db.players.find((p) => p.PlayerId === playerAsset.PlayerId);
                const asset = db.assets.find((a) => a.AssetId === playerAsset.AssetId);

                return {
                    PlayerName: player.PlayerName,
                    Level: player.Level,
                    Age: player.Age,
                    AssetName: asset.AssetName,
                };
            });

            context.res = {
                status: 200,
                body: allReports,
            };
        } else {
            const player = db.players.find((p) => p.PlayerName === playerName);

            if (!player) {
                throw new Error("Player not found");
            }

            const playerAssets = db.playerAssets
                .filter((pa) => pa.PlayerId === player.PlayerId)
                .map((pa) => {
                    const asset = db.assets.find((a) => a.AssetId === pa.AssetId);
                    return { PlayerName: player.PlayerName, AssetName: asset.AssetName };
                });

            context.res = {
                status: 200,
                body: playerAssets,
            };
        }
    } catch (error) {
        context.res = {
            status: 400,
            body: { error: error.message },
        };
    }
};
