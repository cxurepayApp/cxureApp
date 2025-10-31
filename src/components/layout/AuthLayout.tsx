import { Outlet } from "react-router-dom";
import AuthNavbar from "../AuthNavbar";

const AuthLayout = () => {
  return (
    <div>
        <div>
            <AuthNavbar/>
        </div>
         <div>
            <Outlet />
        </div>
    </div>
  )
}

export default AuthLayout