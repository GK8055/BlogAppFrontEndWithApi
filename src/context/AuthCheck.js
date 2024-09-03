// import React, { createContext, useContext, useState } from 'react';
// import Cookies from 'js-cookie';

// // Create an authentication context
// const AuthContext = createContext();

// // AuthProvider component to provide authentication state to the rest of the app
// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     const cookies=Cookies.get('jwt_token')

//     if (cookies!==undefined){
//         setIsAuthenticated(true);
//     }
//     return (
//         <AuthContext.Provider value={{ isAuthenticated }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//     return useContext(AuthContext);
// };