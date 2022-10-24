import { TextInputProps } from "react-native";
import { Container } from "./styles";

type Props = {
    showIcon?: boolean;
}
export default function Input({...rest}: TextInputProps){
    return (
        <Container { ...rest} />
    )
}