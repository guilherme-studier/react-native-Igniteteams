import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from '../storageConfig'
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroup: string) {
  try {
    const storageGroups = await groupsGetAll()

    const groupAreadyExists = storageGroups.includes(newGroup)

    if (groupAreadyExists) throw new AppError('Já existe um grupo cadastrado com este nome.')

    const storage = JSON.stringify([...storageGroups, newGroup])

    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch(error) {
    throw error
  }
}