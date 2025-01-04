const { v4: uuidv4 } = require("uuid");
const db = require("../db");

module.exports = async function (context, req) {
    try {
        const { PlayerName, FullName, Age, Level, Email } = req.body;

        if (!PlayerName || !FullName || !Age || !Level || !Email) {
            throw new Error("Missing required fields");
        }

        const newPlayer = {
            PlayerId: uuidv4(),
            PlayerName,
            FullName,
            Age,
            Level,
            Email,
        };

        db.players.push(newPlayer);

        context.res = {
            status: 200,
            body: { message: "Player registered successfully", player: newPlayer },
        };
    } catch (error) {
        context.res = {
            status: 400,
            body: { error: error.message },
        };
    }
};
