export interface Player {
    id: string;
    name: string;
    wins: number;
    losses: number;
    totalScore: number;
}

const players: Player[] = [
    { id: '1', name: 'ShadowStrike', wins: 15, losses: 5, totalScore: 28500 },
    { id: '2', name: 'NoobMaster', wins: 3, losses: 12, totalScore: 4200 },
    { id: '3', name: 'ProGamer99', wins: 0, losses: 0, totalScore: 0 }
]

export function getAllPlayers(): Player[] {
    return players;
}

export function calculateRating(player: Player): number {
    const totalGames: number = player. wins+ + player.losses;
    if (totalGames === 0) {
        return 0;
}
    const rating: number = (player.wins/ totalGames * 100) + (player.totalScore / totalGames)
    return Math.round(rating * 100) /100;
}