import React from 'react'
import { appPlans } from '../assets/assets';
import Footer from '../components/Footer';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import api from '@/configs/axios';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';

interface Plan {
    id: string;
    name: string;
    price: string;
    credits: number;
    description: string;
    features: string[];
}


const Pricing = () => {
    const { data: session } = authClient.useSession();

    const [plans] = React.useState<Plan[]>(appPlans)

    const handlePurchase = async (planId: string) => {
        try {
            if (!session?.user) {
                return toast('Please log in to purchase a plan.');
            }
            const { data } = await api.post('/api/user/purchase-credits', { planId })

            window.location.href = data.payment_link;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }
    }

    const getPlanIcon = (index: number) => {
        if (index === 0) return <Zap className="w-6 h-6" />;
        if (index === 1) return <Sparkles className="w-6 h-6" />;
        return <Crown className="w-6 h-6" />;
    };

    const getPlanGradient = (index: number) => {
        if (index === 0) return "from-blue-500/20 via-purple-500/10 to-transparent";
        if (index === 1) return "from-purple-500/20 via-pink-500/10 to-transparent";
        return "from-amber-500/20 via-orange-500/10 to-transparent";
    };

    const getButtonGradient = (index: number) => {
        if (index === 0) return "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500";
        if (index === 1) return "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500";
        return "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400";
    };

    return (
        <>

            <div className='min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden'>
                {/* Animated background blobs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

                <div className='w-full max-w-6xl mx-auto z-20 max-md:px-4 relative'>
                    <div className='text-center pt-24 pb-12'>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-gray-300">Simple, transparent pricing</span>
                        </div>
                        <h2 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-6'>
                            Choose Your Plan
                        </h2>
                        <p className='text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed'>
                            Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
                        </p>
                    </div>

                    <div className='py-8 px-4'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
                            {plans.map((plan, idx) => (
                                <div
                                    key={idx}
                                    className={`relative group rounded-2xl overflow-hidden ${idx === 1 ? 'md:-mt-4 md:mb-4' : ''}`}
                                >
                                    {/* Gradient background */}
                                    <div className={`absolute inset-0 bg-gradient-to-b ${getPlanGradient(idx)} opacity-50`} />

                                    {/* Border glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Card content */}
                                    <div className="relative p-8 bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl h-full flex flex-col">
                                        {idx === 1 && (
                                            <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                                                <span className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full">
                                                    Most Popular
                                                </span>
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getPlanGradient(idx)} flex items-center justify-center text-white mb-4`}>
                                                {getPlanIcon(idx)}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                            <p className="text-gray-400 text-sm">{plan.description}</p>
                                        </div>

                                        <div className="mb-8">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-5xl font-bold text-white">{plan.price}</span>
                                                <span className="text-gray-400">/{plan.credits} credits</span>
                                            </div>
                                        </div>

                                        <ul className="space-y-4 mb-8 flex-grow">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <Check className="w-3 h-3 text-green-400" />
                                                    </div>
                                                    <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <button
                                            onClick={() => handlePurchase(plan.id)}
                                            className={`w-full py-4 px-6 ${getButtonGradient(idx)} text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl`}
                                        >
                                            Get Started
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='max-w-2xl mx-auto mt-16 mb-20'>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <p className='text-center text-gray-400 text-sm leading-relaxed'>
                                <span className="text-white font-medium">Project Creation / Revision</span> consume{' '}
                                <span className="text-purple-400 font-semibold">5 credits</span>.
                                You can purchase more credits to create more projects.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Pricing