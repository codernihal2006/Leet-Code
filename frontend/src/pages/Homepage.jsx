import { useEffect, useState } from 'react';
import { NavLink } from 'react-router'; // Fixed import
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all' 
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]); // Clear solved problems on logout
  };

  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const statusMatch = filters.status === 'all' || 
                      solvedProblems.some(sp => sp._id === problem._id);
    return difficultyMatch && tagMatch && statusMatch;
  });

  return (
    <div className="app-shell min-h-screen px-4 py-4">
      <nav className="glass-panel-strong navbar relative z-30 mx-auto max-w-7xl overflow-visible rounded-[2rem] px-5 shadow-xl">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost gap-3 rounded-2xl px-2 text-xl normal-case hover:bg-transparent">
            <span className="brand-mark">CP</span>
            <span>Copilot</span>
          </NavLink>
        </div>
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end relative z-40">
            <div tabIndex={0} className="btn btn-ghost rounded-2xl border border-slate-200/80 bg-white/70 px-4 hover:bg-white">
              {user?.firstName}
            </div>
            <ul className="dropdown-menu-clean dropdown-content absolute right-0 top-full z-50 mt-3 w-52 rounded-3xl p-2 shadow-2xl">
              <li><button onClick={handleLogout}>Logout</button></li>
              {user.role=='admin'&&<li><NavLink to="/admin">Admin</NavLink></li>}
            </ul>
          </div>
        </div>
      </nav>

      <div className="mx-auto mt-6 max-w-7xl">
        <div className="challenge-hero mb-8">
          <div className="glass-panel rounded-[2rem] p-8">
            <span className="section-kicker mb-5">Daily Problem Set</span>
            <h1 className="section-title max-w-2xl">
              A focused challenge board for deliberate practice.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Filter quickly, track solved work, and jump into the workspace without noise or clutter.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="glass-panel rounded-[2rem] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Problems</p>
              <p className="mt-3 text-4xl font-bold">{problems.length}</p>
            </div>
            <div className="glass-panel rounded-[2rem] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Solved</p>
              <p className="mt-3 text-4xl font-bold">{solvedProblems.length}</p>
            </div>
            <div className="glass-panel rounded-[2rem] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Focus</p>
              <p className="mt-3 text-lg font-bold">Arrays to DP</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-5">
          <div className="mb-3 flex flex-wrap gap-4">
          <select 
            className="select select-bordered rounded-2xl"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All Problems</option>
            <option value="solved">Solved Problems</option>
          </select>

          <select 
            className="select select-bordered rounded-2xl"
            value={filters.difficulty}
            onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select 
            className="select select-bordered rounded-2xl"
            value={filters.tag}
            onChange={(e) => setFilters({...filters, tag: e.target.value})}
          >
            <option value="all">All Tags</option>
            <option value="array">Array</option>
            <option value="linkedList">Linked List</option>
            <option value="graph">Graph</option>
            <option value="dp">DP</option>
          </select>
        </div>
        </div>

        <div className="mt-6 grid gap-5">
          {filteredProblems.map(problem => (
            <div key={problem._id} className="glass-panel card rounded-[2rem] border-0 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl">
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <h2 className="card-title text-[1.15rem]">
                    <NavLink to={`/problem/${problem._id}`} className="transition hover:text-orange-600">
                      {problem.title}
                    </NavLink>
                  </h2>
                  {solvedProblems.some(sp => sp._id === problem._id) && (
                    <div className="badge badge-success gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Solved
                    </div>
                  )}
                </div>
                
                <div className="mt-3 flex gap-2">
                  <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </div>
                  <div className="badge badge-info">
                    {problem.tags}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const getDifficultyBadgeColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'badge-success';
    case 'medium': return 'badge-warning';
    case 'hard': return 'badge-error';
    default: return 'badge-neutral';
  }
};

export default Homepage;
