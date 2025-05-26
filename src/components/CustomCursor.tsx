
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: any) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <motion.div
            className="hidden md:block fixed pointer-events-none w-11 h-11 bg-black/40 border-2 border-white rounded-full z-[999]"
            style={{
                left: cursorPosition.x,
                top: cursorPosition.y,
                translate: '-50% -50%', // Center the cursor
            }}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        />
    );
};

export default CustomCursor;