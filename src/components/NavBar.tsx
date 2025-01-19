'use client';

import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <div className="w-9/10 flex justify-evenly items-center p-5">
                <Link
                    href="/"
                    className="text-2xl hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    Home
                </Link>
                <Link
                    href="/blog"
                    className="text-2xl hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    Posts
                </Link>
                <Link
                    href="https://ryan-pi.net"
                    className="text-2xl hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    Projects
                </Link>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? '🌞' : '🌙'}
                </button>
            </div>
        </>
    )
}

export default Navbar;