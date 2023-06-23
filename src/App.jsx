import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import LandingLayout from "./Layout/LandingLayout/LandingLayout";
import HomeLayout from "./Layout/HomeLayout/HomeLayout";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Clients from "./pages/Clientes";
import OrdersCreate from "./pages/OrdersCreate";
import OrdersEdit from "./pages/OrdersEdit";
import ProductsEdit from "./pages/ProductsEdit";
import ProductsCreate from "./pages/ProductsCreate";
import { UserContextProvider } from "./contexts/UserContext";
import Forgot from "./pages/Forgot";
import ResetPassword from "./pages/ResetPassword";
import ClientsCreate from "./pages/ClientsCreate";
import ClientesEdit from "./pages/clientesEdit";
import OrdersPrint from "./pages/OrdersPrint";
import OrdersStatus from "./pages/OrdersStatus";

import Suppliers from "./pages/Suppliers";
import SuppliersCreate from "./pages/SuppliersCreate";
import SuppliersEdit from "./pages/SuppliersEdit";
import Services from "./pages/Services";
import Stats from "./pages/Stats";
import AdminLayout from "./Layout/AdminLayout/AdminLayout";
import Admin from "./pages/Admin";
import MisDatos from "./pagesAdmin/MisDatos";
import Negocio from "./pagesAdmin/Negocio";
import Suscripcion from "./pagesAdmin/Suscripcion";
import Permisos from "./pagesAdmin/Permisos";
import Centros from "./pagesAdmin/Centros";
import Notificaciones from "./pagesAdmin/Notificaciones";
import Plantillas from "./pagesAdmin/Plantillas";
import Seguridad from "./pagesAdmin/Seguridad";
const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>
        <Route path="home" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="orders">
            <Route index element={<Orders />} />
            <Route path="create" element={<OrdersCreate />} />
            <Route path="edit/:id" element={<OrdersEdit />} />
          </Route>
          <Route path="products">
            <Route index element={<Products />} />
            <Route path="create" element={<ProductsCreate />} />
            <Route path="edit/:id" element={<ProductsEdit />} />
          </Route>
          <Route path="clientes">
            <Route index element={<Clients />} />
            <Route path="create" element={<ClientsCreate />} />
            <Route path="edit/:id" element={<ClientesEdit />} />
          </Route>
          <Route path="suppliers">
            <Route index element={<Suppliers />} />
            <Route path="create" element={<SuppliersCreate />} />
            <Route path="edit/:id" element={<SuppliersEdit />} />
          </Route>
          <Route path="services">
            <Route index element={<Services />} />
          </Route>
          <Route path="stats">
            <Route index element={<Stats />} />
          </Route>
        </Route>
        <Route path="print/:id" element={<OrdersPrint />} />
        <Route path="order-status/:id" element={<OrdersStatus />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Negocio />} />
          <Route path="suscripcion" element={<Suscripcion />} />
          <Route path="permisos" element={<Permisos />} />
          <Route path="centros" element={<Centros />} />
          <Route path="notificaciones" element={<Notificaciones />} />
          <Route path="plantillas" element={<Plantillas />} />
          <Route path="mis-datos" element={<MisDatos />} />
          <Route path="seguridad" element={<Seguridad />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
