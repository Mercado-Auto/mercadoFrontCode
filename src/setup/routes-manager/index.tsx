import React from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ValidateUserType from "src/components/ValidateUserType";
import GlobalContexts from "src/contexts/GlobalContexts";
import HorizontalLayout from "src/layouts/Horizontal";
import AuthBackground from "src/pages/AuthBackground";
import NotFound from "src/pages/NotFound";

import Login from "src/pages/Login";
import Logout from "src/pages/Logout";
import Recover from "src/pages/Recover";
import Register from "src/pages/Register";
import ResetPassword from "src/pages/ResetPassword";

import Perfil from "src/pages/Perfil";

import Cities from "src/pages/Cities";
import Dashboard from "src/pages/Dashboard";
import Products from "src/pages/Products";
import DetailsProduct from "src/pages/Products/DetailsProduct";
import Resellers from "src/pages/Resellers";
import DetailsReseller from "src/pages/Resellers/DetailsReseller";
import DetailsResellerProfile from "src/pages/Resellers/DetailsResellerProfile";
import TransactionsReseller from "src/pages/Resellers/TransactionsReseller";
import Sales from "src/pages/Sales";
import DetailsSale from "src/pages/Sales/DetailsSale";
import Sections from "src/pages/Sections";
import Tags from "src/pages/Tags";
import Users from "src/pages/Users";
import Payment from "src/pages/Payment";

import { UserType } from "src/api/auth";
import ValidateEmailConfirmation from "src/components/ValidateEmailConfirmation";
import ConfirmEmail from "src/pages/ConfirmEmail";
import RequireConfirmEmail from "src/pages/RequireConfirmEmail";
import { queryClient } from "src/queries";
import ResetPasswordByUser from "src/pages/ResetPasswordByUser";

const RoutesManager: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="confirm-email" element={<ConfirmEmail />} />

          <Route path="" element={<GlobalContexts useOutlet />}>
            <Route path="auth" element={<AuthBackground />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="recover" element={<Recover />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route
                path="reset-app-password"
                element={<ResetPasswordByUser />}
              />

              <Route path="logout" element={<Logout />} />
            </Route>

            <Route
              path="perfil"
              element={<ValidateEmailConfirmation element={Perfil} />}
            />
            <Route
              path="check-your-confirm-email"
              element={<RequireConfirmEmail />}
            />

            <Route
              path=""
              element={<ValidateEmailConfirmation element={HorizontalLayout} />}
            >
              <Route path="" element={<Dashboard />} />

              {/* SYSADMIN */}
              <>
                {/* USERS ROUTES */}
                <Route
                  path="users"
                  element={
                    <ValidateUserType
                      type={[UserType.SYSADMIN, UserType.RESELLER]}
                      element={Users}
                    />
                  }
                />
                {/* TAGS ROUTES */}
                <Route
                  path="tags"
                  element={
                    <ValidateUserType
                      type={[UserType.SYSADMIN, UserType.ADMIN]}
                      element={Tags}
                    />
                  }
                />
                {/* SECTIONS ROUTES */}
                <Route
                  path="sections"
                  element={
                    <ValidateUserType
                      type={[UserType.SYSADMIN, UserType.ADMIN]}
                      element={Sections}
                    />
                  }
                />
                {/* CITIES ROUTES */}
                <Route
                  path="cities"
                  element={
                    <ValidateUserType
                      type={[UserType.SYSADMIN, UserType.ADMIN]}
                      element={Cities}
                    />
                  }
                />
                {/* RESELLERS ROUTES */}
                <Route
                  path="resellers"
                  element={
                    <ValidateUserType
                      type={[UserType.SYSADMIN, UserType.ADMIN]}
                      element={Resellers}
                    />
                  }
                />
                <Route
                  path="resellers/:id"
                  element={
                    <ValidateUserType
                      type={[UserType.SYSADMIN, UserType.ADMIN]}
                      element={DetailsReseller}
                    />
                  }
                />
                {/* PAYMENT ROUTES */}
                <Route
                  path="payment"
                  element={
                    <ValidateUserType
                      type={[UserType.SYSADMIN, UserType.ADMIN]}
                      element={Payment}
                    />
                  }
                />
                {/* end/ SYSADMIN */}
              </>

              {/* RESELLER */}
              <>
                {/* MY DATA */}
                <Route
                  path="my-data"
                  element={
                    <ValidateUserType
                      type={UserType.RESELLER}
                      element={DetailsResellerProfile}
                    />
                  }
                />
                {/* end MY DATA */}

                {/* PRODUCTS ROUTES */}
                <Route
                  path="products"
                  element={
                    <ValidateUserType
                      type={UserType.RESELLER}
                      element={Products}
                    />
                  }
                />
                <Route
                  path="products/:id"
                  element={
                    <ValidateUserType
                      type={UserType.RESELLER}
                      element={DetailsProduct}
                    />
                  }
                />
                {/* end PRODUCTS ROUTES */}

                {/* SALES ROUTES */}
                <Route
                  path="sales"
                  element={
                    <ValidateUserType
                      type={[UserType.RESELLER, UserType.USER]}
                      element={Sales}
                    />
                  }
                />
                <Route
                  path="sales/:id"
                  element={
                    <ValidateUserType
                      type={[UserType.RESELLER, UserType.USER]}
                      element={DetailsSale}
                    />
                  }
                />
                {/* end SALES ROUTES */}

                {/* EXCHANGES ROUTES */}
                <Route
                  path="transactions"
                  element={
                    <ValidateUserType
                      type={UserType.RESELLER}
                      element={TransactionsReseller}
                    />
                  }
                />
                {/* end EXCHANGES ROUTES */}
              </>
              {/* end RESELLER */}
            </Route>
          </Route>
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default RoutesManager;
