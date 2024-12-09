import Link from 'next/link'

const Navbar = () => {
    return (
        <>
            <div className="w-9/10 flex justify-evenly p-5">
                <Link
                    href="/"
                    className="hover:text-white text-xl">
                Home
                </Link>
                <Link
                    href="/blog"
                    className="hover:text-white text-xl">
                Posts
                </Link>
            </div>
        </>
    )
}

export default Navbar;