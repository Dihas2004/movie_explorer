import { useAuth0 } from "@auth0/auth0-react";

export default function NavBar(){
    const { isAuthenticated, logout } = useAuth0();

    return (
        <nav className="navbar">
            {isAuthenticated && (
                <div>
                    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};
