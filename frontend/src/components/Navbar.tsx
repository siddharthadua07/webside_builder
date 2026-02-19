import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { authClient } from '@/lib/auth-client';
import { UserButton } from '@daveyplate/better-auth-ui'
import api from '@/configs/axios';
import { toast } from 'sonner';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const navigate = useNavigate()
    const [credits, setCredits] = useState(0)
    const { data: session } = authClient.useSession()

    const getCredits = async () => {
        try {
            const { data } = await api.get('/api/user/credits');
            setCredits(data.credits)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message)
            console.log(error);
        }
    }

    useEffect(() => {
        if (session?.user) {
            getCredits()
        }
    }, [session?.user])

    return (
        <div className="relative">
            {/* Animated Gradient Background - Same as Home */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Orb 1 - Top Left */}
                <div
                    className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
                        filter: 'blur(60px)',
                        animation: 'floatNav1 15s ease-in-out infinite'
                    }}
                />

                {/* Gradient Orb 2 - Top Right */}
                <div
                    className="absolute -top-10 right-0 w-[300px] h-[300px] rounded-full opacity-25"
                    style={{
                        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 70%)',
                        filter: 'blur(50px)',
                        animation: 'floatNav2 18s ease-in-out infinite'
                    }}
                />

                {/* Gradient Orb 3 - Center */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)',
                        filter: 'blur(70px)',
                        animation: 'floatNav3 20s ease-in-out infinite'
                    }}
                />

                {/* Noise Texture Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Animation Keyframes */}
            <style>{`
                @keyframes floatNav1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(20px, -10px) scale(1.1); }
                }
                @keyframes floatNav2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-15px, 15px) scale(1.2); }
                }
                @keyframes floatNav3 {
                    0%, 100% { transform: translate(-50%, 0) scale(1); }
                    50% { transform: translate(-50%, 0) scale(1.3); }
                }
            `}</style>

            <nav className="relative z-50 flex items-center justify-between w-full py-4 px-4 md:px-16 lg:px-24 xl:px-32 backdrop-blur-xl bg-[#0a0a0f]/60 border-b border-white/10 text-white">
                <Link to='/'>
                    <img src={assets.logo} alt="" className='h-9 sm:h-12' />
                </Link>

                <div className="hidden md:flex items-center gap-8 transition duration-500">
                    <Link to='/' className="hover:text-violet-400 transition-colors">Home</Link>
                    <Link to='/projects' className="hover:text-violet-400 transition-colors">My Workspace</Link>
                    <Link to='/explore' className="hover:text-violet-400 transition-colors">Explore</Link>
                    <Link to='/pricing' className="hover:text-violet-400 transition-colors">Subscription</Link>
                </div>

                <div className="flex items-center gap-3">
                    {!session?.user ? (
                        <button
                            onClick={() => navigate('/auth/signin')}
                            className="px-6 py-1.5 max-sm bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 hover:from-violet-400 hover:via-fuchsia-400 hover:to-cyan-400 active:scale-95 transition-all rounded-lg shadow-lg shadow-violet-500/25 font-medium"
                        >
                            Get started
                        </button>
                    ) : (
                        <>
                            <button className='bg-white/10 backdrop-blur-md px-5 py-1.5 text-xs sm:text-sm border border-white/20 text-gray-200 rounded-full hover:bg-white/20 transition-all'>
                                Tokens: <span className='text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-semibold'>{credits}</span>
                            </button>
                            <div className="hover:scale-105 transition-transform">
                                <UserButton size='icon' />
                            </div>
                        </>
                    )}

                    <button
                        id="open-menu"
                        className="md:hidden active:scale-90 transition hover:text-violet-400"
                        onClick={() => setMenuOpen(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="fixed inset-0 z-[100] bg-[#0a0a0f]/95 backdrop-blur-xl text-white flex flex-col items-center justify-center text-lg gap-8 md:hidden">
                    {/* Mobile Menu Background Orbs */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div
                            className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full opacity-20"
                            style={{
                                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
                                filter: 'blur(60px)'
                            }}
                        />
                        <div
                            className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full opacity-20"
                            style={{
                                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, transparent 70%)',
                                filter: 'blur(50px)'
                            }}
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-8">
                        <Link to='/' onClick={() => setMenuOpen(false)} className="hover:text-violet-400 transition-colors text-2xl font-medium">Home</Link>
                        <Link to='/projects' onClick={() => setMenuOpen(false)} className="hover:text-violet-400 transition-colors text-2xl font-medium">My Workspace</Link>
                        <Link to='/explore' onClick={() => setMenuOpen(false)} className="hover:text-violet-400 transition-colors text-2xl font-medium">Explore</Link>
                        <Link to='/pricing' onClick={() => setMenuOpen(false)} className="hover:text-violet-400 transition-colors text-2xl font-medium">Subscription</Link>

                        <button
                            className="mt-8 active:ring-3 active:ring-white/50 aspect-square size-12 p-2 items-center justify-center bg-white/10 hover:bg-white/20 transition text-white rounded-full flex border border-white/20"
                            onClick={() => setMenuOpen(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar