import headerMenuitemStyles from "./header-menu-item.module.css";

const headerMenuItem = (Icon, isTarget = false) => (props) => {
    return (
        <div className={`${headerMenuitemStyles.link} ml-5 mt-4 mr-5 mb-4`} >
            <Icon type={isTarget ? "primary" : "secondary"} />
            <span className={`${!isTarget && "text_color_inactive"} text_type_main-default ml-2 `}>{props.text}</span>
        </div >
    )
}

export default headerMenuItem;