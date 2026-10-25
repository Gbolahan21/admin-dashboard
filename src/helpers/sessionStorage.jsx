class SessionStorage {
    setSessionData = async (key, value) => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Failed to save session data:", error);
            throw error;
        }
    };

    getSessionData = async (key) => {
        try {
            const value = sessionStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error("Failed to get session data:", error);
            return null;
        }
    };

    removeSessionData = async (key) => {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error("Failed to remove session data:", error);
            throw error;
        }
    };
}

export default new SessionStorage()