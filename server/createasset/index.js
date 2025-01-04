const { v4: uuidv4 } = require("uuid");
const db = require("../db");

module.exports = async function (context, req) {
    try {
        const { AssetName, LevelRequire, OwnerPlayerName } = req.body;

        if (!AssetName || !LevelRequire) {
            throw new Error("Missing required fields");
        }

        const newAsset = {
            AssetId: uuidv4(),
            AssetName,
            LevelRequire,
            OwnerPlayerName: OwnerPlayerName || null,
        };

        db.assets.push(newAsset);

        context.res = {
            status: 200,
            body: { message: "Asset created successfully", asset: newAsset },
        };
    } catch (error) {
        context.res = {
            status: 400,
            body: { error: error.message },
        };
    }
};
