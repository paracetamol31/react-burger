import { FC, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, Location } from 'react-router-dom';

import { getUserInfo } from "../../services/actions/user";
import { setSavedLocation } from "../../services/actions/routing";

interface IPropsProtectedRouteElement {
    element: JSX.Element,
    background?: Location
}

export const ProtectedRouteElement: FC<IPropsProtectedRouteElement> = ({ element, background }) => {
    const dispatch = useDispatch();
    const { userInfo, isUserInfoLoaded } = useSelector((state: any) => state.user);
    const location: Location = useLocation();

    useEffect(() => {
        dispatch(getUserInfo() as any);
        dispatch(setSavedLocation({ location: background || location }));
    }, [dispatch, location, background]);

    if (!isUserInfoLoaded) {
        return null
    }

    return userInfo ? element : <Navigate to="/login" replace />;
}