import { TouchableOpacityProps } from "react-native";
import { Container, FiltersStyleProps, Title } from "./styles";

type Props = TouchableOpacityProps & FiltersStyleProps & {
    title: string
}
export default function Filter({ title, isActive = false , ...rest}: Props){
   return (
       <Container isActive={isActive} {...rest}>
           <Title>{title}</Title>
       </Container>
   )
}