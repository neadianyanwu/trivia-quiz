import React from 'react'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswers: any;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback,
    userAnswers,
    questionNr,
    totalQuestions
}) => (
    
    <div>
        <p className="number">
            Question: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html: question }} />
            {answers.map(answer => (
                <div key={answer}>
                <button disabled={userAnswers} value={answer} onClick={callback}>
                    <span dangerouslySetInnerHTML={{__html: answer}} />
                </button>
                </div>
            ))}
    </div>
  );

export default QuestionCard;