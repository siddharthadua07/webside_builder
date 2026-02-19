import {
    Loader2,
    LayoutTemplate,
    Box,
    Layers,
    Sparkles,
    Cpu,
    Code2,
    Rocket
} from 'lucide-react'
import React, { useEffect, useState } from 'react'

const steps = [
    { icon: Cpu, label: 'Analyzing your request....' },
    { icon: LayoutTemplate, label: 'Generating layout structure....' },
    { icon: Box, label: 'Assembling UI components....' },
    { icon: Sparkles, label: 'Finalizing your website....' },
]

const STEP_DURATION = 4500

const LoaderSteps = () => {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((s) => (s + 1) % steps.length)
        }, STEP_DURATION)
        return () => clearInterval(interval)
    }, [])

    const Icon = steps[current].icon

    return (
        <div className='w-full h-full flex flex-col items-center justify-center bg-gray-950 relative overflow-hidden text-white'>

            {/* Animated gradient background */}
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-fuchsia-900/20 blur-3xl animate-pulse' />

            {/* Floating particles effect */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-ping opacity-20' style={{ animationDuration: '3s' }} />
                <div className='absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-30' style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
                <div className='absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-ping opacity-25' style={{ animationDuration: '2.5s', animationDelay: '1s' }} />
            </div>

            {/* Main loader container */}
            <div className='relative z-10 w-40 h-40 flex items-center justify-center'>

                {/* Outer rotating ring */}
                <div className='absolute inset-0 rounded-full border-2 border-dashed border-indigo-400/30 animate-[spin_8s_linear_infinite]' />

                {/* Middle rotating ring (reverse direction) */}
                <div className='absolute inset-3 rounded-full border-2 border-dotted border-purple-400/40 animate-[spin_6s_linear_infinite_reverse]' />

                {/* Inner pulsing ring */}
                <div className='absolute inset-6 rounded-full border border-fuchsia-400/20 animate-pulse' />

                {/* Glow effect behind icon */}
                <div className='absolute w-20 h-20 bg-indigo-500/20 rounded-full blur-xl animate-pulse' />

                {/* Icon container with scale animation */}
                <div className='relative flex items-center justify-center animate-[bounce_2s_ease-in-out_infinite]'>
                    <Icon className='w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]' strokeWidth={1.5} />
                </div>
            </div>

            {/* Progress dots */}
            <div className='flex gap-2 mt-8 mb-4'>
                {steps.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${index === current
                                ? 'bg-indigo-400 w-6 animate-pulse'
                                : index < current
                                    ? 'bg-purple-400/60'
                                    : 'bg-gray-600/40'
                            }`}
                    />
                ))}
            </div>

            {/* Step label with fade transition */}
            <div className='h-8 flex items-center justify-center'>
                <p
                    key={current}
                    className='text-lg font-light text-white/90 tracking-wide animate-[fadeIn_0.5s_ease-out]'
                >
                    {steps[current].label}
                </p>
            </div>

            {/* Subtle hint text */}
            <p className='text-xs text-gray-400 mt-2 animate-pulse'>
                This may take around 2-3 minutes...
            </p>

            {/* Decorative corner elements */}
            <div className='absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-indigo-400/20 rounded-tl-3xl' />
            <div className='absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-purple-400/20 rounded-br-3xl' />
        </div>
    )
}

export default LoaderSteps