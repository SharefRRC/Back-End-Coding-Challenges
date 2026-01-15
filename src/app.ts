import express, { Express, Request, Response } from 'express';
import { getAllPlayers, getPlayerByID, calculateRating, Player } from './services/playerService';

const app: Express = express();
app.use(express.json());

app.get('/api/v1/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/v1/players', (req: Request, res: Response) => {
  const allPlayers = getAllPlayers();
  res.json({ players: allPlayers, count: allPlayers.length });
});

app.get('/api/v1/players/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id as string);
  const player: Player | null = getPlayerByID(id);
  if (!player) return res.status(404).json({ error: 'Player not found' });
  res.json(player);
});

app.get('/api/v1/players/:id/rating', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id as string);
  const player: Player | null = getPlayerByID(id);
  if (!player) return res.status(404).json({ error: 'Player not found' });
  const rating: number = calculateRating(player);
  const totalGames: number = player.wins + player.losses;
  res.json({ id: player.id, name: player.name, rating, totalGames });
});

export default app;