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
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-orange-600"></span>
      </div>
    );
  }

  return (
    <div className="app-shell min-h-screen">
      <div className="admin-shell">
        <div className="mb-6">
          <h1 className="admin-heading text-4xl font-bold text-slate-900">Update Problems</h1>
          <p className="admin-muted mt-3 text-lg text-slate-600">Select a problem to edit its details and test cases.</p>
        </div>

        {error && (
          <div className="alert alert-error shadow-lg my-4">
            <span>{error}</span>
          </div>
        )}

        <div className="admin-table-wrap overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-sm">
          <table className="admin-table table w-full">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="w-1/12 py-4">#</th>
                <th className="w-4/12">Title</th>
                <th className="w-2/12">Difficulty</th>
                <th className="w-3/12">Tags</th>
                <th className="w-2/12 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {problems.map((problem, index) => (
                <tr key={problem._id} className="hover:bg-slate-50 transition-colors">
                  <th className="py-4 font-bold text-slate-400">{index + 1}</th>
                  <td className="font-semibold text-slate-900">{problem.title}</td>
                  <td>
                    <span className={`badge font-semibold ${
                      problem.difficulty?.toLowerCase() === "easy"
                        ? "badge-success text-white"
                        : problem.difficulty?.toLowerCase() === "medium"
                        ? "badge-warning text-slate-900"
                        : "badge-error text-white"
                    }`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-outline text-slate-700 font-medium">
                      {problem.tags}
                    </span>
                  </td>
                  <td className="text-right pr-6">
                    <button
                      onClick={() => navigate(`/admin/update/${problem._id}`)}
                      className="btn btn-sm btn-warning font-bold rounded-xl text-slate-900"
                    >
                      Edit
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
