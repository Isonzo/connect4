import React, { useState } from 'react';

const ColorPicker = () => {
    const [player1Color, setPlayer1Color] = useState('#D44D27');
    const [player2Color, setPlayer2Color] = useState('#E2A72E');

    const handlePlayer1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayer1Color(event.target.value);
        document.documentElement.style.setProperty('--player1Color', event.target.value);
    };

    const handlePlayer2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayer2Color(event.target.value);
        document.documentElement.style.setProperty('--player2Color', event.target.value);
    };

    return (
        <div>
            <input className="color-picker" type="color" value={player1Color} onChange={handlePlayer1Change} />
            <input className="color-picker" type="color" value={player2Color} onChange={handlePlayer2Change} />
        </div>
    )
}

export default ColorPicker
