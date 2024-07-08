export default function Stars({ rate }: { rate: number }) {
    return (
        <div className="relative inline-block mt-4">
            <div className="text-gray-200 inline-flex space-x-1">
                {[...Array(5)].map((_, index) => (
                    <svg key={index} viewBox="0 0 32 30" className="w-8 h-8">
                        <path
                            d="M31.77 11.857H19.74L15.99.5l-3.782 11.357H0l9.885 6.903-3.692 11.21 9.736-7.05 9.796 6.962-3.722-11.18 9.766-6.845z"
                            fill="currentColor"
                        />
                    </svg>
                ))}
            </div>
            <div
                className="overflow-hidden absolute left-0 top-0 text-pink-500 flex space-x-1"
                style={{ width: `${rate}%` }}
            >
                {[...Array(5)].map((_, index) => (
                    <svg
                        key={index}
                        viewBox="0 0 32 30"
                        className="w-8 h-8 flex-shrink-0"
                    >
                        <path
                            d="M31.77 11.857H19.74L15.99.5l-3.782 11.357H0l9.885 6.903-3.692 11.21 9.736-7.05 9.796 6.962-3.722-11.18 9.766-6.845z"
                            fill="currentColor"
                        />
                    </svg>
                ))}
            </div>
        </div>
    );
}
