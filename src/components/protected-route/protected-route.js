import { useEffect } from "react";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

import { getUserInfo } from "../../services/actions/user"

export const ProtectedRouteElement = ({ element }) => {
    const dispatch = useDispatch();
    const { userInfo, userInfoLoaded } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    if (!userInfoLoaded) {
        return null
    }

    return userInfo ? element : <Navigate to="/login" replace />;
}

ProtectedRouteElement.propTypes = {
    element: PropTypes.element
}