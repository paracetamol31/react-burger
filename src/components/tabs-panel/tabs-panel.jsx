import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import tabsPanelStyles from "./tabs-panel.module.css";
import React from 'react';
import PropTypes from "prop-types";

const TabsPanel = (props) => {
    const [current, setCurrent] = React.useState(props.currentId);
    return (
        <div className={tabsPanelStyles.tabsPanel} >
            {props.tabsInfo.map((item) => {
                return <Tab key={item.id} value={item.id} active={current === item.id} onClick={setCurrent}>
                    {item.text}
                </Tab>
            })}
        </div>
    )
}

const tabsInfoTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
});

TabsPanel.propTypes = {
    tabsInfo: PropTypes.arrayOf(tabsInfoTypes).isRequired,
    currentId: PropTypes.number
}

export default TabsPanel;