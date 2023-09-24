import React, { useState } from 'react';
import { fetchQuizQuestion } from './API';

// Components
import QuestionCard from './components/QuestionCard';

// Types
import { Difficulty, QuestionState } from './API';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean
  correctAnswer: string;
}


const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(fetchQuizQuestion(TOTAL_QUESTIONS, Difficulty.EASY));
  // console.log(questions)

  const initiateTrivia =async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestion (
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const reviewAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // Users answer
      const answer = e.currentTarget.value;

      // Check answer against answer
      const correct = questions[number].correct_answer === answer;


      // Add score if answer is correct
      if (correct) setScore(prev => prev + 1);

      // Save anwer in the array for users answers
      const answerObject = {
        question: questions[number].question,
        answer: answer,
        correct:  answer === questions[number].correct_answer,
        correctAnswer: questions[number].correct_answer
      };
      
      setUserAnswers(prev => [...prev, answerObject]);
      
    }
  };

  const nextQuestion = () => {
    // Move to the next, if not the last question
    const nextQuestion = number + 1;

    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <div className="App">
      <h1>Trivia Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (<button className='start' onClick={initiateTrivia}>Start</button>) : null}

      

      {!gameOver ? <p className="score">Score:</p> : null}

      {loading && <p>Loading Questions ...</p>}

      {!loading && !gameOver && (
        <QuestionCard 
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question} 
          answers={questions[number].answers} 
          callback={reviewAnswer} 
          userAnswers={userAnswers ? userAnswers[number] : undefined} 
        />
      )}

      {!gameOver && !loading &&userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS -1 ? (
        <button className="next" onClick={nextQuestion}>Next Question</button>
      ) : null }
      
    </div>
  );
}

export default App;
