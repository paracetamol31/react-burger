import { useEffect } from "react";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';

import { getUserInfo } from "../../services/actions/user";
import { setSavedPathname } from "../../services/actions/routing";

export const ProtectedRouteElement = ({ element }) => {
    const dispatch = useDispatch();
    const { userInfo, isUserInfoLoaded } = useSelector(state => state.user);
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch(getUserInfo());
        dispatch(setSavedPathname(pathname));
    }, [dispatch, pathname]);

    if (!isUserInfoLoaded) {
        return null
    }

    return userInfo ? element : <Navigate to="/login" replace />;
}

ProtectedRouteElement.propTypes = {
    element: PropTypes.element
}