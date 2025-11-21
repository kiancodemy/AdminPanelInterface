import {Routes, Route} from "react-router-dom";
import LoginPage from "@/pages/LoginPage.tsx";
import Home from "@/components/home/Home.tsx"
//// all App routes
export default function AppRoutes() {
    return (
        <Routes>
            <Route>
                <Route path={"/"} element={<Home/>}>
                    <Route path={"category"} element={<h1>category</h1>}/>
                    <Route path={"image"} element={<h1>image</h1>}/>
                    <Route path={"user"} element={<h1>user</h1>}/>
                    <Route path={"role"} element={<h1>role</h1>}/>
                </Route>
            </Route>
            <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    );
}
