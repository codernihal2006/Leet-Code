import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router";

const AdminUpdate = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            setLoading(true);
            const { data } = await axiosClient.get("/problem/getAllProblem");
            setProblems(data);
        } catch (err) {
            setError("Failed to fetch problems");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <span className="loading loading-spinner loading-lg text-orange-600"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Update Problems</h1>
                        <p className="mt-1 text-sm text-slate-600">Select a problem to modify its title, difficulty, test cases, or starter code.</p>
                    </div>
                </div>

                {error && (
                    <div className="alert alert-error mb-6 shadow-sm">
                        <span>{error}</span>
                    </div>
                )}

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <table className="table w-full">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-600">
                                <th className="py-4 pl-6">#</th>
                                <th>Title</th>
                                <th>Difficulty</th>
                                <th>Tags</th>
                                <th className="text-right pr-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                            {problems.map((problem, index) => (
                                <tr key={problem._id} className="transition-colors hover:bg-slate-50">
                                    <td className="py-4 pl-6 font-bold text-slate-400">{index + 1}</td>
                                    <td className="font-semibold text-slate-900">{problem.title}</td>
                                    <td>
                                        <span className={`badge badge-sm font-semibold ${
                                            problem.difficulty?.toLowerCase() === "easy"
                                                ? "bg-emerald-100 text-emerald-800 border-0"
                                                : problem.difficulty?.toLowerCase() === "medium"
                                                ? "bg-amber-100 text-amber-800 border-0"
                                                : "bg-rose-100 text-rose-800 border-0"
                                        }`}>
                                            {problem.difficulty}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="badge badge-outline badge-sm text-slate-600">
                                            {problem.tags}
                                        </span>
                                    </td>
                                    <td className="text-right pr-6">
                                        <button
                                            onClick={() => navigate(`/admin/update/${problem._id}`)}
                                            className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold border-0 rounded-xl"
                                        >
                                            Edit Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUpdate;
