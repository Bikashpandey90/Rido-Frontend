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

    async acceptRide(rideId: string) {
        try {
            const response = await this.patchRequest('/ride/accept-ride', rideId, { auth: true })
            return response.data

        } catch (exception) {
            throw exception
        }
    }
    

    





}

const mapsSvc = new MapsService()
export default mapsSvc;