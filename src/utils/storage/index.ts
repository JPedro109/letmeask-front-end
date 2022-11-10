const addAuthStorage = (token: string): void => {
    const tokenExpiryTime = new Date().setHours(new Date().getHours() + 1).toString();
    localStorage.setItem("tokenLetmeask", token);
    localStorage.setItem("tokenExpiryTimeLetmeask", tokenExpiryTime);
}

const removeAuthStorage = (): void => {
    localStorage.removeItem("tokenLetmeask");
    localStorage.removeItem("tokenExpiryTimeLetmeask");
}

const getAuthStorage = (): { token: string | null, tokenExpiryTime: string | null } => {
    const token = localStorage.getItem("tokenLetmeask");
    const tokenExpiryTime = localStorage.getItem("tokenExpiryTimeLetmeask");

    return {
        token,
        tokenExpiryTime
    }
} 

export const storage = {
    addAuthStorage,
    removeAuthStorage,
    getAuthStorage
}