interface ProbabilityInterval {
  start: number;
  end: number;
  agentCount: number;
}

export const initializeProbabilityIntervals = (numIntervals: number) => {
  const intervals: ProbabilityInterval[] = [];

  const step = 1 / numIntervals;

  for (let i = 0; i < numIntervals; i++) {
    const start = i * step;
    let end = (i + 1) * step;

    if (i === numIntervals - 1) {
      end = 1.0;
    }

    intervals.push({
      start: start,
      end: end,
      agentCount: 0,
    });
  }

  return intervals;
};

export const updateAgentCounts = (
  intervals: ProbabilityInterval[],
  probabilities: number[]
) => {
  for (const p of probabilities) {
    let found = false;
    for (const interval of intervals) {
      const isLastInterval = interval === intervals[intervals.length - 1];

      if (
        p >= interval.start &&
        (p < interval.end || (isLastInterval && p === 1))
      ) {
        interval.agentCount++;
        found = true;
        break;
      }
    }

    if (!found) {
      console.warn(`Probability ${p} did not match any interval.`);
    }
  }

  return intervals;
};
