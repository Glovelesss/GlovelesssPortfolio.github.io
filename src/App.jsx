import { Outlet } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";

export default function App()
{
    const Location = useLocation();
    const IsProjectPage = Location.pathname.startsWith("/projects/");

    return (
        <div className="min-h-screen flex flex-col bg-(--bg) text-(--text)">
            {!IsProjectPage && (
                <header className="bg-(--surface) p-4 border-b border-(--bordercolor)">
                    <p className="text-center">Header placeholder</p>
                </header>
            )}

            <main className="flex-1 container mx-auto">
                <Outlet />
            </main>

            <footer className="bg-(--surface) p-4 border-t border-(--bordercolor)">
                <p className="text-center text-(--muted)">Footer placeholder</p>
            </footer>
        </div>
    );
}
