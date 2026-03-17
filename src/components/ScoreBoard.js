import React from 'react';
import { FaClock, FaMousePointer, FaCheck, FaSyncAlt, FaRedo } from 'react-icons/fa';

// Tambahkan prop 'seconds' agar sinkron dengan page.js
function ScoreBoard({ moves, seconds, matchedCount, totalPairs, onReset }) {
    const isGameComplete = matchedCount === totalPairs;

    // Fungsi tambahan untuk mengubah detik menjadi format menit:detik (0:00)
    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="text-center mb-6">
            <div className="flex justify-center gap-4 mb-4">
                {/* TAMBAHAN: Kotak Timer (Wajib ada di samping Percobaan sesuai tugas) */}
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
                        <FaClock className="text-indigo-300"/> Waktu
                    </p>
                    <p className="text-2xl font-bold text-white">{formatTime(seconds)}</p>
                </div>

                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    {/* Perbaikan typo: text_indigo menjadi text-indigo */}
                    <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
                        <FaMousePointer className="text-indigo-300"/> Percobaan
                    </p>
                    <p className="text-2xl font-bold text-white">{moves}</p>
                </div>

                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
                        <FaCheck className="text-indigo-300"/> Ditemukan
                    </p>
                    {/* Perbaikan tampilan: matchedCount / totalPairs agar jelas progresnya */}
                    <p className="text-2xl font-bold text-white">{matchedCount}/{totalPairs}</p>
                </div>
            </div>
            
            {isGameComplete && (
                <p className="text-yellow-300 font-bold text-lg mb-2 animate-pulse">
                    🎊 Selamat! Kamu menang dalam {moves} percobaan!
                </p>
            )}

            <button
                onClick={onReset}
                className="px-6 py-2 bg-yellow-400 text-indigo-900 font-bold rounded-full hover:bg-yellow-300
                transition-colors duration-200 shadow-lg flex items-center gap-2 mx-auto"
            >
                {isGameComplete ? <FaRedo /> : <FaSyncAlt />}
                {isGameComplete ? 'Main Lagi' : 'Acak Ulang'}
            </button>
        </div> 
    );
}

export default ScoreBoard;