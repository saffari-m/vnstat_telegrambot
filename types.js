const TrafficCommandEnums = {
  HOURLY: "/traffic-hourly",
  DAILY: "/traffic-daily",
  MONTHLY: "/traffic-monthly",
  BACK: "/traffic-back",
};
const TrafficTypes = {
  TOTAL: { long: "total", short: "t" },
  HOURLY: { long: "hourly", short: "h" },
  DAILY: { long: "daily", short: "d" },
  MONTHLY: { long: "monthly", short: "m" },
};
module.exports = { TrafficCommandEnums, TrafficTypes };
