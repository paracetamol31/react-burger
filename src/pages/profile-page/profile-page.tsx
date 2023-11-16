import profilePageStyles from "./profile-page.module.css";
import { FC, useEffect } from "react";

import {
    setCurrentMenuHeader,
    userProfile
} from "../../services/actions/header";
import { useDispatch } from "../../services/hooks";
import { ProfilePanel } from "../../components/profile-panel/profile-panel";
import { Outlet } from "react-router-dom";

export const ProfilePage: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentMenuHeader({ currentMenuItem: userProfile }));
    }, [dispatch])

    return (
        <section className={profilePageStyles.pageWrapper}>
            <ProfilePanel />
            <Outlet />
        </section>
    )
}