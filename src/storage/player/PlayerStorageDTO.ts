import AsyncStorage from "@react-native-async-storage/async-storage"
import { PLAYER_COLLECTION } from "@storage/storageConfig";

export type PlayerStorageDTO = {
    name: string;
    team: string
}
