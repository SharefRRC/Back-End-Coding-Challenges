import { getPlayerByID, calculateRating, Player } from '../src/services/playerService';

describe('Player Service', () => {
  test('Rating calculation - normal case with wins and losses', () => {
    // Arrange
    const player: Player = { id: 1, name: 'ShadowStrike', wins: 15, losses: 5, totalScore: 28500 };
    // Act
    const result = calculateRating(player);
    // Assert
    expect(result).toBe(1500);  // (15/20 * 100) = 75 + (28500/20) = 1425 = 1500.00
  });

  test('Rating - 0 games returns 0', () => {
    // Arrange
    const player: Player = { id: 3, name: 'ProGamer99', wins: 0, losses: 0, totalScore: 0 };
    // Act
    const result = calculateRating(player);
    // Assert
    expect(result).toBe(0);
  });

  test('Rating - only wins (rounding check)', () => {
    // Arrange
    const player: Player = { id: 99, name: 'AllWins', wins: 10, losses: 0, totalScore: 1234.567 };
    // Act
    const result = calculateRating(player);
    // Assert - 100 + 123.4567 = 223.46 (rounded to 2 decimals)
    expect(result).toBe(223.46);
  });

  test('Rating - rounding to 2 decimal places', () => {
    // Arrange
    const player: Player = { id: 88, name: 'RoundTest', wins: 1, losses: 3, totalScore: 100.123 };
    // Act
    const result = calculateRating(player);
    // Assert - (1/4*100)=25 + (100.123/4)=25.03075 = 50.03075 → 50.03
    expect(result).toBe(50.03);
  });

  test('getPlayerById - finding a player that exists', () => {
    // Arrange
    const id = 2;
    // Act
    const result = getPlayerByID(id);
    // Assert
    expect(result).not.toBeNull();
    expect(result!.name).toBe('NoobMaster');
  });

  test('getPlayerById - returning null for player that does not exist', () => {
    // Arrange
    const id = 999;
    // Act
    const result = getPlayerByID(id);
    // Assert
    expect(result).toBeNull();
  });
});
