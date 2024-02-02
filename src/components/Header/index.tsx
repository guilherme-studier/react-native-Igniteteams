import { Container, Logo, BackIcon, BackButton } from './styles'

import logoImg from '@assets/logo.png'

type Props = {
  showBackButton?: Boolean
}

export function Header({ showBackButton = false }: Props) {

  function handleGoBack() {

  }

  return(
    <Container>
      {
        showBackButton && 
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      }
      <Logo source={logoImg} />
    </Container>
  )
}