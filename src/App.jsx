import { UserContextProvider } from "./contexts/UserContext";
import { Route, Routes, useLocation } from "react-router-dom";
import { ChatBox } from "./components/ChatBox";
import { LandingLayout } from "./Layout/LandingLayout";
import { AdminLayout } from "./Layout/AdminLayout";
import { HomeLayout } from "./Layout/HomeLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./router/ProtectedRoutes";
import Home from "./pages/Home";
import OrdersPrintSmall from "./pages/OrdersPrintSmall";
import OrdersPrint from "./pages/OrdersPrint";
import Orders from "./pages/Orders";
import OrdersCreate from "./pages/OrdersCreate";
import OrdersEdit from "./pages/OrdersEdit";
import Treasury from "./pages/Treasury";
import Products from "./pages/Products";
import ProductsCreate from "./pages/ProductsCreate";
import ProductsEdit from "./pages/ProductsEdit";
import Clientes from "./pages/Clientes";
import ClientsCreate from "./pages/ClientsCreate";
import ClientesEdit from "./pages/ClientesEdit";
import Suppliers from "./pages/Suppliers";
import SuppliersCreate from "./pages/SuppliersCreate";
import SuppliersEdit from "./pages/SuppliersEdit";
import Services from "./pages/Services";
import Stats from "./pages/Stats";
import OrdersStatus from "./pages/OrdersStatus";
import NoAuth from "./pages/NoAuth";
import Negocio from "./pagesAdmin/Negocio";
import Suscripcion from "./pagesAdmin/Suscripcion";
import Permisos from "./pagesAdmin/Permisos";
import Centros from "./pagesAdmin/Centros";
import Notificaciones from "./pagesAdmin/Notificaciones";
import Plantillas from "./pagesAdmin/Plantillas";
import MisDatos from "./pagesAdmin/MisDatos";
import Seguridad from "./pagesAdmin/Seguridad";
import { ROLES } from "./constants/ROLES";

const App = () => {
  const location = useLocation();

  // No renderizar chatbox si estamos imprimiendo
  const shouldRenderChatBox = !location.pathname.includes("print");
  return (
    <UserContextProvider>
      {/* Rutas Publicas */}

      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Rutas Privadas  */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[
                ROLES.ADMIN,
                ROLES.PROPIETARIO,
                ROLES.TECNICO,
                ROLES.DEPENDIENTE,
                ROLES.IMPAGADO,
              ]}
              redirect={"/"}
            />
          }
        >
          <Route path="home" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="orders">
              <Route index element={<Orders />} />
              <Route path="create" element={<OrdersCreate />} />
              <Route path="edit/:id" element={<OrdersEdit />} />
            </Route>
            <Route path="treasury">
              <Route index element={<Treasury />} />
            </Route>
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={[ROLES.PROPIETARIO, ROLES.TECNICO, ROLES.ADMIN]}
                  redirect={"/"}
                />
              }
            >
              <Route path="products">
                <Route index element={<Products />} />
                <Route path="create" element={<ProductsCreate />} />
                <Route path="edit/:id" element={<ProductsEdit />} />
              </Route>
              <Route path="clientes">
                <Route index element={<Clientes />} />
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
            </Route>

            {/* Ruta Super protegida  */}
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={[ROLES.PROPIETARIO, ROLES.ADMIN]}
                  redirect={"/"}
                />
              }
            >
              <Route path="stats">
                <Route index element={<Stats />} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Rutas protegida */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[
                ROLES.ADMIN,
                ROLES.PROPIETARIO,
                ROLES.TECNICO,
                ROLES.DEPENDIENTE,
                ROLES.IMPAGADO,
              ]}
            />
          }
        >
          <Route path="print/:id" element={<OrdersPrint />} />
          <Route path="print-simple/:id" element={<OrdersPrintSmall />} />
        </Route>

        {/* Ruta para clientes */}
        <Route path="order-status/:id" element={<OrdersStatus />} />
        <Route path="no-auth" element={<NoAuth />} />

        {/* Rutas Super protegidas */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[ROLES.PROPIETARIO, ROLES.IMPAGADO, ROLES.ADMIN]}
              redirect={"/"}
            />
          }
        >
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
        </Route>
      </Routes>

      {shouldRenderChatBox && <ChatBox />}
    </UserContextProvider>
  );
};

export default App;
