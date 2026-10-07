"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ModeToggle } from './Theme'
import { FiMenu, FiX } from "react-icons/fi"

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    const sections = [
        'home', 'skills', 'projects', 'activity', 'certificates', 'contact'
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3,
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)

        sections.forEach((sec) => {
            const element = document.getElementById(sec)
            if (element) {
                observer.observe(element)
            }
        })

        return () => observer.disconnect()
    }, [])

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className=" mx-auto px-6 flex justify-center">
                    <nav className={`
                        flex items-center justify-between px-6 py-2 rounded-full 
                        transition-all duration-300
                        ${isScrolled
                            ? 'bg-transparent backdrop-blur-sm border border-border shadow-lg w-full md:w-auto'
                            : 'bg-transparent w-full md:w-auto border border-transparent'
                        }
                    `}>
                        {/* Logo / Name for Mobile/Scrolled */}
                        <div className={`md:hidden font-bold text-xl mr-auto ${isScrolled ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                            RRJ
                        </div>


                        {/* Desktop Menu */}
                        <div className='hidden md:flex items-center gap-1'>
                            {sections.map((sec) => (
                                <Link
                                    key={sec}
                                    href={`#${sec == 'home' ? '' : sec}`}
                                    className='relative px-4 py-2 capitalize text-sm font-medium transition-colors hover:text-primary'
                                    onClick={() => setActiveSection(sec)}
                                >
                                    {activeSection === sec && (
                                        <motion.span
                                            layoutId="bubble"
                                            className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    {sec}
                                </Link>
                            ))}
                            <div className="ml-4 pl-4 border-l border-border">
                                <ModeToggle />
                            </div>
                        </div>

                        {/* Mobile Toggles */}
                        <div className='flex items-center gap-4 md:hidden'>
                            <ModeToggle />
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 text-foreground"
                             >
                                 {mobileMenuOpen ? <FiX /> : <FiMenu />}
                             </button>
                        </div>
                    </nav>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {sections.map((sec) => (
                            <Link
                                key={sec}
                                href={`#${sec}`}
                                className='text-2xl font-bold capitalize hover:text-primary transition-colors'
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {sec}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar
