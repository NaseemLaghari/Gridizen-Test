import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, val) => {

    return new Promise(async(resolve, reject) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(val));
            resolve({
                status: 200,
                message: 'Token successfully set.'
            })
        } catch (e) {
            reject({
                status: 401,
                message: 'Error: Token not set inside async storage.',
                error: e
            })
        }
    });

}

export const getItem = (key) => {

    return new Promise ( async ( resolve , reject )=>{
        try {

            const val = await AsyncStorage.getItem(key);
            val != null && typeof val != 'object' 
            ?
                resolve({
                    status: 200,
                    data : JSON.parse(val)
                })
            :             
                reject({
                    status: 401,
                    error: 'Unable to find item',
                    
                })

        } catch (e) {

            
            reject({
                status: 401,
                message: 'Exception in get item',
                error: e
            })
        }
    });
    
}

export const removeItem = async (key) => {
    
    return new Promise(async(resolve, reject) => {
        try {
            
            await AsyncStorage.removeItem(key);
            resolve({
                status: 200,
                message: 'Token successfully removed.'
            })
        } catch (e) {
            reject({
                status: 404,
                message: 'Token removal failed!',
                error: e
            })
        }
    });
}

let clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // console.log('error in cleaning async storage.',e)
    }

    // console.log('Done.')
}
// clearAll();