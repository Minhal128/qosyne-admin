import React, { useState } from 'react';
import AuthImage from '../../assets/illustration.png';
import Logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import toast from 'react-hot-toast';
import axios from 'axios';


const LoginPage = () => {
    const nav = useNavigate()
    const [formData, setFormData] = useState({ email: '', password: '', });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        let loader = toast.loading("Processing")
        try {
            if (formData.email === "admin@qosyne.com" && formData.password=="Admin@123") {
                toast.dismiss(loader)
                toast.success('Login successful!');
                setTimeout(() => { nav("/admin/dashboard/home") }, 2000);
            }
            else {
                toast.dismiss(loader)
                toast.error('Invalid Credentials');
            }
        }
        catch (error) {
            toast.dismiss(loader)
        }
    };
    return (
        <div className='flex justify-center items-center w-screen h-screen'>
            <div className='flex-1 hidden md:flex flex-col h-[100%] bg-[#010080]'>
                <div className="flex-shrink-0 flex items-center gap-x-2 p-5">
                    <img src={Logo} alt="" className='h-10' />
                </div>
                <div className='flex-1 h-[90%]'>
                    <img src={AuthImage} alt="" className=' h-fit' />
                </div>
            </div>

            <div className='flex-1 flex justify-center items-center flex-col h-[100%] overflow-y-auto pt-0'>
                <div className='w-full max-w-md p-6'>
                    <h2 className="text-2xl mb-4 text-[#324B50]">Sign in to your Account</h2>
                    <p className='text-sm text-[#324B50]'>Enter your email and password to log In</p>
                    <form className="">
                        <input required={true} type="email" name="email" placeholder="Email Address" className="w-[100%] mt-2 border p-2 rounded outline-none block" onChange={handleChange} />
                        <input required={true} type="password" name="password" placeholder="Password" className="w-[100%] mt-2 border p-2 rounded outline-none block" onChange={handleChange} />
                    </form>
                    <button className="w-full bg-[#010080] p-2 rounded mt-4 text-white" onClick={handleLogin}>Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
