import { useState, useEffect } from "react";
import Logo from "../src/assets/images/lawsphere.png";
import "../styles/navbar.css";

function Navbar({ onNavigate, currentView }) {
    let [currstate, setstate] = useState("dark");

    useEffect(() => {
        if (currstate === "dark") {
            document.body.classList.remove("light-body");
            document.body.classList.add("dark-body");
        } else {
            document.body.classList.remove("dark-body");
            document.body.classList.add("light-body");
        }
    }, [currstate]);

    let classAdder = () => {
        if (currstate === "light") {
            setstate("dark");
        } else {
            setstate("light");
        }
    };

    const isHomePage = currentView === 'dashboard';
    const isDashboardPage =
        currentView === 'client-dashboard' ||
        currentView === 'lawfirm-dashboard' ||
        currentView === 'lawyer-dashboard' ||
        currentView === 'client-profile' ||
        currentView === 'lawfirm-profile' ||
        currentView === 'lawyer-profile';

    return (
        <div className={currstate === "dark" ? "darknavbox" : "lightnavbox"}>
            <div
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                onClick={() => onNavigate && onNavigate('dashboard')}
            >
                <img
                    id="company-logo"
                    src={Logo}
                    alt="LawSphere Logo"
                />
                <p style={{ fontWeight: 700, fontSize: '20px' }}>LawSphere</p>
            </div>

            <div>
                <button className="info" onClick={() => onNavigate && onNavigate('dashboard')}>Home</button>
                <button className="info">About</button>
            </div>

            <div className="nav-right-actions">
                {/* Sign Up button is visible ONLY on Home Page */}
                {isHomePage && (
                    <button
                        className="signup-nav-btn"
                        onClick={() => onNavigate && onNavigate('signup')}
                    >
                        Sign Up
                    </button>
                )}

                {/* Sign Out button when on dashboard pages */}
                {isDashboardPage && (
                    <button
                        className="signout-nav-btn"
                        onClick={() => {
                            alert("You have been signed out.");
                            onNavigate && onNavigate('dashboard');
                        }}
                    >
                        Sign Out
                    </button>
                )}

                <button
                    className="theme-nav-btn"
                    onClick={classAdder}
                >
                    {currstate === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
            </div>
        </div>
    );
}

export default Navbar;