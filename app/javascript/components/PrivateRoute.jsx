// // PrivateRoute.jsx
// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// // Function to check if the user is authenticated (e.g., check the token from local storage or cookie)
// const isAuthenticated = () => {
//   const token = localStorage.getItem("token");
//   return !!token; // Return true if the token exists, false otherwise
// };

// // PrivateRoute component to protect the route and redirect to the login page if the user is not authenticated
// const PrivateRoute = ({ element: Element, ...rest }) => {
//     return (
//       <Route
//         {...rest}
//         element={isAuthenticated() ? <Element /> : <Navigate to="/login" />}
//       />
//     );
//   };

// export default PrivateRoute;

