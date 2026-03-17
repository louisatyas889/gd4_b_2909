'use client';
// Import React dan hook useState untuk mengelola state komponen
import React, { useState, useEffect } from 'react';
// Import komponen GameBoard dan ScoreBoard
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
// Import react-icons
import { GiCardJoker } from 'react-icons/gi';
// TAMBAHAN: Import icon ekstra agar cukup untuk 8 pasang (Hard Mode)
import { FaAppleAlt, FaLemon, FaHeart, FaStar, FaGhost, FaIceCream, FaBeer, FaRocket } from 'react-icons/fa';

// TAMBAHAN: Daftar master icon yang lebih lengkap
const ALL_ICONS = [
  { icon: FaAppleAlt, color: '#ef4444' },
  { icon: FaLemon, color: '#eab308' },
  { icon: FaHeart, color: '#ec4899' },
  { icon: FaStar, color: '#f97316' },
  { icon: FaGhost, color: '#a855f7' },
  { icon: FaIceCream, color: '#fb7185' },
  { icon: FaBeer, color: '#facc15' },
  { icon: FaRocket, color: '#0ea5e9' },
];

// Fungsi untuk mengacak urutan array menggunakan algoritma Fisher-Yates
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// MODIFIKASI: createCards sekarang menerima jumlah pasang (count)
const createCards = (count) => {
  const selectedIcons = ALL_ICONS.slice(0, count); // Ambil icon sesuai difficulty
  const paired = selectedIcons.flatMap((item, index) => [
    { id: index * 2, icon: item.icon, color: item.color, pairId: index },
    { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
  ]);
  return shuffleArray(paired);
};

export default function Home() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  // TAMBAHAN: State untuk Difficulty, Timer, dan Status Aktif
  const [difficulty, setDifficulty] = useState(4); 
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Inisialisasi kartu saat komponen pertama kali dirender atau difficulty berubah
  useEffect(() => {
    setCards(createCards(difficulty));
  }, [difficulty]);
  
  // useEffect untuk mengecek kecocokan setiap kali 2 kartu terbuka
  useEffect(() => {
    if (flippedCards.length === 2) {
      // TAMBAHAN: Mulai timer saat pemain membalik kartu pertama
      if (!isActive) setIsActive(true);

      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      setMoves(prev => prev + 1);

      if (firstCard.pairId === secondCard.pairId) {
        setMatchedCards(prev => [...prev, firstId, secondId]);
        setFlippedCards([]);
      } else {
        const timer = setTimeout(() => {
          setFlippedCards([]);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [flippedCards, cards, isActive]);

  // Fungsi untuk membalik kartu ketika diklik
  const handleCardFlip = (id) => {
    if (flippedCards.length < 2 && !flippedCards.includes(id) && !matchedCards.includes(id)) {
      setFlippedCards(prev => [...prev, id]);
    }
  };

  // Fungsi untuk mereset permainan ke kondisi awal
  const resetGame = () => {
    setCards(createCards(difficulty));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    // TAMBAHAN: Reset Timer
    setSeconds(0);
    setIsActive(false);
  };

  // TAMBAHAN: Logika Timer (Stopwatch)
  useEffect(() => {
    let interval = null;
    if (isActive && matchedCards.length < cards.length) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, matchedCards, cards]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg flex items-center gap-2">
        <GiCardJoker className="text-yellow-300 text-4xl" />
        Memory Card
      </h1>

      {/* TAMBAHAN: Difficulty Selector */}
      <div className="flex gap-2 mb-6">
        {[4, 6, 8].map((level) => (
          <button
            key={level}
            onClick={() => {
              setDifficulty(level);
              resetGame(); 
            }}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              difficulty === level ? 'bg-yellow-400 text-indigo-900 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {level === 4 ? 'Easy' : level === 6 ? 'Medium' : 'Hard'} ({level})
          </button>
        ))}
      </div>

      <ScoreBoard
        moves={moves}
        seconds={seconds} // TAMBAHAN: Kirim prop seconds ke ScoreBoard
        matchedCount={matchedCards.length / 2}
        totalPairs={difficulty} // Gunakan state difficulty
        onReset={resetGame}
      />

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
        <GameBoard
          cards={cards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          onFlip={handleCardFlip}
        />
      </div>
    </div>
  );
}