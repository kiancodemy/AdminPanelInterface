import { Outlet } from "react-router"
import Header from "@/components/home/Header.tsx";
export default function Home() {
    return (
        <div>
            <Header />

            <Outlet/>

        </div>
    );
}