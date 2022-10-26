import { Button } from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { useState } from "react";
import { Container, Content, Icon } from "./styles";

export default function NewGroup() {
    const [group, setGroup] = useState("")
    const navigation = useNavigation();

    async function handleNew(){
        await groupCreate(group)
        navigation.navigate("players", { group })
    }
    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight title="Nova turma" subtitle="Crie a turma para adicionar novas pessoas" />
                <Input placeholder="Nome da turma" onChangeText={setGroup}/>
                <Button title="Criar" onPress={handleNew} />
            </Content>
        </Container>
    )

}