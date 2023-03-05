const { readData, saveData } = require("../Data/assyncStorage")

const readPrimaryActivities = async () => {
    return await readData('primaryActivities')
}

const savePrimaryActivities = activities => {
    saveData('primaryActivities', activities)
}

const increasePrimaryActivity = id => {
    readPrimaryActivities().then(data => {
        const newData = data.map(value => {
            console.log(id == value.id ? { ...value, completeHours: value.completeHours + 1 } : { ...value })
            console.log(id, ' = ', value)

            return id == value.id ? { ...value, completeHours: value.completeHours + 1 } : { ...value }
        })
        savePrimaryActivities(newData)
    })
}

const decreasePrimaryActivity = id => {
    readPrimaryActivities().then(data => {
        const newData = data.map(value => {
            return id == value.id ? { ...value, completeHours: value.completeHours - 1 } : { ...value }
        })
        savePrimaryActivities(newData)
    })
}

const readSecundaryActivities = async () => {
    return await readData('secundaryActivities')
}

const saveSecundaryActivities = activities => {
    saveData('secundaryActivities', activities)
}

const increaseSecundaryActivity = id => {
    readSecundaryActivities().then(data => {
        const newData = data.map(value => {
            return id == value.id ? { ...value, completeHours: value.completeHours + 1 } : { ...value }
        })
        saveSecundaryActivities(newData)
    })
} 

const decreaseSecundaryActivity = id => {
    readSecundaryActivities().then(data => {
        const newData = data.map(value => {
            return id == value.id ? { ...value, completeHours: value.completeHours - 1 } : { ...value }
        })
        saveSecundaryActivities(newData)
    })
} 

const readTertiaryActivities = async () => {
    return await readData('tertiaryActivities')
}

const saveTertiaryActivities = activities => {
    saveData('tertiaryActivities', activities)
}

const increaseTertiaryActivity = id => {
    readTertiaryActivities().then(data => {
        const newData = data.map(value => {
            return id == value.id ? { ...value, completeHours: value.completeHours + 1 } : { ...value }
        })
        saveTertiaryActivities(newData)
    })
}

const decreaseTertiaryActivity = id => {
    readTertiaryActivities().then(data => {
        const newData = data.map(value => {
            return id == value.id ? { ...value, completeHours: value.completeHours - 1 } : { ...value }
        })
        saveTertiaryActivities(newData)
    })
}

const saveNewHistoryToday = (name, time) => {
    const today = new Date()
    let contains = false
    readHistoryToday().then(historyToday => {
        let newHistoryToday = historyToday
        newHistoryToday = historyToday.map(value => {

            if(value.name == name) { contains = true }

            return value.name == name ? { name: name, time: value.time + time} : { ...value }

        })

        if(!contains){ newHistoryToday.push({ name: name, time: time }) }

        saveData('historyToday', {
            date: today.getDay() + '/' + today.getDate() + '/' + today.getFullYear(),
            activities: [ ...newHistoryToday ]
        })
    })
}

const saveHistoryToday = async () => {
    const today = new Date()
    return await saveData('historyToday', {
        date: today.getDay() + '/' + today.getDate() + '/' + today.getFullYear(),
        activities: []
    })
}

const readHistoryToday = async () => {
    return await readData('historyToday')
}

const updateHistory = () => {
    readHistory().then(history => {
        let newHistory = history
        readHistoryToday().then(historyToday => {
            newHistory.push(historyToday)
        })
        saveHistory(newHistory)
    })
}

const saveHistory = history => {
    saveData('history', history)
}

const readHistory = async () => {
    return await readData('history')
}

const resetActivities = () => {
    readPrimaryActivities().then(data => {
        const newData = data.map(value => {
            return { ...value, completeHours: 0 }
        })
        savePrimaryActivities(newData)
    })
    readSecundaryActivities().then(data => {
        const newData = data.map(value => {
            return { ...value, completeHours: 0 }
        })
        saveSecundaryActivities(newData)
    })
    readTertiaryActivities().then(data => {
        const newData = data.map(value => {
            return { ...value, completeHours: 0 }
        })
        saveTertiaryActivities(newData)
    })
}

export {
    readPrimaryActivities,
    savePrimaryActivities,
    readSecundaryActivities,
    saveSecundaryActivities,
    readTertiaryActivities,
    saveTertiaryActivities,
    increasePrimaryActivity,
    increaseSecundaryActivity,
    increaseTertiaryActivity,
    decreasePrimaryActivity,
    decreaseSecundaryActivity,
    decreaseTertiaryActivity,
    resetActivities,
    saveNewHistoryToday
}