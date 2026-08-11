import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser } from '../authSlice';

const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak")
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth); // Removed error as it wasn't used

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="app-shell relative min-h-screen overflow-hidden px-4 py-8">
      <div className="hero-orb hero-orb-primary left-[12%] top-12 h-44 w-44" />
      <div className="hero-orb hero-orb-secondary right-[8%] bottom-12 h-64 w-64" />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel hidden rounded-[2rem] p-8 lg:block">
            <span className="section-kicker mb-5">Start Strong</span>
            <h1 className="section-title max-w-lg">
              Build your coding routine inside a workspace that feels intentional.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
              The app already has problem-solving, submissions, and admin flows wired up. This refresh keeps those flows untouched while giving the UI more character and clarity.
            </p>
          </div>

          <div className="glass-panel-strong mx-auto w-full max-w-md rounded-[2rem] p-2">
            <div className="rounded-[1.7rem] bg-white/70 p-8">
              <div className="mb-8 text-center">
                <span className="section-kicker mb-4">Create Account</span>
                <h2 className="card-title justify-center gap-3 text-4xl">
                  <span className="brand-mark">CP</span>
                  <span>Copilot</span>
                </h2>
                <p className="mt-3 text-sm text-slate-500">
                  Join and start solving with a cleaner frontend experience.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="field-label">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className={`input input-bordered h-13 w-full rounded-2xl ${errors.firstName ? 'input-error' : ''}`} 
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <span className="text-error text-sm mt-1">{errors.firstName.message}</span>
                  )}
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="field-label">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={`input input-bordered h-13 w-full rounded-2xl ${errors.emailId ? 'input-error' : ''}`}
                    {...register('emailId')}
                  />
                  {errors.emailId && (
                    <span className="text-error text-sm mt-1">{errors.emailId.message}</span>
                  )}
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="field-label">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`input input-bordered h-13 w-full rounded-2xl pr-10 ${errors.password ? 'input-error' : ''}`}
                      {...register('password')}
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-error text-sm mt-1">{errors.password.message}</span>
                  )}
                </div>

                <div className="form-control mt-8 flex justify-center"> 
                  <button
                    type="submit"
                    className={`btn btn-primary h-13 rounded-2xl text-base ${loading ? 'loading' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <span className="text-sm text-slate-500">
                  Already have an account?{' '}
                  <NavLink to="/login" className="font-semibold text-orange-600 transition hover:text-orange-700">
                    Login
                  </NavLink>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
