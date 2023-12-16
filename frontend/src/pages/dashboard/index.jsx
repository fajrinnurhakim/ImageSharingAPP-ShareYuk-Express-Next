import { useState, useEffect } from "react";
import {
    getShares,
    createShare,
    updateShare,
    deleteShare,
    getSharess,
} from "../../utils/fetch";

const DashboardShare = () => {
    const [shares, setShares] = useState([]);
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchShares();
    }, []);

    const fetchShares = async () => {
        try {
            const responseData = await getSharess();
            if (Array.isArray(responseData.shares)) {
                setShares(responseData.shares);
            } else {
                console.error("Invalid data format received from the server.");
            }
        } catch (error) {
            console.error("Error fetching shares", error);
        }
    };

    const handleCreateShare = async () => {
        try {
            await createShare(caption, image);
            fetchShares();
        } catch (error) {
            console.error("Error creating share", error);
        }
    };

    const handleUpdateShare = async (id) => {
        try {
            await updateShare(id, caption, image);
            fetchShares();
        } catch (error) {
            console.error("Error updating share", error);
        }
    };

    const handleDeleteShare = async (id) => {
        try {
            await deleteShare(id);
            fetchShares();
        } catch (error) {
            console.error("Error deleting share", error);
        }
    };

    return (
        <div>
            <h1 className="mb-4 text-3xl font-bold">Share Dashboard</h1>
            <div className="p-4 mb-4 border border-gray-300 rounded">
                <h2 className="mb-2 text-xl font-bold">Create New Share</h2>
                <label className="block mb-2" htmlFor="caption">
                    Caption:
                    <input
                        type="text"
                        id="caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full p-2 border border-gray-300"
                    />
                </label>
                <label className="block mb-2" htmlFor="image">
                    Image:
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full p-2 border border-gray-300"
                    />
                </label>
                <button
                    onClick={handleCreateShare}
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                >
                    Create Share
                </button>
            </div>

            <div>
                <h2 className="mb-2 text-xl font-bold">Shares</h2>
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="p-2 border border-gray-300">ID</th>
                            <th className="p-2 border border-gray-300">
                                Caption
                            </th>
                            <th className="p-2 border border-gray-300">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {shares.map((share) => (
                            <tr key={share.id}>
                                <td className="p-2 border border-gray-300">
                                    {share.id}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {share.caption}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    <button
                                        onClick={() =>
                                            handleUpdateShare(share.id)
                                        }
                                        className="px-2 py-1 mr-2 text-white bg-green-500 rounded"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteShare(share.id)
                                        }
                                        className="px-2 py-1 text-white bg-red-500 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardShare;
