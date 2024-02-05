import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppError } from '@utils/AppError'

import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { playersGetByGroup } from './playersGetByGroup'

import { PlayerStorageDTO } from './PlayerStorageDTO'

export async function playAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    /*
      @ignite-teams:player-rocket: []
      @ignite-teams:player-amigos: []
      @ignite-teams:player-ignite: []
    */

    const storadPlayers = await playersGetByGroup(group)
    const playerAlreadyExist = storadPlayers.filter(player => player.name === newPlayer.name)

    if (playerAlreadyExist.length > 0) throw new AppError('Esta pessoa já está adicionada em um time aqui.')

    const storage = JSON.stringify([...storadPlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch(error) {
    throw(error)
  }
} 