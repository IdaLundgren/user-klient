import axios from "axios";

const USER_API_BASE_URL = 'http://localhost:8080/api/users'

class UserService {
    async getAllUsers() {
        try {
            const response = await axios.get(USER_API_BASE_URL)
            return response
        } catch (error) {
            console.error("Error vid hämtning av användare", error)
        }
    }

    async createUser(user) {
        try {
            const response = await axios.post(USER_API_BASE_URL, user)
            return response
        } catch(error) {
            console.error("Error vid skapa en användare", error)
        }
    }
}

export default new UserService()