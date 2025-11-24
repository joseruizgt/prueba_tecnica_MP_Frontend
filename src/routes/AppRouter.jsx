import { Route, Routes, } from "react-router-dom";
import { LoginPage } from "../app/auth/LoginPage";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoutesContainer } from "./PrivateRoutesContainer";


export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="login" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />

                <Route path="/*" element={
                    <PrivateRoutesContainer />
                } />

            </Routes >
        </>
    )
}
