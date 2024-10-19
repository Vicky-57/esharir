import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useState } from 'react';
import axios from 'axios';

const schema = z.object({
    username: z.string().min(2, { message: 'Username is required' }),
    email: z.string().email("This is not a valid email"),
    password: z.string().min(2, { message: 'Password is required' }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Password and Confirm Password do not match",
    path: ["confirmPassword"],
});

function Signup() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/signup/', {
                username: data.username,
                password: data.password,
                email: data.email,
            });

            console.log('Signup successful:', response.data);
            navigate('/home');  // Redirect on successful signup
        } catch (error) {
            console.error('Signup error:', error.response?.data || error.message);
            setErrorMessage(error.response?.data?.detail || 'Signup failed. Please check your inputs.');
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="flex-1 flex flex-col items-center justify-center bg-white">
                <img src="/Login.png" alt="Ayurvedic Audiobook Illustration" className="h-full w-full object-fill" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 md:p-10">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">Create your <span className='text-teal-700'>eSharirbook</span> Account</h1>
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs md:max-w-sm">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input id="username" type="text" {...register('username')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                    </div>
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
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input id="confirmPassword" type="password" {...register('confirmPassword')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                    </div>
                    <div className="mb-6">
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">Sign up</button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="mt-4 text-sm">Already have an account? <a onClick={() => navigate("/login")} className="text-teal-500 cursor-pointer hover:underline">Sign In</a></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
