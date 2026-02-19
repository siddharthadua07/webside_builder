import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { Project } from '../types'
import { ArrowBigDownDashIcon, EyeIcon, EyeOffIcon, Fullscreen, LaptopIcon, Loader2Icon, MessageSquareIcon, SaveIcon, Smartphone, TabletIcon, XIcon, Code2, Layers, Zap } from 'lucide-react'

import Sidebar from '../components/Sidebar'
import ProjectPreview, { type ProjectPreviewRef } from '../components/ProjectPreview'
import api from '@/configs/axios'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'

const Projects = () => {

    const { projectId } = useParams()
    const navigate = useNavigate()
    const { data: session, isPending } = authClient.useSession()
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)
    const [isGenerating, setIsGenerating] = useState(true)
    const [device, setDevice] = useState<'phone' | 'tablet' | 'desktop'>("desktop")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const previewRef = useRef<ProjectPreviewRef>(null)
    const fetchProject = async () => {
        try {
            const { data } = await api.get(`/api/user/project/${projectId}`);
            setProject(data.project)
            setIsGenerating(data.project.current_code ? false : true)
            setLoading(false)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }

    }
    const saveProject = async () => {
        if (!previewRef.current) return;
        const code = previewRef.current.getCode();
        if (!code) return;
        setIsSaving(true);
        try {
            const { data } = await api.put(`/api/project/save/${projectId}`, { code });
            toast.success(data.message)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        } finally {
            setIsSaving(false);
        }

    };
    // download code (index.html)
    const downloadCode = () => {
        const code = previewRef.current?.getCode() || project?.current_code;
        if (!code) {
            if (isGenerating) {
                return
            }
            return
        }
        const element = document.createElement('a');
        const file = new Blob([code], { type: "text/html" });
        element.href = URL.createObjectURL(file)
        element.download = "index.html";
        document.body.appendChild(element)
        element.click();
    }

    const togglePublish = async () => {
        try {
            const { data } = await api.get(`/api/user/publish-toggle/${projectId}`);
            toast.success(data.message)
            setProject((prev) => prev ? ({ ...prev, isPublished: !prev.isPublished }) : null)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }
    }

    useEffect(() => {
        if (session?.user) {
            fetchProject();
        }
        else if (!isPending && !session?.user) {
            navigate('/')
            toast('Please login to view your projects')
        }
    }, [session?.user])
    useEffect(() => {

        if (project && !project.current_code) {
            const intervalId = setInterval(fetchProject, 10000);

            return () => clearInterval(intervalId)
        }
        fetchProject()
    }, [project])


    if (loading) {
        return (
            <>
                <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-900'>
                    <div className="relative">
                        {/* Outer rotating ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 w-24 h-24 animate-spin"></div>

                        {/* Middle rotating ring */}
                        <div className="absolute inset-2 rounded-full border-4 border-purple-500/20 border-b-purple-500 w-20 h-20 animate-spin-reverse"></div>

                        {/* Inner rotating ring */}
                        <div className="absolute inset-4 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 w-16 h-16 animate-spin"></div>

                        {/* Center icon */}
                        <div className="absolute inset-6 flex items-center justify-center">
                            <Code2 className="w-8 h-8 text-indigo-400 animate-pulse" />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center gap-2">
                        <h3 className="text-xl font-semibold text-white tracking-wide">Loading Project</h3>
                        <div className="flex gap-1">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></span>
                            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return project ? (
        <div className='flex flex-col h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white'>
            {/* builder navbar  */}
            <div className='flex max-sm:flex-col sm:items-center gap-4 px-6 py-4 border-b border-white/10 bg-slate-900/60 backdrop-blur-2xl sticky top-0 z-50 shadow-lg shadow-black/20'>
                {/* left */}
                <div className='flex items-center gap-4 sm:min-w-0 text-nowrap'>
                    <div className='p-2.5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 cursor-pointer group' onClick={() => navigate('/')}>
                        <Layers className='w-5 h-5 text-white group-hover:rotate-12 transition-transform' />
                    </div>
                </div>

                <div className='max-w-64 sm:max-w-xs'>
                    <p className='text-sm font-bold capitalize truncate text-white tracking-wide'>{project.name}</p>
                    <p className='text-xs text-slate-400 -mt-0.5 flex items-center gap-2'>
                        <span className='relative flex h-2 w-2'>
                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                            <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500'></span>
                        </span>
                        Previewing last saved version
                    </p>
                </div>
                <div className='sm:hidden flex-1 flex justify-end'>
                    {isMenuOpen ?
                        <MessageSquareIcon onClick={() => setIsMenuOpen(false)} className='size-6 cursor-pointer text-slate-300 hover:text-white transition-colors' /> : <XIcon onClick={() => setIsMenuOpen(true)} className='size-6 cursor-pointer text-slate-300 hover:text-white transition-colors' />}
                </div>
                {/* middle */}
                <div className='hidden sm:flex gap-2 bg-slate-800/60 p-1.5 rounded-xl border border-white/10 shadow-inner'>
                    <Smartphone onClick={() => setDevice('phone')} className={`size-9 p-2 rounded-lg cursor-pointer transition-all duration-300 ${device === 'phone' ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105' : "text-slate-400 hover:text-white hover:bg-white/10"}`} />

                    <TabletIcon onClick={() => setDevice('tablet')} className={`size-9 p-2 rounded-lg cursor-pointer transition-all duration-300 ${device === 'tablet' ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105' : "text-slate-400 hover:text-white hover:bg-white/10"}`} />

                    <LaptopIcon onClick={() => setDevice('desktop')} className={`size-9 p-2 rounded-lg cursor-pointer transition-all duration-300 ${device === 'desktop' ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105' : "text-slate-400 hover:text-white hover:bg-white/10"}`} />
                </div>
                {/* right */}
                <div className='flex items-center justify-end gap-3 flex-1 text-xs sm:text-sm'>
                    <button onClick={saveProject} disabled={isSaving} className='max-sm:hidden bg-slate-800/60 hover:bg-slate-700/60 text-white px-4 py-2.5 flex items-center gap-2 rounded-xl transition-all border border-white/10 hover:border-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg hover:shadow-indigo-500/10'>
                        {isSaving ? <Loader2Icon className='animate-spin text-indigo-400' size={16} /> : <SaveIcon size={16} className='group-hover:scale-110 transition-transform text-indigo-400' />}
                        <span className='font-medium'>Save</span>
                    </button>
                    <Link target='_blank' to={`/preview/${projectId}`} className='flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all group shadow-lg hover:shadow-purple-500/10'>
                        <Fullscreen size={16} className='group-hover:scale-110 transition-transform text-purple-400' />
                        <span className='font-medium'>Preview</span>
                    </Link>
                    <button onClick={downloadCode} className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white px-4 py-2.5 flex items-center gap-2 rounded-xl transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 group hover:scale-105' >
                        <ArrowBigDownDashIcon size={16} className='group-hover:translate-y-0.5 transition-transform' />
                        <span className='font-medium'>Download</span>
                    </button>
                    <button onClick={togglePublish} className={`px-4 py-2.5 flex items-center gap-2 rounded-xl transition-all shadow-lg group hover:scale-105 ${project.isPublished ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 shadow-emerald-500/30 hover:shadow-emerald-500/50' : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:via-indigo-500 hover:to-blue-500 shadow-indigo-500/30 hover:shadow-indigo-500/50'}`}>
                        {project.isPublished ?
                            <EyeOffIcon size={16} className='group-hover:scale-110 transition-transform' /> : <EyeIcon size={16} className='group-hover:scale-110 transition-transform' />
                        }
                        <span className='font-medium'>{project.isPublished ? "Unpublish" : "Publish"}</span>
                    </button>

                </div>
            </div>

            <div className='flex-1 flex overflow-auto'>
                <Sidebar isMenuOpen={isMenuOpen} project={project} setProject={(p) => setProject(p)} isGenerating={isGenerating} setIsGenerating={setIsGenerating} />
                <div className='flex-1 p-4 pl-0'>
                    <ProjectPreview ref={previewRef} project={project} isGenerating={isGenerating} device={device} />
                </div>
            </div>
        </div >
    )
        : (
            <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'>
                <div className='w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20'>
                    <XIcon className='w-10 h-10 text-red-400' />
                </div>
                <p className='text-2xl font-medium text-gray-200'>Unable to load project !</p>
                <button onClick={() => navigate('/')} className='mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-medium hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/30'>
                    Go Back Home
                </button>
            </div>
        )
}

export default Projects