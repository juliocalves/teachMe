import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import {FormEvent, useState} from 'react'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../style/auth.scss';
import { database } from '../services/Firebase';
import { push, ref, set } from 'firebase/database';

import { useAuth } from '../hooks/UseAuth';

export function NewRoom() {
    const {user} = useAuth();
    const navigator = useNavigate(); 
    const [newRoom, setNewRoom] = useState ('');

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if (newRoom.trim() === ''){
            return;
        }
        
        const roomRef = await ref(database,'rooms');

        const firebaseRoom = await push(roomRef);
        set(firebaseRoom, {
            title: newRoom,
            authoId: user?.id,
        });
        
        navigator(`/rooms/${firebaseRoom.key}`);
    }

    return (
        <div id = "page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas de sua audiencia em tempo real.</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="Saymyname" />
                    <h2>Criar nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Digite o nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar Sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}