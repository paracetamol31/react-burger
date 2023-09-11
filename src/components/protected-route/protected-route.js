import { useEffect } from "react";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';

import { getUserInfo } from "../../services/actions/user";
import { setSavedLocation } from "../../services/actions/routing";

export const ProtectedRouteElement = ({ element, background }) => {
    const dispatch = useDispatch();
    const { userInfo, isUserInfoLoaded } = useSelector(state => state.user);
    const location = useLocation();

    useEffect(() => {
        dispatch(getUserInfo());
        dispatch(setSavedLocation(background || location));
    }, [dispatch, location, background]);

    if (!isUserInfoLoaded) {
        return null
    }

    return userInfo ? element : <Navigate to="/login" replace />;
}

ProtectedRouteElement.propTypes = {
    background: PropTypes.object,
    element: PropTypes.element
}