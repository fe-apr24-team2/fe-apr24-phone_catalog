import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage/HomePage.tsx';
import { PhonesPage } from './Pages/PhonePage/PhonePage.tsx';
import { PageNotFound } from './Pages/PageNotFound/PageNotFound.tsx';
import { AccessoriesPage } from './Pages/AccessoriesPage/AccessoriesPage.tsx';
import { TabletsPage } from './Pages/TabletsPage/TabletsPage.tsx';
import { Footer } from './components/Footer/Footer.tsx';
import { Header } from './components/Header/Header.tsx';
import './App.scss';
import { Cart } from './components/Cart/Cart.tsx';
import { CartProvider } from './utils/CartProvider.tsx';
import { BaseLayout } from './Pages/BaseLayout/BaseLayout.tsx';

export const App: React.FC = () => (
  <CartProvider>
    <Router>
      <div className="wrapper">
        <Header />
        <main className="content-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones/*" element={<BaseLayout />} />
            <Route path="/phones" element={<PhonesPage />} />
            <Route path="/tablets" element={<TabletsPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </CartProvider>
);
