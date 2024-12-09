import Link from 'next/link'

const Navbar = () => {
    return (
        <>
            <div className="w-9/10 flex justify-evenly p-5">
                <Link
                    href="/"
                    className="hover:text-white hover:underline text-2xl">
                Home
                </Link>
                <Link
                    href="/blog"
                    className="hover:text-white hover:underline text-2xl">
                Posts
                </Link>
                <Link
                    href="https://ryan-pi.net"
                    className="hover:text-white hover:underline text-2xl">
                Projects
                </Link>
            </div>
        </>
    )
}

export default Navbar;