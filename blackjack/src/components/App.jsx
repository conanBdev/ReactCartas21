import { useState } from 'react'
import './App.css'
import Cards from './Cards'
import Deck from '../deck.json'
import Message from './Message'

export default function App() {
    //Agrega el evento para empezar una nueva partida al boton 'Nueva Partida'
    const event_NewGame = () => {
        newGame();
    }
    const new_round = (bet_points) => {
        add_bet_amount(bet_points)
        start_round()
    } 
    
    const [message_info, setMessageInfo] = useState([1])
    const [crupier_deck, setCrupierDeck] = useState([])//Baraja del crupier
    const [player_deck, setPlayerDeck] = useState([])//Baraja del jugador
    const [discarded_cards, setDiscardedCards] = useState([])//Baraja de cartas usadas
    const [points_wagered_in_game, setPointsWagered] = useState(0)

    function newGame() { 
        //Iniciar las puntuaciones de la partida       
        reset_points()       
        //Seleccionar la apuesta
        start_bet()
    }

    function start_bet() {
        //Cambiar el mensaje
        setMessageInfo(2)
        //Desbloquear botones de apuesta
        const buttons = document.querySelectorAll('.bj-app-stake-betting-buttons div.not-active');
        for (let i = 0; i < 5; i++) {      
            buttons[i].classList.toggle('not-active')
        }

    }

    function add_bet_amount(bet_points) {
        setPointsWagered(bet_points)
    }

    function start_round() {
        //Volver a bloquear los botones de apuesta
        const buttons_bet = document.querySelectorAll('.bj-app-stake-betting-buttons div');
        for (let i = 0; i < 5; i++) {
            buttons_bet[i].classList.toggle('not-active')
        }
        //Desbloquear botones de Dar carta o plantarse
        const buttons_actions = document.querySelectorAll('.bj-app-stake-betting-buttons div.not-active');
        for (let i = buttons_actions.length - 2; i < buttons_actions.length; i++) {
            buttons_actions[i].classList.toggle('not-active')
        }
        //Mostra el tablero de juego del crupier y el jugador
        //console.log(points_wagered_in_game) /// REVISAR!! VA CON RETRASO DE UNA ACCION  /////

        /**
         * Reparto de la primera ronda de cartas.
         */
        const  newDiscardedCards = [...discarded_cards]//Array de cartas descartadas
        //// Repartir cartas al crupier ////
        const crupier_randomIndex1 = Math.floor(Math.random() * Deck.length);
        let crupier_randomIndex2 = Math.floor(Math.random() * Deck.length);
        while (crupier_randomIndex2 === crupier_randomIndex1) {
            crupier_randomIndex2 = Math.floor(Math.random() * Deck.length);
        }    
        const selectedCardCrupier1 = Deck[crupier_randomIndex1];
        const selectedCardCrupier2 = Deck[crupier_randomIndex2];
        const newCrupierDeck = []    
        newCrupierDeck.push(selectedCardCrupier1, selectedCardCrupier2);
        setCrupierDeck(newCrupierDeck)
        // Guardar cartas usadas //
        newDiscardedCards.push(selectedCardCrupier1, selectedCardCrupier2);
        setDiscardedCards(newDiscardedCards)

        //// Repartir cartas al jugador ////
        const player_randomIndex1 = Math.floor(Math.random() * Deck.length);
        let player_randomIndex2 = Math.floor(Math.random() * Deck.length);
        while (player_randomIndex2 === player_randomIndex1) {
            player_randomIndex2 = Math.floor(Math.random() * Deck.length);
        }    
        const selectedCardPlayer1 = Deck[player_randomIndex1];
        const selectedCardPlayer2 = Deck[player_randomIndex2];
        const newPlayerDeck = []    
        newPlayerDeck.push(selectedCardPlayer1, selectedCardPlayer2);
        setPlayerDeck(newPlayerDeck)
        // Guardar cartas usadas //
        newDiscardedCards.push(selectedCardPlayer1, selectedCardPlayer2);
        setDiscardedCards(newDiscardedCards)

        /*****************************************/


        //Oculta el mensaje de inicio y muestra el tablero
        const board_message = document.querySelector('.bj-app-board-message')
        board_message.classList.toggle('oculto')

        const board_game = document.querySelector('.bj-app-board-game')
        board_game.classList.toggle('oculto')

    }

    /**
     * Añade una carta al array de cartas del jugador o del crupier según el valor de la variable, por
     * cada carta añadida aumenta el número de elementos de cartas descartadas.
     * @param {*} rol 
     */
    function give_cards(rol) {
        const newDiscardedCards = [...discarded_cards]
        const playerDeck = [...player_deck]
        const crupierDeck = [...crupier_deck]
        let randomCard

        do{
            randomCard = Math.floor(Math.random() * Deck.length)
        }while (newDiscardedCards.includes(Deck[randomCard]))

        newDiscardedCards.push(Deck[randomCard])
        setDiscardedCards(newDiscardedCards)

        if (rol == 'player') {
            playerDeck.push(Deck[randomCard])
            setPlayerDeck(playerDeck)            
        }else{
            crupierDeck.push(Deck[randomCard])
            setCrupierDeck(crupierDeck) 
        }        
    }

    return(
        <>
        <header className='bj-app bj-app-border'>
            <div className='bj-app-newgame'>
                <div>
                    <button id='button-new-game' onClick={event_NewGame}>
                        Nueva partida
                    </button>
                </div>                
                <div>
                    Fichas de inicio: 
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
                    <div className="bj-betting-button-5 not-active"><button onClick={() => new_round(5)}>5x</button></div>
                    <div className="bj-betting-button-10 not-active"><button onClick={() => new_round(10)}>10x</button></div>
                    <div className="bj-betting-button-50 not-active"><button onClick={() => new_round(50)}>50x</button></div>
                    <div className="bj-betting-button-100 not-active"><button onClick={() => new_round(100)}>100x</button></div>
                    <div className="bj-betting-button-500 not-active"><button onClick={() => new_round(500)}>500x</button></div>
                    <div className="bj-betting-button-card not-active"><button onClick={() => give_cards('player')}>Dame carta</button></div>
                    <div className="bj-betting-button-stop not-active"><button>Plantarse</button></div>
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
        <section className="bj-app-board-message">
            <div>
                <Message msg={message_info}/>
            </div>
        </section>
        <section className="bj-app-board-game oculto">            
            <div id='crupier-card' className="bj-board-crupier-card">
                <Cards rol={'crupier'} deck={crupier_deck} />
            </div>
            <div id='player-card' className="bj-board-player-card">
                <Cards rol={'player'} deck={player_deck} />
            </div>
        </section>
        </>
    )
}

function reset_points() {
    const player_points = document.getElementById('select-points').value
    const crupier_points = parseInt(player_points)*2
    document.getElementById('crupier-score').innerHTML = crupier_points
    document.getElementById('player-score').innerHTML = player_points
}
