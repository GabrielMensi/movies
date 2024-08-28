import { Link } from 'next-view-transitions';

export default function NotFoundPage() {
    return (
        <>
            <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-base leading-7">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/"
                            className="text-xl h-max font-semibold leading-6 cursor-pointer dark:bg-gray-800 hover:dark:bg-gray-700 hover:bg-gray-100 bg-gray-200 py-4 px-8 transition-all rounded-full"
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
