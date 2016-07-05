var SerialPort   = require('serialport');
var wpi          = require('wiring-pi');
/*var raspi        = require('raspi-io');
var five         = require('johnny-five');

var board = new five.Board({
  io: new raspi()
});*/

wpi.setup('gpio');

var Primus = require('primus.io');

var buzz = 12;
var ledr = 21;
var ledg = 20;
var ledb = 16;

var pin = ledg;

wpi.pinMode(pin, wpi.OUTPUT);

var value = 1;

port = new SerialPort('/dev/ttyAMA0', {
  baudRate: 115200,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,
  parser: SerialPort.parsers.byteLength(13)
}, function (err) {
  if (err) {
    return console.log('Error: ', err.message);
  }
});

port.on('close', function() {
  console.log('port closed.');
});

port.on('error', function(error) {
  console.log('Serial port error: ' + error);
});

commands = [];

commands[0] = new Uint8Array([0x40, 0x4b, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x8b, 0x0d]); // check        40 4b 00 00 00 00 00 00 00 00 00 8b 0d
commands[1] = new Uint8Array([0x40, 0x49, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x89, 0x0d]); // capture      40 49 00 00 00 00 00 00 00 00 00 89 0d 
commands[2] = new Uint8Array([0x40, 0x52, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x93, 0x0d]); // compare vip  40 52 00 00 00 00 00 00 00 00 01 93 0d 
commands[3] = new Uint8Array([0x40, 0x4c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0d]); // cancel       40 4c 00 00 00 00 00 00 00 00 00 00 0d

num  = 0;
mode = 0;
val  = 0;

function checkSum(commands) {
  for (var i = 0; i < 11; i++) {
    val += commands[i];
  }
  return val;
}

console.log("FAM Fs83 Start %s", checkSum(commands[num]) / 0xff);

setInterval(function() {
  port.write(commands[num]);
  wpi.digitalWrite(pin, value);
  value = +!value;
}, 500);

buffer = [];

port.on('data', function(data) {

  console.log(data, num);

  if (data[10] == 0x40 || data[10] == 0x49) {
    console.log(commands[num]);
    if (num == 1) {
      num = 2;
    } else {
      num = 1;
    }
  } else {
    num = 0;
  }
});
