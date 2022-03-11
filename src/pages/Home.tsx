import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import joinImg from '../assets/images/join.svg';

import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { database } from '../services/Firebase';

import '../style/auth.scss';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/UseAuth';

export function Home() {
    const navigator = useNavigate();
    const {user,signInWithGoogle} = useAuth()
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom(){
        if (!user){
         await signInWithGoogle();
        }
        navigator('/room/new');
    };    

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if (roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()
        // const roomRef = await ref(database,`rooms/${roomCode}`);

        if (!roomRef){
            alert('Room does not exists.');
            return;
        }

        if (roomRef.val().closedAt){
            alert('Room already closed.');
            return;
        }
            
        navigator(`/rooms/${roomCode}`);
       
    }

    return (
        <div id = "page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>O ignorante afirma,</strong>
                <strong>o sábio duvida,</strong>
                <strong>o sensato reflete!</strong>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="Saymyname" />
                    <button onClick={handleCreateRoom} className='create-room'>
                        <img src={googleIconImg} alt="google icon" />
                        Crie sua sala  com o goole
                    </button>
                    <div className='separator'>
                        Ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite  o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value = {roomCode}
                            />
                        <Button type="submit">
                            <img src={joinImg} alt="join" />
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}