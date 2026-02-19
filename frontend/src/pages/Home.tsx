import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
    const { data: session } = authClient.useSession()
    const navigate = useNavigate()

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!session?.user) {
                return toast.error('Please Sign in to create a project')
            } else if (!input.trim()) {
                return toast.error('Please enter a message')
            }
            setLoading(true)

            const { data } = await api.post('/api/user/project', { initial_prompt: input })

            setLoading(false)
            navigate(`/projects/${data.projectId}`)
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orb 1 - Top Left */}
                <div
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-40"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
                        filter: 'blur(80px)',
                        animation: 'float1 20s ease-in-out infinite'
                    }}
                />

                {/* Gradient Orb 2 - Top Right */}
                <div
                    className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full opacity-35"
                    style={{
                        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 70%)',
                        filter: 'blur(70px)',
                        animation: 'float2 25s ease-in-out infinite'
                    }}
                />

                {/* Gradient Orb 3 - Center */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)',
                        filter: 'blur(100px)',
                        animation: 'float3 30s ease-in-out infinite'
                    }}
                />

                {/* Gradient Orb 4 - Bottom Left */}
                <div
                    className="absolute -bottom-40 -left-20 w-[450px] h-[450px] rounded-full opacity-35"
                    style={{
                        background: 'radial-gradient(circle, rgba(34, 211, 238, 0.5) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
                        filter: 'blur(60px)',
                        animation: 'float4 22s ease-in-out infinite'
                    }}
                />

                {/* Gradient Orb 5 - Bottom Right */}
                <div
                    className="absolute -bottom-20 -right-20 w-[550px] h-[550px] rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)',
                        filter: 'blur(80px)',
                        animation: 'float5 28s ease-in-out infinite'
                    }}
                />

                {/* Noise Texture Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Animation Keyframes */}
            <style>{`
                @keyframes float1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -30px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-40px, 20px) scale(1.2); }
                    66% { transform: translate(20px, -30px) scale(0.8); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.3); }
                }
                @keyframes float4 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(50px, -40px) scale(1.1); }
                }
                @keyframes float5 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-30px, 30px) scale(0.9); }
                }
            `}</style>

            {/* Main Content */}
            <section className="relative z-10 flex flex-col items-center text-white text-sm pb-20 px-4 font-poppins">
                <Link to='/pricing' className="flex items-center gap-2 border border-slate-700 rounded-full p-1 pr-3 text-sm mt-20 hover:border-slate-600 transition-colors">
                    <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-xs px-3 py-1 rounded-full">NEW</span>
                    <p className="flex items-center gap-2">
                        <span>Frist 5 Project Free</span>
                        <svg className="mt-px" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m1 1 4 3.5L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </p>
                </Link>

                <h1 className="text-center text-[40px] leading-[48px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-3xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                    Build websites at the speed of thought.
                </h1>

                <p className="text-center text-base max-w-md mt-2 text-slate-400">
                    Create and launch websites effortlessly with our AI-powered builder.
                </p>

                <form onSubmit={onSubmitHandler} className="bg-white/5 backdrop-blur-xl max-w-2xl w-full rounded-2xl p-4 mt-10 border border-white/10 focus-within:border-violet-500/50 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all shadow-2xl shadow-violet-500/10">
                    <textarea
                        onChange={e => setInput(e.target.value)}
                        className="bg-transparent outline-none text-gray-200 placeholder:text-slate-500 resize-none w-full"
                        rows={4}
                        placeholder="Describe your idea so AI can build it...."
                        required
                    />
                    <button className="ml-auto flex items-center gap-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 hover:from-violet-400 hover:via-fuchsia-400 hover:to-cyan-400 rounded-lg px-6 py-2.5 font-medium transition-all shadow-lg shadow-violet-500/25">
                        {!loading ? 'Create' : (
                            <>
                                Creating <Loader2Icon className="animate-spin size-4 text-white" />
                            </>
                        )}
                    </button>
                </form>

                <div className="flex flex-wrap items-center justify-center gap-16 md:gap-20 mx-auto mt-16">
                    <img className="max-w-28 md:max-w-32 opacity-60 hover:opacity-100 transition-opacity" src="https://saasly.prebuiltui.com/assets/companies-logo/framer.svg" alt="" />
                    <img className="max-w-28 md:max-w-32 opacity-60 hover:opacity-100 transition-opacity" src="https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg" alt="" />
                    <img className="max-w-28 md:max-w-32 opacity-60 hover:opacity-100 transition-opacity" src="https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg" alt="" />
                    <img className="max-w-28 md:max-w-32 opacity-60 hover:opacity-100 transition-opacity" src="https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg" alt="" />
                    <img className="max-w-28 md:max-w-32 opacity-60 hover:opacity-100 transition-opacity" src="https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg" alt="" />
                </div>
            </section>
        </div>
    );
}

export default Home;