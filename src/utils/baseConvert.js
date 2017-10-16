const alphabet = 'abcdefghijklmnpqrtsuvwxyz123456789';
const base = alphabet.length;

// convert base 10 number to our base 34 alphabet
function encode(num){
  let encoded = '';
  while (num) {
    var remainder = num % base;
    num = Math.floor(num / base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
}

// convert base 34 str to base 10 number so we can match to db ID
function decode(str){
  let decoded = 0;
  while (str){
    const index = alphabet.indexOf(str[0]); // what is the index of this char in our alphabet?
    const power = str.length - 1;
    decoded += index * (Math.pow(base, power));
    str = str.substring(1);
  }
  return decoded;
}

module.exports = {
  encode,
  decode
}
