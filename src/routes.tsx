import { Routes, Route } from "react-router-dom";

import { PublicRoute } from "./components/PublicRoute";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PageNotFound } from "./pages/PageNotFound";
import { VerifyEmail } from "./pages/VerifyEmail";

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

                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}