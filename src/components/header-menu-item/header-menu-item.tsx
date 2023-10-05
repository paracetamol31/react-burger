import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";
import headerMenuitemStyles from "./header-menu-item.module.css";
import { FC } from "react";

export interface IParamsHeaderMenuItem {
    Icon: ({ type }: TIconProps) => JSX.Element,
    isTarget?: boolean
};

export interface IPropsHeaderMenuItem {
    text: string
};

export type THeaderMenuItem = (params: IParamsHeaderMenuItem) => FC<IPropsHeaderMenuItem>;

const headerMenuItem: THeaderMenuItem = ({ Icon, isTarget }: IParamsHeaderMenuItem) => ({ text }: IPropsHeaderMenuItem) => {
    return (
        <div className={`${headerMenuitemStyles.link} pt-4 pb-4 mt-4 mb-4`} >
            <Icon type={isTarget ? "primary" : "secondary"} />
            <span className={`${!isTarget && "text_color_inactive"} text_type_main-default ml-2 `}>{text}</span>
        </div >
    )
}

export default headerMenuItem;