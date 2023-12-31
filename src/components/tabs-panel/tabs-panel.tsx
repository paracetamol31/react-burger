import { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import tabsPanelStyles from "./tabs-panel.module.css";
import { ITabInfo } from '../burger-ingredients/burger-ingredients';
import { useSelector } from '../../services/hooks';

interface IPropsTabsPanel {
    tabsInfo: Array<ITabInfo>
}

const TabsPanel: FC<IPropsTabsPanel> = ({ tabsInfo }) => {
    const { currentCategory } = useSelector(state => state.ingredients);

    return (
        <div className={tabsPanelStyles.tabsPanel} >
            {tabsInfo.map((item: ITabInfo) => {
                return (
                    <Tab
                        key={item.id}
                        value={String(item.id)}
                        active={currentCategory === item.id}
                        onClick={() => item.refCategory.current?.scrollIntoView()}>
                        {item.label}
                    </Tab>
                )
            })}
        </div>
    )
}

export default TabsPanel;