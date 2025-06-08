"use client";
import { motion } from 'framer-motion'
import { Game } from "../types/game";
import { useRouter } from 'next/navigation';

interface GameCardsMappingProps {
    data: Game[];
}

export default function GameCardsMapping({ data }: GameCardsMappingProps) {
    const router = useRouter()
    return (
        <div className="mx-auto max-w-2xl py-16 lg:max-w-7xl">
            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {data.map((game) => (
                    <motion.div
                        key={game.id}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onClick={() => router.push(`/games/${game.id}`)}
                        className="rounded-2xl border border-transparent p-1 hover:border-white/30"
                    >
                        <div className="relative">
                            <div className="relative h-96 w-full overflow-hidden rounded-lg">
                                <img
                                    alt={game.name}
                                    src={game.image_url}
                                    className="size-full object-cover"
                                />
                            </div>
                            <div className="relative mt-4">
                                <h3 className="text-lg font-mono font-medium text-white">{game.name}</h3>
                                <p className="mt-1 text-sm font-mono text-gray-500">{game.publisher}</p>
                            </div>
                            <div className="absolute inset-x-0 top-0 flex h-96 items-end justify-end overflow-hidden rounded-lg p-4">
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                />
                                <p className="relative text-xs font-mono font-light text-white line-clamp-2">
                                    {game.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
