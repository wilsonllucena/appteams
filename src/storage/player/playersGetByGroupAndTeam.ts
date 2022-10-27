import { playerGetAllByGroup } from "./playerGetAllByGroup";

export async function playersGetByGroupAndTeam(group: string, team: string) {
      try {
        const storage = await playerGetAllByGroup(group);
        const players = storage.filter(player => player.team === team);
        return players;
      } catch (error) {
        throw error;
      }
}