import React, { useState, useEffect } from "react";
import axios from "axios";
import { FeedbackModalLayout } from "../../styles/FeedbackModalLayout";
import { MultichoiceQuestion } from "../../screen/MultichoiceQuestion";
import { TaskCompletionPopup } from "../../screen/TaskCompletionPopup";
import { TASK_ENDPOINT } from "../../../../config/api-config";

export const FeedbackModal = ({
  slide,
  url,
  taskID,
  questionID,
  taskQuestions,
  drizzle,
  drizzleState,
  task_owner_address,
}) => {
  const [indx, setIndx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(
    ...Object.keys(taskQuestions).map((x) => {
      return { [taskQuestions[x].id]: "" };
    })
  );

  // const postAnswers = useCallback(async () => {
  //   const answersBatch = Object.keys(selectedAnswer).map((x) => {
  //     return {
  //       id: x,
  //       options: [
  //         {
  //           id: selectedAnswer[x],
  //         },
  //       ],
  //     };
  //   });
  //   console.log("ANSWERS BATCH", answersBatch);
  //   await axios.post(`${TASK_ENDPOINT}${taskID}/answer/`, answersBatch);
  // }, [selectedAnswer, taskID]);

  useEffect(() => {
    const postAnswers = async () => {
      const answersBatch = Object.keys(selectedAnswer).map((x) => {
        return {
          id: parseInt(x, 10),
          options: [
            {
              id: selectedAnswer[x],
            },
          ],
        };
      });

      await axios.post(`${TASK_ENDPOINT}${taskID}/answer/`, {
        questions: answersBatch,
      });
    };
    if (indx === taskQuestions.length) {
      postAnswers();
    }
  }, [selectedAnswer, indx, taskID, taskQuestions, questionID]);

  if (indx === taskQuestions.length) {
    return <TaskCompletionPopup url={url} />;
  }

  return (
    <>
      <FeedbackModalLayout slide={slide}>
        {taskQuestions.map((x, i) => (
          <>
            <MultichoiceQuestion
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              options={x.options}
              question={x.title}
              questionId={x.id}
              setIndx={setIndx}
              questionIndx={i}
              currentIndx={indx}
            />
          </>
        ))}
      </FeedbackModalLayout>
    </>
  );
};
