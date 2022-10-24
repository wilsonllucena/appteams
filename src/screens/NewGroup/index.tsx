import { Button } from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Input from "@components/Input";
import { Container, Content, Icon } from "./styles";

export default function NewGroup() {
    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight title="Nova turma" subtitle="Crie a turma para adicionar novas pessoas" />
                <Input placeholder="Nome da turma"/>
                <Button title="Criar" />
            </Content>
        </Container>
    )

}