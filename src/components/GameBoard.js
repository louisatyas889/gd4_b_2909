import React from 'react';
import Card from './Card';

function GameBoard({ cards, flippedCards, matchedCards, onFlip }) {
    // TAMBAHAN: Logika untuk mengatur jumlah kolom agar tampilan tetap rapi
    // Jika 8 kartu (Easy) -> 4 kolom
    // Jika 12 kartu (Medium) -> 4 kolom (3 baris)
    // Jika 16 kartu (Hard) -> 4 kolom (4 baris)
    // Kita bisa tambahkan transisi halus agar perpindahan grid terasa nyaman
    
    return (
        <div className={`grid gap-4 justify-items-center transition-all duration-500 
            ${cards.length > 12 ? 'grid-cols-4' : 'grid-cols-4'}`}>
            
            {cards.map(card => (
                <Card
                    key={card.id}
                    card={card}
                    isFlipped={flippedCards.includes(card.id)}
                    isMatched={matchedCards.includes(card.id)}
                    onFlip={onFlip}
                />
            ))}
        </div>
    );
}

export default GameBoard;