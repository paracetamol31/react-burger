import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";
import menuitemStyles from "./menu-item.module.css";
import { FC } from "react";

export interface IParamsMenuItem {
    Icon?: ({ type }: TIconProps) => JSX.Element,
    isTarget?: boolean
};

export interface IPropsMenuItem {
    text: string,
    extraClass?: string
};

export type TMenuItem = (params: IParamsMenuItem) => FC<IPropsMenuItem>;

const menuItem: TMenuItem = ({ Icon, isTarget }: IParamsMenuItem) => ({ text, extraClass }: IPropsMenuItem) => {
    return (
        <div className={`${menuitemStyles.link} pt-4 pb-4 mt-4 mb-4`} >
            {Icon && <Icon type={isTarget ? "primary" : "secondary"} />}
            <span className={`${!isTarget && "text_color_inactive"} ${extraClass || "text_type_main-default"}  ml-2 `}>{text}</span>
        </div >
    )
}

export default menuItem;