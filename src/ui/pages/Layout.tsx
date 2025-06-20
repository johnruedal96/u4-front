import { Header } from "@/ui/components/Header";
import { Outlet } from "react-router";

export const Layout = () => {
    return (
        <>
            <Header />
            <main className="max-w-full mx-auto px-4 py-6">
                <Outlet />
            </main>
        </>
    );
};