import moment from "moment";

const getCurrentWeek = () => {
  let currentDate = moment();

  let weekStart = currentDate.clone().startOf("isoWeek");
  let weekEnd = currentDate.clone().endOf("isoWeek");

  let days = [];

  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, "days").format("YYYY-MM-DD"));
  }
  return days;
};

const getLastWeek = () => {
  let weekStart = moment().subtract(1, "weeks").startOf("isoWeek");
  let weekEnd = moment().subtract(1, "weeks").endOf("isoWeek");
  let days = [];

  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, "days").format("YYYY-MM-DD"));
  }
  return days;
};

const getDaysOfMonth = () => {
  return new Array(moment().daysInMonth())
    .fill(null)
    .map((x, i) =>
      moment().startOf("month").add(i, "days").format("YYYY-MM-DD")
    );
};

const getDaysOfLastMonth = () => {
  return new Array(moment().subtract(1, "months").daysInMonth())
    .fill(null)
    .map((x, i) =>
      moment()
        .subtract(1, "months")
        .startOf("month")
        .add(i, "days")
        .format("YYYY-MM-DD")
    );
};

export default {
  getCurrentWeek,
  getLastWeek,
  getDaysOfMonth,
  getDaysOfLastMonth,
};
