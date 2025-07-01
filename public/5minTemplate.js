const fiveMinTemplate = function (DateHelper) {
  const COL = 3;
  const ROW = 4;

  return {
    name: 'fiveMin',
    rowsCount() {
      return ROW;
    },
    columnsCount() {
      return COL;
    },
    mapping: (startTimestamp, endTimestamp, defaultValues = 0) =>
      DateHelper.intervals('minute', startTimestamp, DateHelper.date(endTimestamp))
      .filter((ts) => new Date(ts).getMinutes() % 5 === 0)
      .map(
        (ts, index) => ({
          t: ts,
          x: Math.floor(index / ROW),
          y: index % ROW,
          ...defaultValues,
        })
      ),
    extractUnit(d) {
      return DateHelper.date(d).startOf('minute').valueOf();
    },
  };
};