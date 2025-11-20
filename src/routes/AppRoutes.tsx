
import { Routes, Route } from "react-router-dom";

//// all App routes
export default function AppRoutes(){
    return (
        <Routes>
            <Route path="/">
                <Route index element={<h1>home</h1>} />
                <Route path="login" element={<h1>about</h1>} />
            </Route>

        </Routes>
    );
}
