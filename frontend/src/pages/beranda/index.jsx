import { useState, useEffect } from "react";
import NavbarTop from "../../components/NavbarTop";
import { getShares } from "../../utils/fetch";

const Beranda = () => {
    const [shares, setShares] = useState([]);

    useEffect(() => {
        const fetchShares = async () => {
            try {
                const shareData = await getShares();
                console.log(shareData);
                setShares(shareData);
            } catch (error) {
                console.error("Error fetching shares:", error);
            }
        };

        fetchShares();
    }, []);

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    const handleDownload = (imageUrl, imageName) => {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = imageName;
        link.click();
    };

    return (
        <div>
            <NavbarTop />
            {Array.isArray(shares.shares) && shares.shares.length > 0 ? (
                shares.shares.map((share) => (
                    <div
                        key={share.id}
                        className="m-5 shadow-xl card card-side bg-base-100"
                    >
                        <figure>
                            <img
                                src={`http://localhost:3000/${share.image}`}
                                alt="image"
                                className="w-24"
                            />
                        </figure>
                        <div className="card-body">
                            <p>{share.caption}</p>
                            <span>{formatDate(share.created_at)}</span>
                            <div className="justify-end card-actions">
                                <button
                                    onClick={() =>
                                        handleDownload(
                                            `http://localhost:3000/${share.image}`,
                                            share.image
                                        )
                                    }
                                    className="btn btn-secondary"
                                >
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No shares available.</p>
            )}
        </div>
    );
};

export default Beranda;
