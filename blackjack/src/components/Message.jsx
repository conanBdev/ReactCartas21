import './Message.css';

export default function Message({msg}) {
    let info = '';
    switch (msg) {
        case 1:
            info = 'Bienvenido';
            break;
        case 2:
            info = 'Selecciona una apuesta';
            break;
        default:
            info = 'Bienvenido';
            break;
    }

    return (
        <div className="info">
            {info}
        </div>
    );
}