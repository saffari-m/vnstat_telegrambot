const { TrafficTypes, TrafficCommandEnums } = require("./types");

const TDate = () => {
  /* 
   dataObject = 
    "data":  {
        "year": 2024,
        "month": 9,
        "day": 7
    },
    "time": {
        "hour": 7,
        "minute": 0
    } 
   */
  return {
    convertToText: (dataObject) => {
      if (Object.keys(dataObject).length === 0) return "Not valid date";
      let dataString = "";
      const { date, time } = dataObject;
      if (date) {
        if (!date.day) date.day = 1;
        dataString = `${date?.month}/${date.day}/${date.year}`;
      }
      if (time) {
        dataString += ` ${time?.hour}:${time.minute}`;
      }
      return dataString;
    },
  };
};

const THumane = () => {
  return {
    readableBytes: (bytes) => {
      if (bytes === 0) return "0 Byte";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    },
  };
};
const TTraffic = {
  getTrafficTypeFromCommandText: (trafficText = "") => {
    try {
      if (trafficText === "" || trafficText === null) return TrafficTypes.TOTAL;
      const text = trafficText.trim().toLowerCase();
      if (text) {
        switch (text) {
          case TrafficCommandEnums.HOURLY:
            return TrafficTypes.HOURLY;
          case TrafficCommandEnums.DAILY:
            return TrafficTypes.DAILY;
          case TrafficCommandEnums.MONTHLY:
            return TrafficTypes.MONTHLY;
          default:
            return TrafficTypes.DAILY;
        }
      }
    } catch (e) {
      console.error(
        "Error on extract traffic type from ",
        trafficText,
        "error:",
        e
      );
    }
  },
};
module.exports = { TDate, THumane, TTraffic };
