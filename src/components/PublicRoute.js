import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getIsLoggedIn } from 'redux/auth/authSelector';

export default function PublicRoute({
    children,
    restricted = false,
    redirectTo = '/',
    ...routeProps
}) {
    const isLoggedIn = useSelector(getIsLoggedIn);
    const shouldRedirect = isLoggedIn && restricted;
    return (
        <div {...routeProps}>
            {shouldRedirect ? <Navigate to={redirectTo} /> : <div>{children}</div>}
        </div>
    );
}