import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:3000/login", {
            email,
            password,
        });

        if (!response.data.token) {
            throw new Error("Login failed");
        }

        const token = response.data.token;

        Cookies.set("token", token);

        Swal.fire({
            icon: "success",
            title: "Success...",
            text: "Login Account Successfully!",
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: `Error during login: ${error}`,
        });
    }
};

export const registerUser = async (name, email, password) => {
    try {
        const response = await axios.post("http://localhost:3000/register", {
            name,
            email,
            password,
        });
        Swal.fire({
            icon: "success",
            title: "Success...",
            text: "Register Account Successfully!",
        });
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: `Error during Registration: ${error}`,
        });
    }
};

export const getShares = async () => {
    const token = Cookies.get("token");
    try {
        const response = await axios.get("http://localhost:3000/shares", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: `Error while fetching shares: ${error}`,
        });
    }
};

export const getShareById = async (id) => {
    const token = Cookies.get("token");
    try {
        const response = await axios.get(`http://localhost:3000/shares/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: `Error while fetching share with ID ${id}: ${error}`,
        });
    }
};

export const createShare = async (caption, image) => {
    const token = Cookies.get("token");
    try {
        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("image", image);

        const response = await axios.post(
            "http://localhost:3000/shares",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        Swal.fire({
            icon: "success",
            title: "Success...",
            text: "Create Share Successfully!",
        });
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: `Error while creating share: ${error}`,
        });
    }
};

export const updateShare = async (id, caption, image) => {
    const token = Cookies.get("token");
    try {
        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("image", image);

        const response = await axios.put(
            `http://localhost:3000/shares/${id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        Swal.fire({
            icon: "success",
            title: "Success...",
            text: "Update Share Successfully!",
        });
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: `Error while updating share: ${error}`,
        });
    }
};

export const deleteShare = async (id) => {
    try {
        const token = Cookies.get("token");
        const response = await axios.delete(
            `http://localhost:3000/shares/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        Swal.fire({
            icon: "success",
            title: "Success...",
            text: "Delete Share Successfully!",
        });
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: `Error while Deleting share: ${error}`,
        });
    }
};
