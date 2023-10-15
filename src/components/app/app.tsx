import { useEffect, FC } from "react";
import { Routes, Route, useLocation, Location } from "react-router-dom";

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
import { useDispatch, useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";
import { OrderFeedPage } from "../../pages/order-feed-page/order-feed-page";
import { UserProfileSetingsPage } from "../user-profile-setings-page/user-profile-setings-page";
import { OrderHistoryPage } from "../../pages/order-history-page/order-history-page";

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { orderIdRequest } = useSelector((state: RootState) => state.order);
  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  const background: Location = location.state && location.state.background;

  useEffect(() => {
    !ingredients && dispatch(applyIngredients());
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
          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} >
            <Route path="" element={<UserProfileSetingsPage />} />
            <Route path=":order" element={< OrderHistoryPage />} />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientsPage />} />
          <Route path="/feed" element={<OrderFeedPage />} />
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
