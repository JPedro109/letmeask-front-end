import { Routes, Route } from "react-router-dom";

import { PublicRoute } from "./components/PublicRoute";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PageNotFound } from "./pages/PageNotFound";
import { VerifyEmail } from "./pages/VerifyEmail";
import { ForgetPassword } from "./pages/ForgetPassword";
import { RecoverPassword } from "./pages/RecoverPassword";

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<PublicRoute />} >
                    <Route path="/" element={<Login />} />
                </Route>

                <Route path="/register" element={<PublicRoute />} >
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route path="/verify-email" element={<PublicRoute />} >
                    <Route path="/verify-email" element={<VerifyEmail />} />
                </Route>

                <Route path="/forget-password" element={<PublicRoute />} >
                    <Route path="/forget-password" element={<ForgetPassword />} />
                </Route>

                <Route path="/password-recover" element={<PublicRoute />} >
                    <Route path="/password-recover" element={<RecoverPassword />} />
                </Route>

                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}