import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import {
    setCurrentMenuHeader,
    burgerConstructor
} from "../../services/actions/header";

export const ConstructorPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentMenuHeader(burgerConstructor))
    }, [dispatch])

    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
        </DndProvider>
    );
}