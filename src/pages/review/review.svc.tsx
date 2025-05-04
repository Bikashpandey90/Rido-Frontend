import HttpService from "@/services/http.service";

class ReviewService extends HttpService {

    createReview = async (data: any) => {
        try {
            const response = await this.postRequest('/review/create-review', data, { auth: true })
            return response.data
        } catch (exception) {
            console.error(exception)
            throw exception
        }
    }
    getReviews = async () => {
        try {
            const response = await this.getRequest('/review/user-reviews', { auth: true })
            return response.data
        } catch (exception) {
            console.error(exception)
            throw exception
        }
    }

}
const reviewSvc = new ReviewService();
export default reviewSvc;