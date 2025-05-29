"use client";
import React from 'react'
import Container from './Container'
import GameCardsMapping from './GameCardsMapping'
import { useGetMostRatedGames } from '@/hooks/useGetMostRatedGames';

const MostRatedGames = () => {
    const {
        data: games = [],
        isLoading,
        error,
    } = useGetMostRatedGames();
    console.log(games)
    return (
        <Container>
            <h2 className="mx-auto font-mono text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200">
                Most Rated Games
            </h2>
            <GameCardsMapping data={games} />
        </Container>
    )
}

export default MostRatedGames