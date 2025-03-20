import React, { useEffect, useState } from "react";

const GameData = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/games")
            .then(response => response.json())
            .then(data => setGames(data))
            .catch(error => console.error("Error fetching game data:", error));
    }, []);

    return (
        <div>
            <h2>Vanderbilt Game Stats</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        {game.team} vs {game.opponent} - Score: {game.score} ({game.date})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameData;

