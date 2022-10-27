import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { playerGetAllByGroup } from "./playerGetAllByGroup";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerAddBygroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {

    const storadPlayers = await playerGetAllByGroup(group);

    const playerExist = storadPlayers.filter(player => player.name === newPlayer.name)

    if(playerExist.length > 0){
        throw new AppError("Essa pessoa ja esta adicionada neste time.")
    }

    const storage = JSON.stringify([...storadPlayers, newPlayer]);
    
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
