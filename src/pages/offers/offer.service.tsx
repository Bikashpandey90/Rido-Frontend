import HttpService from "@/services/http.service";

class OfferService extends HttpService {

    listAllOffers = async () => {
        try {
            const response = await this.getRequest('/offer/list-all-offers', { auth: true })
            return response.data

        } catch (exception) {
            throw exception
        }
    }

}
const offerSvc = new OfferService()
export default offerSvc
