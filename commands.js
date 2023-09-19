const process = require("process");
const fs = require("fs");
const path = require("path");

module.exports = {
  pwd: function () {
    let output = process.argv;
    for (let index = 0; index < output.length; index++) {
      if (output[index].includes("bash.js")) {
        output = output[index];
        break;
      }
    }
    process.stdout.write(output);
    process.stdout.write("\nprompt > ");
  },
  date: function () {
    let output = new Date().toString();
    process.stdout.write(output);
    process.stdout.write("\nprompt > ");
  },
  ls: function () {
    fs.readdir(".", function (err, files) {
      let str = "";
      if (err) throw err;

      for (let i = 0; i < files.length; i++) {
        str += files[i] + " ";
      }
      //console.log(files);
      process.stdout.write(str);
      process.stdout.write("\nprompt > ");
    });
  },
  echo: function (words) {
    let str = "";
    words.forEach((element) => {
      str += element + " ";
    });
    process.stdout.write(str);
    process.stdout.write("\nprompt > ");
  },
  cat: function (path) {
    //path = [path]
    fs.readFile(path[0], function (err, data) {
      //console.log(data.toString().split("\n").slice(0, 5));
      let str = "";
      if (!data) console.error("wrong path");
      else {
        str += data.toString();
        process.stdout.write(str);
        process.stdout.write("\nprompt > ");
      }
    });
  },
  head: function ([path, numLines = 5]) {
    fs.readFile(path, function (err, data) {
      if (!data) console.error("wrong path");
      let lines = data.toString().split("\n");
      let str = "";
      for (let index = 0; index < parseInt(numLines); index++) {
        str += lines[index] + "\n";
      }
      process.stdout.write(str);
      process.stdout.write("\nprompt > ");
    });
  },

  tail: function ([path, numLines = 5]) {
    fs.readFile(path, function (err, data) {
      if (!data) console.error("wrong path");
      let lines = data.toString().split("\n");
      let str = "";
      for (
        let index = lines.length - parseInt(numLines);
        index < lines.length;
        index++
      ) {
        str += lines[index] + "\n";
      }
      process.stdout.write(str);
      process.stdout.write("\nprompt > ");
    });
  },

  sort: function ([path]) {
    const minLines = function (lines, index) {
      let compareArr = [];
      let retArr = [];
      let min = 10000000;

      for (let lineT in lines) {
        if (isNaN(lineT.charCodeAt(index))) {
          retArr.push(lineT);
          min = 0;
        } else if (lineT.charCodeAt(index) < min) min = lineT.charCodeAt(index);
      }

      if (retArr.length > 0) return retArr;

      for (let lineT in lines) {
        if (lineT.charCodeAt(index) == min) {
          compareArr.push(lineT);
        }
      }

      return minLines(compareArr, index++);
    };

    fs.readFile(path, function (err, data) {
      if (!data) console.error("wrong path");
      let lines = data.toString().split("\n");
      //ordenar===========================
      let sortedLines = [];
      while (lines.length != 0) {
        let minimas = minLines(lines);
        for (let i = 0; i < lines.length; i++) {
          if (lines[i] == minLines[0]) {
            lines.splice(i, 1);
          }
        }
        sortedLines.concat(minLines);
      }

      let str = "";
      for (let line in sortedLines) {
        str += line + "\n";
      }

      process.stdout.write(str);
      process.stdout.write("\nprompt > ");
    });
  },
};
