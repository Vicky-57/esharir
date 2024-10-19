import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { setUser } from '../slices/authSlice';

// Validation schema
const schema = z.object({
    email: z.string().email("This is not a valid email"),
    password: z.string().min(2, { message: 'Password is required' }),
});

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setLoginError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.email,
                    password: data.password,
                }),
            });

            const result = await response.json();

            if (response.ok && result.access) {
                Cookies.set('token', result.access, { expires: 7 });
                Cookies.set('user', JSON.stringify({ username: data.email }), { expires: 7 });

                dispatch(setUser({ username: data.email }));
                login({ username: data.email });

                navigate('/home');
            } else {
                setLoginError(result.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setLoginError('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="flex-1 flex flex-col items-center justify-center bg-white">
                <img src="/Login.png" alt="eSharirbook Illustration" className="h-full w-full object-fill" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 md:p-10">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">Welcome to <span className='text-teal-700'>eSharirbook</span></h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs md:max-w-sm">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input id="email" type="email" {...register('email')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input id="password" type="password" {...register('password')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                    {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                    <div className="mb-6">
                        <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            {loading ? 'Loading...' : 'Sign In'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="mt-4 text-sm">Don't have an account? <a onClick={() => navigate("/signup")} className="text-teal-500 cursor-pointer hover:underline">Sign Up</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
