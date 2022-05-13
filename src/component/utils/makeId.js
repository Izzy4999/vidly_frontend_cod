export function makeId(length) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz1234567890";
  let charcterLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charcterLength));
  }

  return result;
}
