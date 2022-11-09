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

                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}