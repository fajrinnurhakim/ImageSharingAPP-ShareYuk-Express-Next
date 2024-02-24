import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const NavbarTop = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            icon: "success",
            title: "Success...",
            text: "Logout Account Successfully!",
        }).then(() => {
            Cookies.remove("token");
            navigate("/");
        });
    };

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <details class="dropdown">
                        <summary class="m-1 btn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </summary>
                        <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li>
                                <a href="/beranda">Beranda</a>
                            </li>
                            <li>
                                <a href="/dashboard">Dashboard</a>
                            </li>
                        </ul>
                    </details>
                </div>
                <div className="navbar-center">
                    <a className="text-xl btn btn-ghost">ShareYuk</a>
                </div>
                <div className="navbar-end">
                    <button
                        className="btn btn-primary me-2"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavbarTop;
