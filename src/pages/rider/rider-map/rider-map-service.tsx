import HttpService from "@/services/http.service";

class RiderMapService extends HttpService {

    fetchRecentRides = async (data: any) => {
        try {
            console.log("Submitting data for ride request : ", data)
            const response = await this.postRequest('/ride/rides', data, { auth: true })
            return response.data

        }
        catch (exception) {
            throw exception
        }
    }

}

const riderMapService = new RiderMapService();
export default riderMapService;