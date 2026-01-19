import { useNotifications } from "@/components/notification/notification";
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const CTA = () => {

    const { addNotification } = useNotifications()


    return <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl/tight">
                        Ready to Experience RideX?
                    </h2>
                    <p className="max-w-[600px] text-white/80 text-base md:text-lg">
                        Download the app now and get your first ride free up to $15.
                    </p>
                </div>
                <div className="flex flex-col justify-center sm:flex-row gap-3 pt-4 w-full max-w-md">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="bg-white text-blue-600 hover:bg-white/90 w-full sm:w-auto"
                        onClick={() => addNotification("Test Notification")}
                    >
                        <Download className="mr-2 h-5 w-5" />
                        Download App
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="bg-white text-blue-600 hover:bg-white/90 w-full sm:w-auto"
                    >
                        Learn more
                    </Button>

                </div>
            </div>
        </div>
    </section >
}
export default CTA