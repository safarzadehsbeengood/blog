import Link from 'next/link'

const Title = () => {
    return (
        <>
            <div className="w-9/10 flex justify-left p-5">
                <Link
                    href="/"
                    className="text-4xl hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    ryan safa 
                </Link>
            </div>
        </>
    )
}

export default Title;