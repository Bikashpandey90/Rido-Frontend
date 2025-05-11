import HttpService from "@/services/http.service";

class PaymentService extends HttpService {

    async makePaymentConfirmation(data: any, rideId: string) {
        try {
            const response = await this.postRequest('/ride/payment/' + rideId, data, { auth: true })
            return response.data;

        } catch (exception) {
            console.log(exception);
        }
    }
    async getAllPayments() {
        try {
            const response = await this.getRequest('/ride/list-payments', { auth: true })
            return response.data;

        } catch (exception) {
            console.log(exception);
        }
    }

}
const paymentSvc = new PaymentService()
export default paymentSvc;