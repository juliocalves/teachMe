import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { RoomCode } from '../components/RoomCode';
import { Button } from '../components/Button';
import { QuestionInRoom } from '../components/QuestionInRoom';

import { useNavigate, useParams } from 'react-router-dom';
// import { useAuth } from '../hooks/UseAuth';

import '../style/room.scss'
import { useRoom } from '../hooks/UseRoom';
import { database } from '../services/Firebase';
import { NoQuestion } from '../components/NoQuestion';


type RoomParams = {
    id: string;
}

export function AdminRoom(){
    // const {user} = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id!;
    const navigator = useNavigate();
    const {title, questions} = useRoom(roomId);

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            closedAt: new Date(),
        })

        navigator('/');
    }

    async function handleCheckQuestionAsAnswered(questionId:string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }
    
    async function handleHighLightQuestion(questionId:string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    async function handleDeleteQuestion(questionId:string) {
       if (window.confirm("Tem certeza que quer excluir essa pergunta?")){
           await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
       }
    }


    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Say my name" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className='room-title'>
                    <h1>sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <QuestionInRoom
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                        type='button'
                                        onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button><button
                                        type='button'
                                        onClick={() => handleHighLightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque a pergunta" />
                                        </button>
                                    </>
                                )}
                                <button
                                type='button'
                                onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </QuestionInRoom>
                        );
                    })}
                </div>
                {questions.length < 1 && <><NoQuestion isAdmin/></>}
            </main>
        </div>
    );
}