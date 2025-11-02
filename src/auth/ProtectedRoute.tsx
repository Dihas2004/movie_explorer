import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, useEffect } from "react";


export default function ProtectedRoute(props : {children: ReactNode}){
    const {children} = props;
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    if (isLoading || !isAuthenticated) {
        return <p className="info-text">Loading authentication</p>;
    }

    return <>{children}</>;
};
