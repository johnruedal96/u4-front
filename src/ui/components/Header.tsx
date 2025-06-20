import { Link, useLocation } from "react-router";

export const Header = () => {
    const location = useLocation();

    const linkStyle = (path: string) =>
        `px-4 py-2 rounded-md font-medium transition-colors ${location.pathname === path
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`;

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-xl font-semibold text-blue-700">
                    Partidos UEFA
                </Link>

                <div className="flex gap-3">
                    <Link to="/" className={linkStyle("/")}>
                        Inicio
                    </Link>
                    <Link to="/matches/create" className={linkStyle("/matches/create")}>
                        Crear partido
                    </Link>
                    <Link to="/matches/upload" className={linkStyle("/matches/upload")}>
                        Carga múltiple
                    </Link>
                </div>
            </nav>
        </header>
    );
};