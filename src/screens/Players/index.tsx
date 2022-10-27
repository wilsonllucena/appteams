import { Button } from "@components/Button";
import ButtonIcon from "@components/ButtonIcon";
import Filter from "@components/Filter";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Input from "@components/Input";
import ListEmpty from "@components/ListEmpty";
import PlayerCard from "@components/PlayerCard";
import { useRoute } from "@react-navigation/native";
import { playerAddBygroup } from "@storage/player/playerAddBygroup";
import { playerGetAllByGroup } from "@storage/player/playerGetAllByGroup";
import { AppError } from "@utils/AppError";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, FlatList } from "react-native";
import { groupHeadingCSS } from "react-select/dist/declarations/src/components/Group";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
    group: string
}

export default function Players() {
    const [newPlayerName, setNewPlayerName] = useState("");
    const [team, setTeam] = useState("Time A");
    const [players, setPlayers] = useState([]);
    const route = useRoute();
    const { group } = route.params as RouteParams;

    async function handleAddPlayer(){
        if(newPlayerName.trim().length === 0 ){
            return Alert.alert("Nova pessoa", "Informe o nome da pessoa upara adicionar.")
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }


        try {

            await playerAddBygroup(newPlayer, group);

            const players = await playerGetAllByGroup(group);

            console.log(players)
            
        } catch (error) {
            if(error instanceof AppError){
                Alert.alert("Nova pessoa", error.message)
            }else{
                console.log(error)
                Alert.alert("Nova pessoa", "Não foi possivel cadastrar essa pessoa")
            }

        }
    }


    return (
        <Container>
            <Header showBackButton />
            <Highlight
                title={group}
                subtitle="adicione a galera e separe os times"
            />
            <Form>
                <Input placeholder="Nome das pessoa" autoCorrect={false} onChangeText={setNewPlayerName}/>
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
            <FlatList
                data={players}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayerCard
                        name={item}
                        onRemove={() => { }}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty message='Não há pessoas neste time' />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1}
                ]}
            />

            <Button  title="Remover turma" type="SECONDARY"/>
        </Container>
    )
}