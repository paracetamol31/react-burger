import { FC, useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import tabsPanelStyles from "./tabs-panel.module.css";
import { ITabInfo } from '../burger-ingredients/burger-ingredients';

interface IPropsTabsPanel {
    tabsInfo: Array<ITabInfo>
}

const TabsPanel: FC<IPropsTabsPanel> = ({ tabsInfo }) => {
    const { currentCategory } = useSelector((state: any) => state.ingredients);

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