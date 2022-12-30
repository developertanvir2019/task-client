import { Spinner } from 'flowbite-react';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <Spinner aria-label="Large spinner example" size="lg" />
    }
    if (user && user.uid) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>
};

export default PrivateRouter;