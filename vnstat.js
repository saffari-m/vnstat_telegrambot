const { exec } = require("child_process");
const { TrafficTypes } = require("./types");
const { TDate, THumane } = require("./utils");

const getTrafficText = (rx, tx) => {
  return `Received: ${THumane().readableBytes(
    rx
  )} Transmitted: ${THumane().readableBytes(tx)}`;
};
const getTotalModeMessage = (currentInterface) => {
  rx = currentInterface.traffic.total.rx; // Total received data
  tx = currentInterface.traffic.total.tx; // Total transmitted data
  // Format the traffic data for user
  return getTrafficText(rx, tx);
};
const getHourlyModeMessage = (currentInterface) => {
  let message = "";
  const { hour = [] } = currentInterface?.traffic;
  hour.forEach((hourItem) => {
    message += `Date: ${TDate().convertToText({
      date: hourItem.date,
      time: hourItem.time,
    })} ${getTrafficText(hourItem.rx, hourItem.tx)} \n`;
  });
  return message;
};
const getDailyModeMessage = (currentInterface) => {
  let message = "";
  const { day = [] } = currentInterface?.traffic;
  day.forEach((dayItem) => {
    message += `Date: ${TDate().convertToText({
      date: dayItem.date,
    })} ${getTrafficText(dayItem.rx, dayItem.tx)} \n`;
  });
  return message;
};
const getMonthlyModeMessage = (currentInterface) => {
  let message = "";
  const { month = [] } = currentInterface?.traffic;
  month.forEach((monthItem) => {
    message += `Date: ${TDate().convertToText({
      date: monthItem.date,
    })} ${getTrafficText(monthItem.rx, monthItem.tx)} \n`;
  });
  return message;
};
const parseResponse = (error, stdout, stderr) => {
  if (error) {
    console.error(
      `Error fetching traffic data: ${stderr}`,
    );
    return;
  }

  // Parse vnstat JSON output
  return JSON.parse(stdout);
};
const collectMessage = (type, data) => {
  let message = "";
  const currentInterface = data.interfaces[0];
  console.log("DEBUG:: message inside current interface is: ", currentInterface);
  console.log("DEBUG:: message inside type is: ", type);
  if (type.short === TrafficTypes.TOTAL.short) {
    message = getTotalModeMessage(currentInterface);
  } else if (type.short === TrafficTypes.HOURLY.short) {
    message = getHourlyModeMessage(currentInterface);
  } else if (type.short === TrafficTypes.DAILY.short) {
    message = getDailyModeMessage(currentInterface);
  } else if (type.short === TrafficTypes.MONTHLY.short) {
    message = getMonthlyModeMessage(currentInterface);
  }
  console.log("DEBUG:: message inside collectMessage function is: ", message);
  return message;
};
const getVnstatByType = (type = TrafficTypes.TOTAL, callback) => {
  // Fetch vnstat data via shell command
  const command = "vnstat -i eth0 --json " + type.short + " 10";
  console.log("DEBUG:: command is: ", command);
  exec(command, (error, stdout, stderr) => {
    const response = parseResponse(error, stdout, stderr);
    callback(collectMessage(type, response));
  });
};

module.exports = { getVnstatByType };
