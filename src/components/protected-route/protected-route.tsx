import { FC, useEffect } from "react";
import { Navigate, useLocation, Location } from 'react-router-dom';

import { getUserInfo } from "../../services/actions/user";
import { setSavedLocation } from "../../services/actions/routing";
import { useDispatch, useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";

interface IPropsProtectedRouteElement {
    element: JSX.Element,
    background?: Location
}

export const ProtectedRouteElement: FC<IPropsProtectedRouteElement> = ({ element, background }) => {
    const dispatch = useDispatch();
    const { userInfo, isUserInfoLoaded } = useSelector((state: RootState) => state.user);
    const location: Location = useLocation();

    useEffect(() => {
        dispatch(getUserInfo());
        dispatch(setSavedLocation({ location: background || location }));
    }, [dispatch, location, background]);

    if (!isUserInfoLoaded) {
        return null
    }

    return userInfo ? element : <Navigate to="/login" replace />;
}