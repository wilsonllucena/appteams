import ButtonIcon from "@components/ButtonIcon";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Input from "@components/Input";
import { Container, Form } from "./styles";

export default function Players() {
    return (
        <Container>
            <Header showBackButton />
            <Highlight
                title="Nome da turma"
                subtitle="adicione a galera e separe os times"
            />
            <Form>
                <Input placeholder="Nome das pessoa" autoCorrect={false} />
                <ButtonIcon icon="add" type="SECONDARY" />
            </Form>


        </Container>
    )
}