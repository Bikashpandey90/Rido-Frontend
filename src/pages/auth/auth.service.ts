import { AxiosCustomResponse } from "@/config/axios.config";
import HttpService from "@/services/http.service";

export interface UserType {
    name: string;
    email: string;
    role: string;
    _id: string
}

class AuthService extends HttpService {

    loginApi = async (data: { email: string, password: string }): Promise<UserType> => {

        try {
            const response: AxiosCustomResponse = await this.postRequest('/auth/login', data)

            localStorage.setItem('token', response.data.detail.accessToken)
            localStorage.setItem('refToken', response.data.detail.refreshToken)

            return response.data.detail.user;


        } catch (exception) {
            console.error(exception)
            throw exception
        }

    }

    RiderLoginApi = async (data: { email: string, password: string }): Promise<UserType> => {

        try {
            const response: AxiosCustomResponse = await this.postRequest('/auth/login-rider', data)

            localStorage.setItem('token', response.data.detail.accessToken)
            localStorage.setItem('refToken', response.data.detail.refreshToken)

            return response.data.detail.user;


        } catch (exception) {
            console.error(exception)
            throw exception
        }

    }

    registerApi = async (data: any) => {
        try {
            const response: AxiosCustomResponse = await this.postRequest('/auth/register', data, {
                file: true
            })
            return response.data;

        } catch (exception) {
            console.error(exception)
            throw exception
        }
    }
    registerRiderApi = async (data: any) => {
        try {
            const response: AxiosCustomResponse = await this.postRequest('/auth/register-rider', data, {
                file: true
            })
            return response.data;

        } catch (exception) {
            console.error(exception)
            throw exception
        }
    }


    activateUserAccount = async (data: any) => {
        try {
            const response = await this.postRequest('/auth/activate', data)
            return response.data

        } catch (exception) {
            console.error(exception)
        }
    }
    activateRiderAccount = async (data: any) => {
        try {
            const response = await this.postRequest('/auth/activate-rider', data)
            return response.data

        } catch (exception) {
            console.error(exception)
        }
    }
    updateStatus = async (data: any) => {
        try {

            const response = await this.patchRequest('/auth/update-ride-status-rider', data, { auth: true })
            return response.data

        } catch (exception) {
            console.error(exception)
        }
    }
    getUserDetails = async (id: string) => {
        try {
            const response = await this.getRequest('/auth/user-detail/' + id, { auth: true })
            return response.data

        } catch (exception) {
            console.error(exception)
        }
    }

}
const authSvc = new AuthService()
export default authSvc