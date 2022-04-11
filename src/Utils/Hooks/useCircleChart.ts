const useCircleChart = (data: number) => {
  let percentageComplete = data / 100;
  let strokeDashOffsetValue = 100 - percentageComplete * 100;

  return {
    strokeDashOffsetValue: strokeDashOffsetValue,
  };
};

export default useCircleChart;
