import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import tabsPanelStyles from "./tabs-panel.module.css";
import React from 'react';

const TabsPanel = (props) => {
    const [current, setCurrent] = React.useState(props.currentId);
    return (
        <div className={tabsPanelStyles.tabsPanel} >
            {props.tabsInfo.map((item) => {
                console.log(item.id, current)
                return <Tab value={item.id} active={current === item.id} onClick={setCurrent}>
                    {item.text}
                </Tab>
            })}
        </div>
    )
}

export default TabsPanel;