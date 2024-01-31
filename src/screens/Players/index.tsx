import { useState } from 'react'
import { FlatList } from 'react-native'

import { Container, Form, HeaderList, NumbersOfPalyers } from './styles'

import { ButtonIcon } from '@components/ButtonIcon'
import { Highlight } from '@components/Highlight'
import { Header } from '@components/Header'
import { Filter } from '@components/Filter'
import { Input } from '@components/Input'

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState(['Guilherme', 'Marina', 'Thiago'])

  return(
    <Container>
      <Header showBackButton/>

      <Highlight 
        title='Nome da turma'
        subtitle='adicione a galera e separe os times'
      />

      <Form>
        <Input 
          placeholder='Nome da pessoa' 
          autoCorrect={false}
        />

        <ButtonIcon 
          icon="add" 
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item}) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumbersOfPalyers>
          {players.length}
        </NumbersOfPalyers>

      </HeaderList>


      
    </Container>
  )
}