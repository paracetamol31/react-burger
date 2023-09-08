import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import AppHeader from "../app-header/app-header";
import { ConstructorPage } from "../../pages/constructor-page/constructor-page";
import appStyles from "./app.module.css";
import { applayIngredients } from "../../services/actions/ingredients";
import { LoginPage } from "../../pages/login-page/login-page";
import { RegistrationPage } from "../../pages/registration-page/registration-page";
import { ForgotPasswordPage } from "../../pages/forgot-password-page/forgot-password-page";
import { ResetPasswordPage } from "../../pages/reset-password-page/reset-password-page";
import { ProtectedRouteElement } from "../../components/protected-route/protected-route";
import { ProfilePage } from "../../pages/profile-page/profile-page";

function App() {
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredients);

  React.useEffect(() => {
    dispatch(applayIngredients());
  }, [dispatch]);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        {
          (!ingredientsRequest && !ingredientsFailed && ingredients)
          &&
          <Routes>
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRouteElement element={<ConstructorPage />} />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            <Route path="/resetPassword" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
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
