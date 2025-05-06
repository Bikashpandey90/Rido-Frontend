
import { Outlet } from "react-router-dom"

const RiderPageLayout = () => {
    return (<>

        <div className="flex min-h-screen flex-col ">


            <Outlet />


        </div>
    </>)
}
export default RiderPageLayout