import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Phone, Bike, Tag, ShieldCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Identity Header bar */}
      <header className="max-w-7xl w-full mx-auto px-6 py-6 flex justify-between items-center">
        <span onClick={() => navigate('/')} className="text-2xl font-black text-orange-600 tracking-tight cursor-pointer">
          🍽️ Foodie<span className="text-slate-900">Hub</span>
        </span>
        <button 
          onClick={() => setIsLoginView(!isLoginView)} 
          className="border-2 border-orange-500 text-orange-600 font-bold px-5 py-2 rounded-xl text-sm hover:bg-orange-50 transition"
        >
          {isLoginView ? 'Create an account' : 'Login'}
        </button>
      </header>

      {/* Main Responsive Form Block Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 items-center my-auto py-6">
        
        {/* Left Side Branding Visual Copy Block */}
        <div className="lg:col-span-5 space-y-6 lg:max-w-md hidden lg:block">
          <h1 className="text-5xl font-black text-slate-900 leading-tight">
            {isLoginView ? <>Good food, <br /><span className="text-orange-600">delivered fast</span></> : <>Good food, <br /><span className="text-orange-600">good mood!</span></>}
          </h1>
          <p className="text-gray-500">Join FoodieHub and discover meals from local culinary establishments in seconds.</p>
          
          <div className="pt-4 grid grid-cols-1 gap-3 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Bike className="text-orange-500 w-4 h-4"/> Fast Delivery Guarantee</div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Tag className="text-orange-500 w-4 h-4"/> Hand-picked Local Premium Deals</div>
          </div>
        </div>

        {/* Right Input Card Container Module Area */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
          <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-gray-100 shadow-2xl w-full max-w-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-slate-900">{isLoginView ? 'Welcome back 👋' : 'Create your account 🚀'}</h2>
              <p className="text-gray-400 text-sm mt-1">{isLoginView ? 'Login to check out your tracking dashboard' : 'Sign up to get tracking fast'}</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); navigate('/'); }} className="space-y-4">
              {!isLoginView && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Full Name</label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 bg-slate-50"><User className="text-gray-400 w-4 h-4"/><input type="text" placeholder="Name" className="w-full text-sm bg-transparent focus:outline-none"/></div>
                  </div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Phone</label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 bg-slate-50"><Phone className="text-gray-400 w-4 h-4"/><input type="tel" placeholder="Phone" className="w-full text-sm bg-transparent focus:outline-none"/></div>
                  </div>
                </div>
              )}

              <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Email address</label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 bg-slate-50"><Mail className="text-gray-400 w-4 h-4"/><input type="email" placeholder="Enter email" className="w-full text-sm bg-transparent focus:outline-none"/></div>
              </div>

              <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Password</label>
                <div className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-gray-200 bg-slate-50">
                  <div className="flex items-center gap-2 w-full"><Lock className="text-gray-400 w-4 h-4"/><input type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full text-sm bg-transparent focus:outline-none"/></div>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400">{showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}</button>
                </div>
              </div>

              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition text-sm shadow-md shadow-orange-600/10">
                {isLoginView ? 'Login' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="w-full text-center py-6 text-xs text-gray-400 font-semibold border-t border-gray-100 bg-white">
        © 2026 FoodieHub. All rights reserved.
      </footer>
    </div>
  );
}
