import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"
import { Outlet } from "react-router-dom"

const HomePageLayout = () => {
    return (<>

        <div className="flex min-h-screen flex-col">

            <Header />

            <Outlet />


            <Footer />

        </div>
    </>)
}
export default HomePageLayout