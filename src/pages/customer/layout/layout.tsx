
import { Outlet } from "react-router-dom"

const CustomerPageLayout = () => {
    return (<>

        <div className="flex min-h-screen flex-col  ">
            <Outlet />
        </div>
    </>)
}
export default CustomerPageLayout