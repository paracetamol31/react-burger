import AppHeader from "../components/app-header/app-header";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import appStyles from "./app.module.css";

function App() {
  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </main>
    </div>
  );
}

export default App;
