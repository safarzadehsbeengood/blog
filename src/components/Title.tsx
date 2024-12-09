import Link from 'next/link'

const Title = () => {
    return (
        <>
            <div className="w-9/10 flex justify-left p-5">
                <Link
                    href="/"
                    className="hover:text-white text-4xl">
                ryan safa 
                </Link>
            </div>
        </>
    )
}

export default Title;