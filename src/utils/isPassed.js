const isPassed = (totalMarks, obtainedMark, passingPercent = 0.4) => {
  return Number(obtainedMark) >= Number(passingPercent) * Number(totalMarks);
};

export default isPassed;