import HttpService from "@/services/http.service";

class ChatService extends HttpService {

    listAllUsers = async () => {
        try {
            const response = await this.getRequest('/chat/list-user', { auth: true })
            return response.data

        } catch (exception) {
            console.log(exception);
            throw exception
        }

    }
    getMessages = async (userId: string) => {
        try {
            const response = await this.getRequest(`/chat/detail/${userId}`, { auth: true })
            return response.data

        } catch (exception) {
            console.log(exception);
            throw exception
        }
    }
    sendMessage = async (data: any) => {
        try {
            const response = await this.postRequest('/chat/send', data, { auth: true })
            return response.data

        } catch (exception) {
            console.log(exception);
            throw exception

        }
    }

}

const chatSvc = new ChatService()
export default chatSvc