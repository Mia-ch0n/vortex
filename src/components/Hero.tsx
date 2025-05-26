'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
    { name: 'Log in', href: '#' },
]

export default function Hero() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="relative bg-background text-foreground">
            <div className="mx-auto max-w-7xl">
                <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
                    <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-background lg:block"
                    >
                        <polygon points="0,0 90,0 50,100 0,100" />
                    </svg>

                    <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                            <div className="hidden sm:mb-10 sm:flex">
                                <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-300 ring-1 ring-gray-700 hover:ring-gray-600">
                                    Anim aute id magna aliqua ad ad non deserunt sunt.{' '}
                                    <a href="#" className="font-semibold whitespace-nowrap text-indigo-400 hover:text-indigo-300">
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        Read more <span aria-hidden="true">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                            <h1 className="text-5xl font-medium tracking-tight text-pretty text-white sm:text-6xl font-sans">
                                Data to enrich your business
                            </h1>
                            <p className="mt-8 text-lg font-normal text-pretty text-gray-300 sm:text-xl/8">
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                                amet fugiat veniam occaecat fugiat aliqua.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <a
                                    href="#"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Get started
                                </a>
                                <a href="#" className="text-sm/6 font-semibold text-gray-200 hover:text-white">
                                    Learn more <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img
                    alt=""
                    src="https://pt.egw.news/_next/image?url=https%3A%2F%2Fegw.news%2Fuploads%2Fnews%2F1%2F17%2F1743925013265_1743925013265.webp&w=1920&q=75"
                    className="aspect-3/2 object-cover lg:aspect-auto lg:size-full"
                />
            </div>
        </div>
    )
}
