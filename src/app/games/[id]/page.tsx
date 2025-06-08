"use client"
import { useParams } from 'next/navigation'
import { useGetGameById } from '../../../hooks/useGetGameById'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Game } from '../../../types/game'
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'react-hot-toast'

const page = () => {
    const { id } = useParams()
    const { data, isLoading, error } = useGetGameById(id as string)
    const game = data as Game
    const { user } = useAuth()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!user) {
            toast.error('Please login to post a review')
            return
        }

        if (rating === 0) {
            toast.error('Please select a rating')
            return
        }

        if (!comment.trim()) {
            toast.error('Please write a comment')
            return
        }

        setIsSubmitting(true)
        try {
            const response = await fetch('/api/rate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    game_id: game.id,
                    user_id: user.id,
                    rating,
                    comment
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to post review')
            }

            toast.success('Review posted successfully!')
            setRating(0)
            setComment('')
            // Refresh the game data to show the new review
            window.location.reload()
        } catch (error) {
            toast.error('Failed to post review')
        } finally {
            setIsSubmitting(false)
        }
    }
    type RenderStarsProps = {
        rating: number;
        onClick?: (rating: number) => void;
    };
    const renderStars = ({ rating, onClick }: RenderStarsProps) => {
        return Array.from({ length: 5 }).map((_, index) => {
            const starIndex = index + 1;
            const isFilled = starIndex <= rating;
            const star = (
                <svg
                    key={index}
                    className={`w-5 h-5 ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );

            return onClick ? (
                <button
                    key={index}
                    type="button"
                    onClick={() => onClick(starIndex)}
                    className="focus:outline-none"
                    aria-label={`Set rating to ${starIndex}`}
                >
                    {star}
                </button>
            ) : (
                <span key={index}>{star}</span>
            );
        });
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
                {isLoading ? <Loader /> :
                    error ? <div>Error: {error.message}</div> :
                        !game ? <div>Game not found</div> :
                            <>
                                <div className="max-w-7xl mx-auto">
                                    {/* Hero Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="relative aspect-[3/4] rounded-xl overflow-hidden"
                                        >
                                            <img
                                                src={game.image_url}
                                                alt={game.name}
                                                className="object-cover"
                                            />
                                        </motion.div>

                                        <div className="space-y-6">
                                            <motion.h1
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-4xl font-bold"
                                            >
                                                {game.name}
                                            </motion.h1>

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="space-y-2"
                                            >
                                                <p className="text-gray-300">Publisher: {game.publisher}</p>
                                                <p className="text-gray-300">Minimum Age: {game.min_age}+</p>
                                                <p className="text-gray-300">Release Date: {game.release_date}</p>
                                                {game.duration_minutes && (
                                                    <p className="text-gray-300">Duration: {game.duration_minutes} minutes</p>
                                                )}
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="flex flex-wrap gap-2"
                                            >
                                                {game.genres.map((genre: string, index: number) => (
                                                    <motion.span
                                                        key={genre}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.4 + index * 0.1 }}
                                                        className="px-4 py-2 bg-purple-600/20 backdrop-blur-sm rounded-full text-sm"
                                                    >
                                                        {genre}
                                                    </motion.span>
                                                ))}
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="prose prose-invert"
                                            >
                                                <p className="text-gray-300">{game.description}</p>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                <Link
                                                    href={game.link}
                                                    target="_blank"
                                                    className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                                                >
                                                    Download Game
                                                </Link>
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Gameplay Screenshots */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        className="mt-16"
                                    >
                                        <h2 className="text-2xl font-bold mb-6">Gameplay Screenshots</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[game.additional_image1, game.additional_image2, game.additional_image3].map((image, index) => (
                                                <motion.div
                                                    key={index}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="relative aspect-video rounded-xl overflow-hidden"
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Gameplay screenshot ${index + 1}`}
                                                        className="object-cover"
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* System Requirements */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                        className="mt-16"
                                    >
                                        <h2 className="text-2xl font-bold mb-6">System Requirements</h2>
                                        {game.system_requirements.map((req) => (
                                            <div key={req.id} className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10"
                                                >
                                                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Minimum Requirements</h3>
                                                    <div className="space-y-3">
                                                        <p><span className="text-gray-400">OS:</span> {req.min_os}</p>
                                                        <p><span className="text-gray-400">CPU:</span> {req.min_cpu}</p>
                                                        <p><span className="text-gray-400">RAM:</span> {req.min_ram_gb}GB</p>
                                                        <p><span className="text-gray-400">GPU:</span> {req.min_video_card}</p>
                                                        <p><span className="text-gray-400">VRAM:</span> {req.min_dedicated_vram_mb}MB</p>
                                                        <p><span className="text-gray-400">Storage:</span> {req.min_free_disk_space_gb}GB</p>
                                                    </div>
                                                </motion.div>

                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10"
                                                >
                                                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Recommended Requirements</h3>
                                                    <div className="space-y-3">
                                                        <p><span className="text-gray-400">OS:</span> {req.rec_os}</p>
                                                        <p><span className="text-gray-400">CPU:</span> {req.rec_cpu}</p>
                                                        <p><span className="text-gray-400">RAM:</span> {req.rec_ram_gb}GB</p>
                                                        <p><span className="text-gray-400">GPU:</span> {req.rec_video_card}</p>
                                                        <p><span className="text-gray-400">VRAM:</span> {req.rec_dedicated_vram_mb}MB</p>
                                                        <p><span className="text-gray-400">Storage:</span> {req.rec_free_disk_space_gb}GB</p>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        ))}
                                    </motion.div>

                                    {/* Reviews Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9 }}
                                        className="mt-16"
                                    >
                                        <h2 className="text-2xl font-bold mb-6">Reviews</h2>

                                        {/* Review Form */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mb-12 p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10"
                                        >
                                            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                                            <form onSubmit={handleReviewSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Rating</label>
                                                    <div className="flex gap-1">
                                                        {renderStars({ rating, onClick: setRating })}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Comment</label>
                                                    <textarea
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors"
                                                        rows={4}
                                                        placeholder="Share your thoughts about the game..."
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isSubmitting ? 'Posting...' : 'Post Review'}
                                                </button>
                                            </form>
                                        </motion.div>

                                        {/* Existing Reviews */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {game.reviews.map((review) => (
                                                <motion.div
                                                    key={review.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-600/20 flex items-center justify-center">
                                                            {review.profiles.avatar_url ? (
                                                                <img
                                                                    src={review.profiles.avatar_url}
                                                                    alt={review.profiles.username}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <span className="text-xl font-bold">
                                                                    {review.profiles.username.charAt(0).toUpperCase()}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <h4 className="font-semibold">{review.profiles.username}</h4>
                                                                <span className="text-sm text-gray-400">
                                                                    {new Date(review.created_at).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                            <div className="flex mb-2">
                                                                {renderStars({ rating: review.rating })}
                                                            </div>

                                                            <p className="text-gray-300">{review.comment}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </>
                }
            </div>
        </Layout>
    )
}

export default page