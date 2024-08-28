"use client";

import { useState } from "react";
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from 'next-view-transitions';
import ThemeSwitch from "./ThemeSwitch";
import { FiUser } from "react-icons/fi";
import { useAppSelector } from "@/lib/hooks";

export default function Navbar({
    movieGenres,
    tvGenres,
}: {
    movieGenres: any;
    tvGenres: any;
}) {
    const auth = useAppSelector((state) => state.auth.value);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="dark:bg-gray-900 bg-gray-200">
            <nav
                aria-label="Global"
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <p className=" font-bold text-xl">Movies App</p>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        aria-label="Open mobile menu"
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
                    >
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12 lg:items-center">
                    <Popover className="relative">
                        <PopoverButton 
                            aria-label="Genres menu"
                            className="flex items-center gap-x-1 text-sm font-semibold leading-6  lg:hover:dark:bg-gray-800 lg:hover:bg-gray-100 lg:py-2 lg:px-4 lg:rounded-full lg:transition-all">
                            Genres
                            <ChevronDownIcon
                                aria-hidden="true"
                                className="h-5 w-5 flex-none "
                            />
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className="flex justify-between absolute -left-8 top-full z-10 mt-3 w-screen max-w-2xl overflow-hidden rounded-b-3xl dark:bg-gray-900 bg-gray-200 shadow-lg transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <div className="p-4 mr-8">
                                <p className="block font-bold p-4">
                                    Movies Genres
                                </p>
                                <div className="grid grid-cols-2 gap-x-4">
                                    {movieGenres.map((genre: any) => (
                                        <div
                                            key={genre.id}
                                            className="group relative flex items-center gap-x-6 rounded-full w-max px-4 py-2 text-sm leading-6 lg:hover:dark:bg-gray-800 lg:hover:bg-gray-100 transition-all"
                                        >
                                            <Link
                                                href={`/movies/genre/${genre.id}`}
                                                className="block font-semibold  w-full"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                            >
                                                {genre.name}
                                                <span className="absolute inset-0" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="block font-bold  p-4">
                                    TV Shows Genres
                                </p>
                                <div className="grid grid-cols-2 gap-x-4">
                                    {tvGenres.map((genre: any) => (
                                        <div
                                            key={genre.id}
                                            className="group relative flex items-center gap-x-6 rounded-full w-max px-4 py-2 text-sm leading-6 lg:hover:dark:bg-gray-800 lg:hover:bg-gray-100 transition-all"
                                        >
                                            <Link
                                                href={`/tv-shows/genre/${genre.id}`}
                                                className="block font-semibold  w-full"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                            >
                                                {genre.name}
                                                <span className="absolute inset-0" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </PopoverPanel>
                    </Popover>

                    <Link
                        href="/movies"
                        className="text-sm font-semibold leading-6  lg:hover:dark:bg-gray-800 lg:hover:bg-gray-100 py-2 px-4 transition-all rounded-full"
                    >
                        Movies
                    </Link>
                    <Link
                        href="/tv-shows"
                        className="text-sm font-semibold leading-6  lg:hover:dark:bg-gray-800 lg:hover:bg-gray-100 py-2 px-4 transition-all rounded-full"
                    >
                        TV Shows
                    </Link>
                    <Link
                        href="/search"
                        className="text-sm font-semibold leading-6  lg:hover:dark:bg-gray-800 lg:hover:bg-gray-100 py-2 px-4 transition-all rounded-full"
                    >
                        Search
                    </Link>
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <ThemeSwitch />
                    <Link
                        aria-label={auth ? "profile" : "authenticate"}
                        href={auth ? "/profile" : "/authenticate"}
                        className="lg:hover:dark:bg-gray-800 lg:hover:bg-gray-100 p-2 rounded-full ml-3 transition-all"
                    >
                        <FiUser />
                    </Link>
                </div>
            </nav>
            <Dialog
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
                className="lg:hidden"
            >
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-6 dark:bg-gray-900 bg-gray-200 sm:max-w-sm">
                    <div className="flex items-center justify-between">
                        <Link href="#" className="-m-1.5 p-1.5">
                            <p className=" font-bold text-xl">Movies App</p>
                        </Link>
                        <button
                            aria-label="Close mobile menu"
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 "
                        >
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500">
                            <div className="py-6">
                                <ThemeSwitch />
                                <Link
                                    aria-label={auth ? "profile" : "authenticate"}
                                    href={auth ? "/profile" : "/authenticate"}
                                    className="hover:bg-gray-700 p-2 rounded-full ml-3 transition-all"
                                >
                                    <FiUser />
                                </Link>
                            </div>
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/movies"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-600 transition-all"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Movies
                                </Link>
                                <Disclosure
                                    as="div"
                                    className="-mx-3 hover:dark:bg-gray-800 hover:bg-gray-100 rounded-lg transition-all"
                                >
                                    <DisclosureButton 
                                        aria-label="Movies by genre"
                                        className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 ">
                                        Movies by genre
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                                        />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {movieGenres.map((genre: any) => (
                                            <DisclosureButton
                                                aria-label={genre.name}
                                                key={genre.name}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7  hover:bg-gray-600 w-full text-left"
                                            >
                                                <Link
                                                    href={`/movies/genre/${genre.id}`}
                                                    onClick={() =>
                                                        setMobileMenuOpen(false)
                                                    }
                                                >
                                                    {genre.name}
                                                </Link>
                                            </DisclosureButton>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>
                                <Link
                                    href="/tv-shows"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-600 transition-all"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    TV Shows
                                </Link>
                                <Disclosure
                                    as="div"
                                    className="-mx-3 hover:dark:bg-gray-800 hover:bg-gray-100 rounded-lg transition-all"
                                >
                                    <DisclosureButton 
                                        aria-label="TV Shows by genre"
                                        className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 ">
                                        TV Shows by genre
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                                        />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {tvGenres.map((genre: any) => (
                                            <DisclosureButton
                                                aria-label={genre.name}
                                                key={genre.name}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-600 w-full text-left transition-all"
                                            >
                                                <Link
                                                    href={`/tv-shows/genre/${genre.id}`}
                                                    onClick={() =>
                                                        setMobileMenuOpen(false)
                                                    }
                                                >
                                                    {genre.name}
                                                </Link>
                                            </DisclosureButton>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>
                                <Link
                                    href="/search"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-600 transition-all"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Search
                                </Link>
                            </div>
                            <div className="py-6">
                                {auth ? (
                                    <Link
                                        href="/profile"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-600 transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Log in
                                    </Link>
                                ) : (
                                    <Link
                                        href="/authenticate"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-600 transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Log in
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
