import AsyncStorage from "@react-native-async-storage/async-storage";

const singleSetAsync = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error("SingleSetAsync", error);
    }
};

const singleGetAsync = async (data: string) => {
    try {
        const savedItem = await AsyncStorage.getItem(data);
        return savedItem
    } catch (error) {
        console.error("singleGetAsync", error);
    }
};

const singleMergeAsync = async (key: string, value: string) => {
    try {
        await AsyncStorage.mergeItem(key, value);
    } catch (error) {
        console.error("singleMergeAsync", error);
    }
};

const singleRemoveAsync = async (data: string) => {
    try {
        await AsyncStorage.removeItem(data);
    } catch (error) {
        console.error("singleRemoveAsync", error);
    }
};

const multiSetAsync = async (data: ReadonlyArray<readonly [string, string]>) => {
    try {
        await AsyncStorage.multiSet(data);
    } catch (error) {
        console.error("multiSetAsync", error);
    }
};



const multiRemoveAsync = async (data: readonly string[]) => {
    try {
        await AsyncStorage.multiRemove(data);
    } catch (error) {
        console.error("multiRemoveAsync", error);
    }
};

const multiGetAsync = async (data: readonly string[]) => {
    try {
        const savedData = await AsyncStorage.multiGet(data);
        return savedData
    } catch (error) {
        console.error("multigetError", error);
    }
};

const multiMergeAsync = async (data: [string, string][]) => {
    try {
        await AsyncStorage.multiMerge(data);
    } catch (error) {
        console.error("multiMergeAsync", error);
    }
};

export {
    singleSetAsync,
    singleGetAsync,
    singleMergeAsync,
    singleRemoveAsync,
    multiSetAsync,
    multiRemoveAsync,
    multiGetAsync,
    multiMergeAsync
}
