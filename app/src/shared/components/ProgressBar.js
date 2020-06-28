import React from "react";
import { ProgressBarLayout } from "../progressbar-styles";

// i removed it

export const ProgressBar = ({ totalSteps, step }) => {
  return (
    <ProgressBarLayout totalSteps={totalSteps}>
      <ul>
        {Array.from({ length: totalSteps + 1 }, (v, i) => i)
          .slice(1)
          .map((x) => (
            <li
              key={`step${x}`}
              className={
                step < x ? "complete" : step === x ? "complete current" : ""
              }
            />
          ))}
      </ul>
    </ProgressBarLayout>
  );
};
