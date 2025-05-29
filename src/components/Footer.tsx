
export default function Footer() {
    return (
        <footer className="bg-gray-950 border-t border-t-white/10 mt-20">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center gap-x-6 md:order-2">
                    
                </div>
                <div className="flex justify-center items-center gap-6">
                    <img
                        src="/logo/logo.png"
                        alt="logo"
                        width={40}
                        height={40}
                        className="rounded-full border border-white p-1"
                    />
                    <p className="mt-8 text-center text-sm/6 text-gray-400 md:order-1 md:mt-0">
                        &copy; 2025 Vortex, Inc. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    )
}
