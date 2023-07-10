import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Landing from "./pages/Landing";
import LandingLayout from "./Layout/LandingLayout/LandingLayout";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Forgot = lazy(() => import("./pages/Forgot"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Home = lazy(() => import("./pages/Home"));

const Orders = lazy(() => import("./pages/Orders"));
const Products = lazy(() => import("./pages/Products"));
const Clients = lazy(() => import("./pages/Clientes"));
const OrdersCreate = lazy(() => import("./pages/OrdersCreate"));
const OrdersEdit = lazy(() => import("./pages/OrdersEdit"));
const ProductsEdit = lazy(() => import("./pages/ProductsEdit"));
const ProductsCreate = lazy(() => import("./pages/ProductsCreate"));
const ClientsCreate = lazy(() => import("./pages/ClientsCreate"));
const ClientesEdit = lazy(() => import("./pages/ClientesEdit"));
const OrdersPrint = lazy(() => import("./pages/OrdersPrint"));
const OrdersStatus = lazy(() => import("./pages/OrdersStatus"));
const Suppliers = lazy(() => import("./pages/Suppliers"));
const SuppliersCreate = lazy(() => import("./pages/SuppliersCreate"));
const SuppliersEdit = lazy(() => import("./pages/SuppliersEdit"));
const Services = lazy(() => import("./pages/Services"));
const Stats = lazy(() => import("./pages/Stats"));

const MisDatos = lazy(() => import("./pagesAdmin/MisDatos"));
const Negocio = lazy(() => import("./pagesAdmin/Negocio"));
const Suscripcion = lazy(() => import("./pagesAdmin/Suscripcion"));
const Permisos = lazy(() => import("./pagesAdmin/Permisos"));
const Centros = lazy(() => import("./pagesAdmin/Centros"));
const Notificaciones = lazy(() => import("./pagesAdmin/Notificaciones"));
const Plantillas = lazy(() => import("./pagesAdmin/Plantillas"));
const Seguridad = lazy(() => import("./pagesAdmin/Seguridad"));
const ProtectedRoute = lazy(() => import("./router/ProtectedRoutes"));
const Treasury = lazy(() => import("./pages/Treasury"));
const NoAuth = lazy(() => import("./pages/NoAuth"));
const OrdersPrint2 = lazy(() => import("./pages/OrdersPrint2"));

import ChatBox from "./components/ChatBox/ChatBox";

import { UserContextProvider } from "./contexts/UserContext";
import HomeLayout from "./Layout/HomeLayout/HomeLayout";
import AdminLayout from "./Layout/AdminLayout/AdminLayout";

const App = () => {
  const location = useLocation();

  // No renderizar chatbox si estamos imprimiendo
  const shouldRenderChatBox = !location.pathname.includes("print");
  return (
    <UserContextProvider>
      {/* Rutas Publicas */}
      <Suspense>
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
            element={<ProtectedRoute allowedRoles={[1, 2, 3]} redirect={"/"} />}
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
                  <ProtectedRoute allowedRoles={[1, 2]} redirect={"/"} />
                }
              >
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
              </Route>

              {/* Ruta Super protegida  */}
              <Route
                element={<ProtectedRoute allowedRoles={[1]} redirect={"/"} />}
              >
                <Route path="stats">
                  <Route index element={<Stats />} />
                </Route>
              </Route>
            </Route>
          </Route>

          {/* Rutas protegida */}
          <Route element={<ProtectedRoute allowedRoles={[1, 2, 3]} />}>
            <Route path="print/:id" element={<OrdersPrint2 />} />
            <Route path="print-simple/:id" element={<OrdersPrint />} />
          </Route>

          {/* Ruta para clientes */}
          <Route path="order-status/:id" element={<OrdersStatus />} />
          <Route path="no-auth" element={<NoAuth />} />

          {/* Rutas Super protegidas */}
          <Route element={<ProtectedRoute allowedRoles={[1]} redirect={"/"} />}>
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
      </Suspense>
      {shouldRenderChatBox && <ChatBox />}
    </UserContextProvider>
  );
};

export default App;
