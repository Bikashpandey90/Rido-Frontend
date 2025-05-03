import HttpService from "@/services/http.service";

class MapsService extends HttpService {
    // async fetchSearchSuggestions(data: string) {
    //     try {


    //     } catch (exception) {
    //         console.log(exception)
    //         throw exception
    //     }
    // }

    async fetchSavedLocations() {
        try {
            const response = await this.getRequest('/misc/get-saved-address', { auth: true })
            return response.data
        } catch (exception) {

            throw exception
        }
    }

    async createRideRequest(data: any) {
        try {
            const response = await this.postRequest('/ride/request', data, { auth: true })
            return response.data

        } catch (exception) {
            throw exception
        }
    }

    async fetchRecentRidesLocations() {
        try {
            //todo-make this api in backend
            const response = await this.getRequest('/ride/recent-ride-locations', { auth: true })
            return response.data

        } catch (exception) {
            throw exception
        }
    }
    async updateRide(data: any) {
        try {
            const response = await this.patchRequest('/ride/update-ride-status', data, { auth: true })
            return response.data

        } catch (exception) {
            throw exception
        }
    }

    async fetchRecentRides() {
        try {
            const response = await this.getRequest('/ride/rides', { auth: true })
            return response.data

        } catch (exception) {
            throw exception
        }
    }

    async acceptRide(data: any) {
        try {
            const response = await this.patchRequest('/ride/accept-ride', data, { auth: true })
            return response.data

        } catch (exception) {
            throw exception
        }
    }

    async getRideDetail(rideId: string) {
        try {
            const response = await this.getRequest(`/ride/${rideId}`, { auth: true })
            return response.data

        }
        catch (exception) {
            throw exception
        }
    }
    async cancelRideRequest(rideId: string) {
        try {
            const response = await this.patchRequest(`/ride/cancel-ride/${rideId}`, { rideId }, { auth: true })
            return response.data

        } catch (exception) {
            throw exception
        }
    }
    async makePayment(rideId: string, method: string, amount: number) {
        try {

            const transactionCode = `${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;

            const response = await this.postRequest(`/ride/payment/${rideId}`, { method, amount, transactionCode }, { auth: true })
            return response.data

        } catch (exception) {
            throw exception
        }
    }








}

const mapsSvc = new MapsService()
export default mapsSvc;