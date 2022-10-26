import { Button } from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { Container, Content, Icon } from "./styles";

export default function NewGroup() {
    const navigation = useNavigation();

    function handleNew(){
        navigation.navigate("players", { group: "Grupo 1"})
    }
    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight title="Nova turma" subtitle="Crie a turma para adicionar novas pessoas" />
                <Input placeholder="Nome da turma"/>
                <Button title="Criar" onPress={handleNew} />
            </Content>
        </Container>
    )

}