import React from 'react';
import { FaQuestion } from 'react-icons/fa';

function Card({ card, isFlipped, isMatched, onFlip }) {
    const handleClick = () => {
        if (!isFlipped && !isMatched) {
            onFlip(card.id);
        }
    };

    const isOpen = isFlipped || isMatched;
    const IconComponent = card.icon;

    return (
        <div 
            onClick={handleClick} 
            /* Perspektif untuk efek 3D */
            className="w-20 h-20 cursor-pointer perspective-1000 group"
        >
            <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isOpen ? 'rotate-y-180' : 'hover:scale-105'}`}>
                
                {/* SISI BELAKANG (Saat kartu tertutup) */}
                <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center border-2 border-white/20">
                    <FaQuestion className="text-white/40 text-2xl group-hover:scale-110 transition-transform" />
                </div>

                {/* SISI DEPAN (Saat kartu terbuka) */}
                <div className={`absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl shadow-md flex items-center justify-center 
                    ${isMatched ? 'ring-4 ring-green-400 opacity-80' : 'ring-2 ring-white'}`}>
                    
                    <span className={`${isMatched ? 'animate-none' : 'animate-bounce-once'}`}>
                        <IconComponent style={{ color: card.color }} className="text-4xl" />
                    </span>
                </div>

            </div>
        </div>
    );
}

export default Card;