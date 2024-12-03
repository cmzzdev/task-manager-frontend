interface statusValues {
  value: string;
  color: string;
}

type customStatusTasks = {
  [key: string]: statusValues;
};

export const statusDictionary: customStatusTasks = {
  pending: {
    value: "Pending",
    color: "border-t-slate-500",
  },
  onHold: {
    value: "On hold",
    color: "border-t-red-500",
  },
  inProgress: {
    value: "In progress",
    color: "border-t-blue-500",
  },
  underReview: {
    value: "Under review",
    color: "border-t-amber-500",
  },
  completed: {
    value: "Completed",
    color: "border-t-emerald-500",
  },
};
