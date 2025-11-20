
import { Routes, Route } from "react-router-dom";
import LoginComponent from "@/components/Login/LoginComponent.tsx";
//// all App routes
export default function AppRoutes(){
    return (
        <Routes>
            <Route path="/">
                <Route index element={<LoginComponent/>} />
                <Route path="login" element={<h1>about</h1>} />
            </Route>

        </Routes>
    );
}
