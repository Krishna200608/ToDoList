// date.js
var getDate =  function () {
    const today = new Date();
    const options = {
      weekday: "long",
      day: "numeric", 
      month: "long",
      // hour : "numeric", 
      // minute : "numeric",
      // hour12 : true
    };
    return today.toLocaleDateString("en-US", options);
  }
export {getDate};

  export function getDay() {
    const today = new Date();
    const options = {
      weekday: "long",
    };
    return today.toLocaleDateString("en-US", options);
  }

