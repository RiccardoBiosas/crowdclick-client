import React, { useEffect } from "react";
import { ItemLayout } from "../styles/MultichoiceItemStyles";
import {
  ListLayout,
  QuestionLayout,
} from "../styles/MultichoiceItemStyles";


export const MultichoiceQuestion = ({
  question,
  options,
  selectedAnswer,
  setSelectedAnswer,
  questionIndx,
  currentIndx,
  setIndx,
  questionId
}) => {


  useEffect(() => {
    if(currentIndx === questionIndx) {
      if (selectedAnswer[questionId]) {
        setIndx(currentIndx + 1);
      }
    }
 
  }, [selectedAnswer, setIndx, currentIndx, questionIndx, questionId]);



  return (
    <QuestionLayout animation={currentIndx === questionIndx && !selectedAnswer[questionId] ? "fadeIn" : "fadeOut"}>
    <h2 className="questionTitle">{question}</h2>

      <ListLayout>
        {options.map((x) => (
          <ItemLayout>
            <input
              type="radio"
              name="radioFeedbackGroup"
              checked={selectedAnswer[questionId] === x.id}
              id={x.id}
              value={x.id}
              onChange={() => setSelectedAnswer({...selectedAnswer, [questionId]: x.id})}

            />

            <label htmlFor={x.id}>{x.title}</label>

            <div className="check" />
          </ItemLayout>
        ))}
      </ListLayout>
    </QuestionLayout>
  );
};
