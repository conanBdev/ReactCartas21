import './App.css'

function newGame() {
    const player_points = document.getElementById('select-points').value
    const crupier_points = parseInt(player_points)*2

    document.getElementById('crupier-score').innerHTML = crupier_points
    document.getElementById('player-score').innerHTML = player_points
}

export default function App() {
    const event_NewGame = () => {
        newGame();
    }

    return(
        <header className='bj-app'>
            <div className='bj-app-newgame'>
                <div>
                    <button id='button-new-game' onClick={event_NewGame}>
                        Nueva partida
                    </button>
                </div>                
                <div>
                    Puntos de inicio: 
                    <select id='select-points'>
                        <option value='100' defaultValue>100</option>
                        <option value='500'>500</option>
                        <option value='1000'>1000</option>
                        <option value='2000'>2000</option>
                        <option value='5000'>5000</option>
                    </select>
                </div>                
            </div>
            <div className='bj-app-stake'>
                <div className="bj-app-stake-betting-buttons">
                    <div className="bj-betting-button-5"><button>5x</button></div>
                    <div className="bj-betting-button-10"><button>10x</button></div>
                    <div className="bj-betting-button-50"><button>50x</button></div>
                    <div className="bj-betting-button-100"><button>100x</button></div>
                    <div className="bj-betting-button-500"><button>500x</button></div>
                    <div className="bj-betting-button-card"><button>Dame carta</button></div>
                    <div className="bj-betting-button-stop"><button>Plantarse</button></div>
                </div>
            </div>
            <div className='bj-app-score'>
                <p>
                    Crupier: <span id='crupier-score'></span>
                </p>
                <p>
                    Jugador: <span id='player-score'></span>
                </p>
            </div>
        </header>
    )
}