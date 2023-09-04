import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import AppHeader from "../app-header/app-header";
import { ConstructorPage } from "../../pages/constructor-page/constructor-page";
import appStyles from "./app.module.css";
import { applayIngredients } from "../../services/actions/ingredients";
import { LoginPage } from "../../pages/login-page/login-page";
import { RegistrationPage } from "../../pages/registration-page/registration-page";
import { PasswordRecoveryFirstPage } from "../../pages/password-recovery-first-page/password-recovery-first-page";
import { PasswordRecoverySecondPage } from "../../pages/password-recovery-second-page/password-recovery-second-page";
import { initStartRout } from "../../services/actions/app";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredients);
  const { isSelectedStartRout } = useSelector(state => state.app);

  React.useEffect(() => {
    dispatch(applayIngredients());
  }, [dispatch]);

  React.useEffect(() => {
    if (!isSelectedStartRout) {
      navigate("/registration");
      dispatch(initStartRout());
    }
  }, [navigate, dispatch, isSelectedStartRout]);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        {
          (!ingredientsRequest && !ingredientsFailed && ingredients && isSelectedStartRout)
          &&
          <Routes>
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/constructor" element={<ConstructorPage />} />
            <Route path="/passwordRecovery1" element={<PasswordRecoveryFirstPage />} />
            <Route path="/passwordRecovery2" element={<PasswordRecoverySecondPage />} />
          </Routes>
        }
        {
          ingredientsRequest
          &&
          <div className={appStyles.messageError}>
            <span className="text_type_main-default">{"Загрузка космических ингредиентов..."}</span>
          </div>

        }
        {
          ingredientsFailed
          && <div className={appStyles.messageError}>
            <span className="text_type_main-default">{"Ошибка загрузки космических ингредиентов :( "}</span>
          </div>
        }
      </main>
    </div>
  );
}

export default App;
