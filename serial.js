var SerialPort = require('serialport');


port = new SerialPort('/dev/ttyAMA0', {
  baudrate   : 115200,
  dataBits   : 8,
  parity     : 'none',
  stopBits   : 1,
  flowControl: false
  //parser: SerialPort.parsers.raw
});

port.on('close', function() {
  console.log('port closed.');
});

port.on('error', function(error) {
  console.log('Serial port error: ' + error);
});

commands = [];

commands[0] = new Uint8Array([0x40, 0x4b, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x8b, 0x0d]);
commands[1] = new Uint8Array([0x40, 0x49, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x89, 0x0d]);
commands[2] = new Uint8Array([0x40, 0x52, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x93, 0x0d]);

num = 0;
val = 0;
lap = 1;

function checkSum(commands) {
  for (var i = 0; i < 11; i++) {
    val += commands[num][i];
  }
  return val;
}

console.log("FAM Fs83 Start %s", val / 0xff);

setInterval(function() {
  return port.write(commands[num]);
}, 1000);

buffer = [];

port.on('data', function(data) {
  console.log(data);
  /*if (data[0] === 0x40) {
    console.log('begin 0x%s', data[0].toString(16));
  }
  if (data[10] === 0x40) {
    console.log('error 0x%s', data[0].toString(16));
  }
  Array.prototype.forEach.call(data, function(ch, i) {
    if (ch === 0x40) {
      console.log('found 0x%s', ch.toString(16));
    }
    if (ch === 0x0d) {
      console.log('found 0x%s', ch.toString(16));
    }
  });*/
});

