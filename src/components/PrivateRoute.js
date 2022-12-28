import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getIsLoggedIn } from "redux/auth/authSelector";

export default function PrivateRoute({
    children,
    redirectTo = '/',
    ...routeProps
}) {
    const isLoggedIn = useSelector(getIsLoggedIn);
    return (
        <div {...routeProps}>
            {isLoggedIn ? <div>{children}</div> : <Navigate to={redirectTo} />}
        </div>
    );
}