import { useRef, useEffect, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { playerAddBygroup } from "@storage/player/playerAddBygroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { AppError } from "@utils/AppError";

import { Button } from "@components/Button";
import ButtonIcon from "@components/ButtonIcon";
import Filter from "@components/Filter";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Input from "@components/Input";
import ListEmpty from "@components/ListEmpty";
import PlayerCard from "@components/PlayerCard";


import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import Loading from "@components/Loading";

type RouteParams = {
    group: string
}

export default function Players() {
    const newPlayerNameInputRef = useRef<TextInput>(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [newPlayerName, setNewPlayerName] = useState("");
    const [team, setTeam] = useState("Time A");
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const route = useRoute();
    const { group } = route.params as RouteParams;
    const navigation = useNavigation();

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert("Nova pessoa", "Informe o nome da pessoa upara adicionar.")
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }

        try {
            await playerAddBygroup(newPlayer, group);
            newPlayerNameInputRef.current?.blur();
            setNewPlayerName("");
            fetchPlayersByTeam()
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Nova pessoa", error.message)
            } else {
                console.log(error)
                Alert.alert("Nova pessoa", "N??o foi possivel cadastrar essa pessoa")
            }
        }
    }

    async function fetchPlayersByTeam(){
        try {
            setIsLoading(true);
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
            // setIsLoading(false);
        } catch (error) {
            console.log(error)
            Alert.alert("Pessoa", "N??o foi possivel carregar as pessoas do time selecionado")
        } finally {
            setIsLoading(false);
        }
    }

    async function handlePlayerRemove(playerName: string){
        try {
            await playerRemoveByGroup(playerName, group)
            fetchPlayersByTeam()
        } catch (error) {
            Alert.alert("Pessoa", "N??o foi possivel remover essa pessoa")
        }
    }

    async function groupRemove(){
        try {
            await groupRemoveByName(group);
            navigation.navigate("groups");
        } catch (error) {
            Alert.alert("Remover grupo", "N??o foi possivel remover o grupo.")
        }
    }
    async function handleGroupRemove(group:string) {
        Alert.alert(
            "Remover", 
            "Deseja remover a turma?", 
            [
                { text: "N??o", style: "cancel"},
                { text: "Sim", onPress: () => groupRemove()},
            ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam();
    },[team])


    return (
        <Container>
            <Header showBackButton />
            <Highlight
                title={group}
                subtitle="adicione a galera e separe os times"
            />
            <Form>
                <Input 
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome das pessoa" 
                    autoCorrect={false} 
                    onChangeText={setNewPlayerName} 
                    value={newPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon icon="add" onPress={handleAddPlayer} />
            </Form>

            <HeaderList>
                <FlatList
                    data={["Time A", "Time B"]}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item == team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>{players.length}</NumberOfPlayers>
            </HeaderList>
            {
                isLoading ? <Loading /> : (
                    <FlatList
                        data={players}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <PlayerCard
                                name={item.name}
                                onRemove={() => handlePlayerRemove(item.name)}
                            />
                        )}
                        ListEmptyComponent={() => (
                            <ListEmpty message='N??o h?? pessoas neste time' />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[
                            { paddingBottom: 100 },
                            players.length === 0 && { flex: 1 }
                        ]}
                    />
                )
            }
      

            <Button 
                title="Remover turma" 
                type="SECONDARY" 
                onPress={() => handleGroupRemove(group)}
            />
        </Container>
    )
}