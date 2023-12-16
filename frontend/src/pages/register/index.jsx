import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { registerUser } from "../../utils/fetch";

export default function Register() {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [isAgreed, setIsAgreed] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        setIsAgreed(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAgreed) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please agree to the Terms and Conditions",
                timer: 1500,
            });
            return;
        }

        try {
            const { name, email, password } = formData;

            const responseData = await registerUser(name, email, password);
            if (responseData) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="px-6 py-12 lg:px-12">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Register | ShareYuk</title>
            </Helmet>
            <div className="flex flex-col-reverse items-center justify-center lg:flex-row">
                <div className="hidden lg:w-2/5 lg:inline">
                    <img src="/assets/Register.svg" alt="" />
                </div>

                <div className="items-center w-full p-4 text-center shadow-lg shadow-cyan-300 card md:w-3/5 md:mx-auto lg:w-2/5 lg:p-12">
                    <div className="flex flex-col w-full space-y-3 lg:space-y-6">
                        <h1 className="text-xl font-bold lg:text-4xl">
                            Register
                        </h1>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-3 lg:space-y-6"
                        >
                            <div className="w-full form-control">
                                <label className="label" htmlFor="name">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="w-full input input-bordered"
                                    required
                                />
                            </div>

                            <div className="w-full form-control">
                                <label className="label" htmlFor="email">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="yourmail@mail.com"
                                    className="w-full input input-bordered"
                                    required
                                />
                            </div>

                            <div className="w-full form-control">
                                <label className="label" htmlFor="password">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Your password"
                                    className="w-full input input-bordered"
                                    minLength="8"
                                    required
                                />
                            </div>

                            <div className="w-full text-left form-control">
                                <label className="text-left" htmlFor="agree">
                                    <input
                                        id="agree"
                                        type="checkbox"
                                        name="agree"
                                        checked={isAgreed}
                                        onChange={handleCheckboxChange}
                                        className="checkbox-xs"
                                    />
                                    <span className="text-sm text-left">
                                        {" "}
                                        I agree to the Terms and Conditions
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full btn btn-secondary"
                            >
                                Register
                            </button>
                        </form>

                        <span>
                            Do you have an account?
                            <a href="/" className="font-bold text-secondary">
                                {" "}
                                Login
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
