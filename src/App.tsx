import React from 'react';

import AppHeader from './components/app-header/app-header';
import PageMain from './components/page-main/page-main';
import PageTitle from './components/page-title/page-title';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

function App() {
  return (
    <>
      <AppHeader />
      <PageMain>
        <PageTitle />
        <BurgerIngredients />
      </PageMain>
    </>
  );
}

export default App;
