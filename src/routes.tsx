import { Routes, Route } from "react-router-dom";

import { PageNotFound } from "./pages/PageNotFound";

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<h1>Vite</h1>} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}