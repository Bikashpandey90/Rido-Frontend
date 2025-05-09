import HttpService from "@/services/http.service";

class RideService extends HttpService {
    getRides = async () => {
        try {
            const response = await this.getRequest('/ride/my-rides', { auth: true })
            return response.data

        } catch (exception) {
            throw exception
        }
    }
    getRideDetail = async (rideId: string) => {
        try {
            const response = await this.getRequest('/ride/' + rideId, { auth: true })
            return response.data

        } catch (exception) {
            throw exception
        }
    }

}
const rideSvc = new RideService()
export default rideSvc