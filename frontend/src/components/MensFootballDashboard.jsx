import React from 'react';

const VANDY_ID = "8177772e-e8b5-44c6-8dc2-a745b863ec3b";

const FootballDashboard = ({ stats, schedule }) => {
    const renderTeamStats = () => {
        const record = stats?.record;

        if (!record || Object.keys(record).length === 0) {
            return <p className="text-gray-500">No team stats available.</p>;
        }

        const summaryStats = [
            { label: "Games Played", value: record.games_played },
            { label: "Total Touchdowns", value: record.touchdowns?.total },
            { label: "Passing Yards", value: record.passing?.yards },
            { label: "Rushing Yards", value: record.rushing?.yards },
            { label: "Receiving Yards", value: record.receiving?.yards },
            { label: "Interceptions", value: record.interceptions?.interceptions },
            { label: "Field Goals Made", value: record.field_goals?.made },
            { label: "Sacks", value: record.defense?.sacks },
            { label: "Tackles", value: record.defense?.tackles }
        ];

        return (
            <table className="min-w-full border border-gray-300 mb-8" cellPadding="8">
                <thead>
                    <tr className="bg-[#d2d6dc] text-left">
                        <th className="border border-gray-300">Statistic</th>
                        <th className="border border-gray-300">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {summaryStats.map((stat, index) => (
                        <tr key={stat.label} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f0f4ff]'}>
                            <td className="border border-gray-300">{stat.label}</td>
                            <td className="border border-gray-300">{stat.value ?? '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const renderPlayerStats = () => {
        const players = stats?.players;

        if (!players || players.length === 0) {
            return <p className="text-gray-500">No player stats available.</p>;
        }

        return (
            <table className="min-w-full border border-gray-300 mb-8" cellPadding="8">
                <thead>
                    <tr className="bg-[#d2d6dc] text-left">
                        <th className="border border-gray-300">Player</th>
                        <th className="border border-gray-300">Position</th>
                        <th className="border border-gray-300">Games Played</th>
                        <th className="border border-gray-300">Tackles</th>
                        <th className="border border-gray-300">Interceptions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((p, index) => (
                        <tr
                            key={p.id}
                            className={index % 2 === 0 ? 'bg-white' : 'bg-[#f0f4ff]'}
                        >
                            <td className="border border-gray-300">{p.name}</td>
                            <td className="border border-gray-300">{p.position}</td>
                            <td className="border border-gray-300">{p.games_played ?? '—'}</td>
                            <td className="border border-gray-300">{p.defense?.tackles ?? '—'}</td>
                            <td className="border border-gray-300">{p.interceptions?.interceptions ?? '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const getResult = (game) => {
        const homeId = game.home?.id;
        const awayId = game.away?.id;
        const homePts = game.scoring?.home_points;
        const awayPts = game.scoring?.away_points;

        if (homePts == null || awayPts == null) return '—';

        if (homeId === VANDY_ID) return homePts > awayPts ? 'W' : 'L';
        if (awayId === VANDY_ID) return awayPts > homePts ? 'W' : 'L';
        return '—';
    };

    const renderSchedule = () => {
        return (
            <table className="w-full border text-sm font-mono border-[#E0E7FF]">
                <thead className="bg-[#d2d6dc] text-left">
                    <tr>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Home</th>
                        <th className="p-2 border">Away</th>
                        <th className="p-2 border">H. Pts</th>
                        <th className="p-2 border">A. Pts</th>
                        <th className="p-2 border">Result</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.games.map((game, index) => (
                        <tr
                            key={game.id}
                            className={index % 2 === 0 ? 'bg-white' : 'bg-[#f0f4ff]'}
                        >
                            <td className="p-2 border">{new Date(game.scheduled).toLocaleDateString()}</td>
                            <td className="p-2 border">{game.home?.name}</td>
                            <td className="p-2 border">{game.away?.name}</td>
                            <td className="p-2 border">{game.scoring?.home_points ?? '—'}</td>
                            <td className="p-2 border">{game.scoring?.away_points ?? '—'}</td>
                            <td className="p-2 border">{getResult(game)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Team Stats</h2>
                {renderTeamStats()}
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Player Stats</h2>
                {renderPlayerStats()}
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Schedule</h2>
                {renderSchedule()}
            </section>
        </div>
    );
};

export default FootballDashboard;
