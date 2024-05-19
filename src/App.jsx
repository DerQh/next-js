import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import AppLayout from "./ui/AppLayout";
import LogIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import User from "./pages/User";
import Deposit from "./pages/Deposit";

import Overview from "./pages/Overview";
import PaymentRequest from "./pages/PaymentRequest";
import Projects from "./pages/Projects";
import Groups from "./pages/Groups";
import Messages from "./pages/Messages";
import CreateGroup from "./pages/CreateGroup";
import Transaction from "./pages/Transaction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ProtectedRoutes from "./ui/ProtectedRoute";
import EditProfile from "./pages/EditProfile";
import EditGroup from "./pages/EditGroup";
import ApproveRequests from "./ui/ApproveRequests";
import Blogs from "./pages/Blogs";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 } },
});


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/resetpassword" element={<ForgotPassword />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="*" element={<PageNotFound />} />

            <Route
              path="/overview"
              element={
                <ProtectedRoutes>
                  <Overview />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/approvals"
              element={
                <ProtectedRoutes>
                  <ApproveRequests />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/group/edit"
              element={
                <ProtectedRoutes>
                  <EditGroup />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/updateprofile"
              element={
                <ProtectedRoutes>
                  <EditProfile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/group"
              element={
                <ProtectedRoutes>
                  <CreateGroup />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/blogs"
              element={
                <ProtectedRoutes>
                  <Blogs />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/paymentrequest"
              element={
                <ProtectedRoutes>
                  <PaymentRequest />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/group/overview"
              element={
                <ProtectedRoutes>
                  <Groups />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoutes>
                  <Transactions />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/transaction/:id"
              element={
                <ProtectedRoutes>
                  <Transaction />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/deposit"
              element={
                <ProtectedRoutes>
                  <Deposit />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/projects"
              element={
                <ProtectedRoutes>
                  <Projects />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoutes>
                  <Users />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoutes>
                  <User />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoutes>
                  <Messages />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoutes>
                  <Settings />
                </ProtectedRoutes>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  );
}
export default App;
