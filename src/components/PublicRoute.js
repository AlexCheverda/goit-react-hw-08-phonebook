import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getIsLoggedIn, getIsLoggedIn } from "redux/auth/authSelector";

export default function PublicRoute({
    children,
    restricted = false,
    redirectTo = '/',
    ...routeProps
}) {
    const getIsLoggedIn = useSelector(getIsLoggedIn);
    const shouldRedirect = isLoggedIn && restricted;
    return (
        <div {...routeProps}>
            {shouldRedirect ? <Navigate to={redirectTo} /> : <div>{children}</div>}
        </div>
    );
}