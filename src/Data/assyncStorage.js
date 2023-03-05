import AsyncStorage from "@react-native-async-storage/async-storage"

const saveData = async (id, data) => {
    const jsonValue = JSON.stringify(data)
    await AsyncStorage.setItem(id, jsonValue).then(() => {
        console.log('Dados salvos!')
    }).catch(err => {
        console.log('Erro ao salvar: ', err)
    })
}

const readData = async (id) => {
    return await AsyncStorage.getItem(id).then(data => {
        return data != null ? JSON.parse(data) : null 
    }).catch(err => {
        console.log('Erro ao carregar dados: ', err)
    })
}

export {
    readData,
    saveData
}