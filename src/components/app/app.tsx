import { useEffect, FC } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { applyIngredients } from "../../services/actions/ingredients";

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { orderIdRequest } = useSelector((state: any) => state.order);
  const { ingredients } = useSelector((state: any) => state.ingredients);
  const background: any = location.state && location.state.background;

  useEffect(() => {
    !ingredients && dispatch(applyIngredients() as any);
  }, [dispatch, ingredients]);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <Routes location={background || location}>
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
          <Route path="/ingredients/:id" element={<IngredientsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {background && <Routes >
          <Route
            path="/ingredients/:id"
            element={<Modal label={"Детали ингредиента"}><IngredientDetails /></Modal>}
          />
          <Route
            path="/order"
            element={<ProtectedRouteElement background={background} element={<Modal canClose={!orderIdRequest} >< OrderDetails /></Modal>} />}
          />
          <Route path="*" element={null} />
        </Routes>}

      </main>
    </div>
  );
}
export default App;
