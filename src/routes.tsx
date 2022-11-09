import { Routes, Route } from "react-router-dom";

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<h1>Vite</h1>} />
            </Routes>
        </>
    );
}