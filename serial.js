var SerialPort   = require('serialport');
var wpi          = require('wiring-pi');
var sleep        = require('sleep');
var moment       = require('moment');

wpi.setup('gpio');

var Primus = require('primus.io');

var buzz = 12;
var ledr = 21;
var ledg = 20;
var ledb = 16;

wpi.pinMode(buzz, wpi.OUTPUT);
wpi.pinMode(ledr, wpi.OUTPUT);
wpi.pinMode(ledg, wpi.OUTPUT);
wpi.pinMode(ledb, wpi.OUTPUT);

var cleanPins = function () {
  wpi.digitalWrite(buzz, 0);
  wpi.digitalWrite(ledr, 0);
  wpi.digitalWrite(ledg, 0);
  wpi.digitalWrite(ledb, 0);
}

var fingerError = function () {
  cleanPins();
  wpi.digitalWrite(ledr, 1);
  wpi.digitalWrite(buzz, 1);
  sleep.usleep(1000 * 1000);
  wpi.digitalWrite(buzz, 0);
  wpi.digitalWrite(ledr, 0);
}

var beepSound = function () {
  for (var i = 0; i < 3; i++) {
    wpi.digitalWrite(buzz, 1);
    sleep.usleep(50 * 1000);
    wpi.digitalWrite(buzz, 0);
    sleep.usleep(100 * 1000);
  };
}

var fingerSuccess = function () {
  cleanPins();
  wpi.digitalWrite(ledg, 1);
  wpi.digitalWrite(buzz, 1);
  sleep.usleep(50 * 1000);
  wpi.digitalWrite(buzz, 0);
  sleep.usleep(3000 * 1000);
  wpi.digitalWrite(ledg, 0);
}

var famReady = function () {
  cleanPins();
  wpi.digitalWrite(ledb, 1);
  beepSound();
}

var famReadyMute = function () {
  wpi.digitalWrite(ledb, 1);
}

var fingerCapture = function () {
  cleanPins();
  wpi.digitalWrite(ledr, 1);
  wpi.digitalWrite(ledg, 1);
}

var fingerFound = function () {
  wpi.digitalWrite(buzz, 1);
  sleep.usleep(50 * 1000);
  wpi.digitalWrite(buzz, 0);
  sleep.usleep(1500 * 1000);
}

steps = [];

var operationState = function (state) {
  cleanPins();
  if (state === 1) {
    fingerFound();
    //fingerError();
    fingerSuccess();
  }
  famReadyMute();
}

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

cleanPins();
//fingerSuccess();
famReady();
//fingerError();
//fingerCapture();

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
  if (num !== 0 ) {
    operationState(num);
  }
}, 50);

setInterval(function() {
  port.write(commands[num]);
}, 500);

buffer = [];

port.on('data', function(data) {

  console.log(data, num);

  if (data[10] == 0x40 || data[10] == 0x49) {
    //console.log(commands[num]);
    if (num == 1) {
      num = 2;
    } else {
      num = 1;
    }
  } else {
    num = 0;
  }
});
