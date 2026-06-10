import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { logout } from "../../service/authApi";
import toast from "react-hot-toast";
import CreateUrlForm from "../../components/CreateUrlForm";
import { useEffect, useState } from "react";
import type { Url } from "../../types/url";
import { deleteUrl, getUrls } from "../../service/urlApi";
import { API_URL } from "../../config/env";

const Dashboard = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate()
    const clearUser = useAuthStore((state) => state.clearUser);

    const [urls, setUrls] = useState<Url[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchUrls = async () => {
        try {
            const data = await getUrls();
            setUrls(data)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        void fetchUrls();
    }, [])

    const handleDelete = async (id: string) => {
        try {
            await deleteUrl(id);

            toast.success("URL deleted successfully");

            await fetchUrls();
        } catch {
            toast.error("Failed to delete URL");
        }
    }
    const handleLogout = async () => {
        try {
            await logout();
            clearUser();
            toast.success("Logged out successfully");
            navigate("/login", { replace: true });
        } catch {
            toast.error("Logout failed");
        }
    }

    const handleCopy = async (shortCode: string) => {
        try {
            const shortUrl = `${API_URL}/${shortCode}`;

            await navigator.clipboard.writeText(shortUrl);

            toast.success("Copied to clipboard");
        } catch {
            toast.error("Failed to copy URL");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-600 hover:text-red-800"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Welcome Section */}
            <div className="border-b border-gray-200 bg-white px-4 py-6">
                <div className="mx-auto max-w-6xl">
                    <p className="text-gray-700">Welcome, {user?.name}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-6xl px-4 py-8">
                {/* URL Shortener Form */}
                <div className="mb-12">
                    <CreateUrlForm onUrlCreated={fetchUrls} />
                </div>

                {/* My URLs Section */}
                <div>
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">My URLs</h2>
                    {isLoading ? (
                        <p className="text-gray-500">Loading URLs...</p>
                    ) : urls.length === 0 ? (
                        <p className="text-gray-500">No URLs yet.
Create your first short URL above.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="border-b border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Original URL
                                        </th>
                                        <th className="border-b border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Short URL
                                        </th>
                                        <th className="border-b border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {urls.map((url) => (
                                        <tr key={url.id} className="border-b border-gray-200">
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {url.originalUrl}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <a
                                                    href={`${API_URL}/${url.shortCode}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    {url.shortCode}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleCopy(url.shortCode)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        Copy
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(url.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;