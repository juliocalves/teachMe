import { ReactNode } from 'react';
import classnames from 'classnames';

import '../style/question.scss'

type QuestionProps = {
    author: {
        name: string;
        avatar: string;
    };
    content:string;
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

export function QuestionInRoom({
    content,
    author,
    isAnswered  = false,
    isHighlighted = false,
    children,
}: QuestionProps){
    return(
        <div className={classnames(
            'question',
            {answered : isAnswered},
            {highlited : isHighlighted && !isAnswered},
            )}
        >
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}