module.exports = {
  //Format date
  format_date: (date) => {
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
  },
  //Check if equal
  equal: function (a, b) {
    if (a === b) {
      return true;
    }
    return false;
  },
  //Substring
  subString: (content) => {
    if (content.length < 255) {
      return content;
    } else {
      return content.substring(0, 254) + "......";
    }
  },
};
