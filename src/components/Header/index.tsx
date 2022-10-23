import { Container, Logo, BackIcon, BackButton } from "./styles";
import logoImg from '@assets/logo.png'
type Props = {
    showBackButton?: boolean
}
export default function Header({ showBackButton }: Props) {
    return (
        <>
            <Container>

                {
                    showBackButton && (
                        <BackButton>
                            <BackIcon />
                        </BackButton>
                    )
                }

                <Logo source={logoImg} />
            </Container>
        </>
    )
}