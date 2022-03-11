import classnames from 'classnames';
import { Link } from 'react-router-dom';

import emptyQuestionsImg from '../assets/images/empty-questions.svg';
import '../style/noquestion.scss';

type NoQuestionProps = {
    isAdmin?: boolean;
}

export function NoQuestion({isAdmin = false}:NoQuestionProps){
    return(
        <div className={classnames(
            'no-question',
            {isAdminPage:isAdmin}
            )}>
            <img src={emptyQuestionsImg} alt="Sem perguntas por aqui" />
            <p>Nenhuma pergunta por aqui...</p>
            {!isAdmin &&
                <span>Faça o seu <Link to="/">login</Link> e seja a primeira pessoa a fazer uma pergunta!</span>
            }
            {isAdmin && 
                <span>Envie o código desta sala para seus amigos e comece a responder perguntas!</span>
            }
        </div>
    )
}