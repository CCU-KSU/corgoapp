import { createContext } from "react";

export const NavContext = createContext(null);

const NavBar = ({ children, baseUrl }) => {
    return (
        <>
            <NavContext.Provider value={{ baseUrl }}>
                <div className="navbar">
                    {children}
                </div>
            </NavContext.Provider>
        </>
    );
}
 
export default NavBar;