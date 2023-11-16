import { FC, useEffect } from "react";
import { Navigate, useLocation, Location } from 'react-router-dom';

import { getUserInfo } from "../../services/actions/user";
import { setSavedLocation } from "../../services/actions/routing";
import { useDispatch, useSelector } from "../../services/hooks";

interface IPropsProtectedRouteElement {
    element: JSX.Element,
    background?: Location
}

export const ProtectedRouteElement: FC<IPropsProtectedRouteElement> = ({ element, background }) => {
    const dispatch = useDispatch();
    const { userInfo, isUserInfoLoaded } = useSelector(state=> state.user);
    const location: Location = useLocation();

    useEffect(() => {
        !userInfo && dispatch(getUserInfo());
        dispatch(setSavedLocation({ location: background || location }));
    }, [dispatch, location, background, userInfo]);

    if (!isUserInfoLoaded) {
        return null
    }

    return userInfo ? element : <Navigate to="/login" replace />;
}