import './Cards.css'

export default function Cards({rol, deck}) {
    if (!deck || Object.keys(deck).length === 0) {
        return <div className='bj-app-board-info'>Realiza una apuesta para empezar.</div>;
    }

    return (
        <div>
            {deck.map((card, index) => (
                <div key={index} className="card">
                    <div className={`card-content ${card.suit === 'P' || card.suit === 'T' ? 'black' : 'red'}`}>                        
                        <p>{getIcon(card.suit)}</p>
                        <p>{card.value}</p>
                        <p>{getIcon(card.suit)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

function getIcon(icon) {
    switch (icon) {
        case 'P':
            return <img src='./src/assets/pica.svg' alt='pica'></img>
        case 'T':
            return <img src='./src/assets/trebol.svg' alt='trebol'></img>
        case 'D':
            return <img src='./src/assets/diamond.svg' alt='diamond'></img>
        case 'C':
            return <img src='./src/assets/heart.svg' alt='heart'></img>    
        default:
            break;
    }
}
