const process = require("process");
// console.log(process)
// console.log(Object.keys(process));
// Un prompt como output
process.stdout.write("prompt > ");
const commands = require("./commands");
// El evento STDIN 'data' se dispara cuando el usuario escribe una línea
process.stdin.on("data", function (data) {
  let cmd = data.toString().trim(); // Remueve la nueva línea
  let words = cmd.split(" "); // ["echo", "hello", "world"]
  const [command, ...arguments] = words;
  //console.log(arguments);
  commands[command](arguments);
  // if (words.length == 1 && words[0] === "pwd") {
  //   commands.pwd()
  // }
  // else if (words.length == 1 && words[0] === "date") {
  //   commands.date()
  // }
  // else if (words.length == 1 && words[0] === "ls") {
  //   commands.ls()
  // }
  // //process.stdout.write('You typed: ' + cmd);
  // // process.stdout.write(output);
  // else if (words.length > 1 && words[0] == "echo") {
  //   commands.echo(words);
  // }
});
