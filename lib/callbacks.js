  console.log('wait 3 started');
function wait(seconds, callback) {

  var n = seconds * 1000;

  setTimeout(callback,n );


}


function repeat (times, callback) {
  var n = times;

  for(var i = 0; i < n; i++){
    callback();
  }
}

function User () {

}

module.exports = {
  wait : wait,
  repeat : repeat,
  User : User
};