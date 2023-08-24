import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

import tabsPanelStyles from "./tabs-panel.module.css";

const TabsPanel = (props) => {
    const { currentCategory } = useSelector(state => state.ingredients);
    return (
        <div className={tabsPanelStyles.tabsPanel} >
            {props.tabsInfo.map((item) => {
                return <Tab key={item.id} value={item.id} active={currentCategory === item.id} >
                    {item.label}
                </Tab>
            })}
        </div>
    )
}

const tabsInfoTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
});

TabsPanel.propTypes = {
    tabsInfo: PropTypes.arrayOf(tabsInfoTypes).isRequired,
    currentId: PropTypes.number
}

export default TabsPanel;