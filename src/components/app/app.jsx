import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import AppHeader from "../app-header/app-header";
import { ConstructorPage } from "../../pages/constructor-page/constructor-page";
import appStyles from "./app.module.css";
import { LoginPage } from "../../pages/login-page/login-page";
import { RegistrationPage } from "../../pages/registration-page/registration-page";
import { ForgotPasswordPage } from "../../pages/forgot-password-page/forgot-password-page";
import { ResetPasswordPage } from "../../pages/reset-password-page/reset-password-page";
import { ProtectedRouteElement } from "../../components/protected-route/protected-route";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import { IngredientsPage } from "../../pages/ingredients-page/ingredients-page";
import { NotFaundPage } from "../../pages/not-faund-page/not-faund-page";

function App() {
  const { currentIngredient } = useSelector(state => state.ingredients);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <Routes>
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
          <Route
            path="/ingredients/:id"
            element={
              currentIngredient
                ? <ProtectedRouteElement element={<ConstructorPage />} />
                : <ProtectedRouteElement element={<IngredientsPage />} />
            } />
          <Route path="*" element={<NotFaundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
