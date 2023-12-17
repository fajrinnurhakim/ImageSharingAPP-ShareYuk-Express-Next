import { useState } from "react";
import { Helmet } from "react-helmet";
import { loginUser } from "../../utils/fetch";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await loginUser(email, password);
            navigate("/beranda");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="pt-12">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login | ShareYuk</title>
            </Helmet>
            <div className="flex flex-col-reverse items-center justify-center lg:justify-between lg:flex-row">
                <div className="hidden lg:w-2/5 lg:inline">
                    <img src="/assets/Login.svg" alt="" />
                </div>

                <div className="items-center w-11/12 p-4 text-center shadow-lg shadow-teal-300 card md:w-3/5 md:mx-auto lg:w-2/5 lg:p-12">
                    <form
                        className="flex flex-col w-full space-y-3 lg:space-y-6"
                        onSubmit={handleLogin}
                    >
                        <h1 className="text-xl font-bold lg:text-4xl">Login</h1>
                        <img
                            src="/assets/logo.svg"
                            alt=""
                            className="w-32 mx-auto"
                        />

                        <div className="w-full form-control">
                            <label className="label" htmlFor="email">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                id="email"
                                placeholder="yourmail@mail.com"
                                className="w-full input input-bordered"
                                type={"text"}
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="w-full form-control">
                            <label className="label" htmlFor="password">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                id="password"
                                placeholder="Password"
                                className="w-full input input-bordered"
                                type={"password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength="8"
                                required
                            />
                        </div>

                        <div className="flex flex-col w-full pt-6 space-y-2 text-left">
                            <button type="submit" className="btn btn-secondary">
                                Login
                            </button>
                        </div>

                        <span>
                            Don`t have an account?
                            <a
                                href="/register"
                                className="font-bold text-secondary "
                            >
                                {" "}
                                Register
                            </a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
