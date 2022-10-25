import ButtonIcon from "@components/ButtonIcon";
import Filter from "@components/Filter";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Input from "@components/Input";
import { useState } from "react";
import { FlatList } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

export default function Players() {
    const [team, setTeam] = useState("Time A");
    const [players, setPlayers] = useState(["Time A"]);

    return (
        <Container>
            <Header showBackButton />
            <Highlight
                title="Nome da turma"
                subtitle="adicione a galera e separe os times"
            />
            <Form>
                <Input placeholder="Nome das pessoa" autoCorrect={false} />
                <ButtonIcon icon="add" />
            </Form>

            <HeaderList>
                <FlatList
                    data={["Time A", "Time B", "Time C"]}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item == team}
                            onPress={() => setTeam(team)}
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>{players.length}</NumberOfPlayers>
            </HeaderList>



        </Container>
    )
}