import { useState, useEffect, useRef } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { playAddByGroup } from '@storage/player/playerAddByGroup'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'

import { Container, Form, HeaderList, NumbersOfPalyers } from './styles'

import { PlayerCard } from '@components/PlayerCard'
import { ButtonIcon } from '@components/ButtonIcon'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { Header } from '@components/Header'
import { Filter } from '@components/Filter'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { AppError } from '@utils/AppError'

type RouteParams = {
  group: string
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar')

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playAddByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur()

      setNewPlayerName('')
      fetchPlayersByTeam()

    } catch(error) {
      if (error instanceof AppError) Alert.alert('Nova pessoa', error.message)
      else {
        console.log(error)
        Alert.alert('Nova pessoa', 'Não foi possível adicionar')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch(error) {
      console.log(error)
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado')
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()

    } catch(error) {
      console.log(error)
      Alert.alert('Remover pessoa', 'Não foi possível remover esta pessoa')
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])


  return(
    <Container>
      <Header showBackButton/>

      <Highlight 
        title={group}
        subtitle='adicione a galera e separe os times'
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder='Nome da pessoa' 
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />

        <ButtonIcon 
          icon="add"
          onPress={handleAddPlayer} 
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

      <FlatList 
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty
            message='Não há pessoas neste time.'
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1}
        ]}
      />

      <Button 
        title='Remover Turma'
        type='SECONDARY'
      />
      
    </Container>
  )
}