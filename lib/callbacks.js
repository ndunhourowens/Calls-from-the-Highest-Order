
function wait(seconds, callback) {

  var n = seconds * 1000;

  setTimeout(callback,n );
}


function repeat (times, callback) {
  var n = times;

  for(var i = 0; i < n; i++){
    callback(i);
  }
}

var testUsers = require('./datastore').User;

function User () {

}


User.find = function(query, callback){
  // mock object replicating the User object
  var schema = {id: 'number', name: 'string', mood: 'string'};

  var foundUsers = [];
  var keysInQuery = Object.keys(query);

  // find if the keys in query are in key in schema(a mock object of User)
  var hasKeys = keysInQuery.every(function(key){
    return schema[key] ? true : false;  // returns true or false
    // '?' is like an if : is like an else
  });
  // check if all the keys match
  if(!hasKeys){
    return callback(new RangeError('Error, matching keys not found'),foundUsers);
  }
  // check if all the type of values match

  var hasTypes = keysInQuery.every(function(key){
    return schema[key] === typeof query[key] ? true : false;
  });
  if(!hasTypes){
    return callback(new TypeError('Didnt find matching type'), foundUsers);
  }

  // check every key and value for every user
  testUsers.forEach(function(user){
    var matches = keysInQuery.every(function(key){
      return user[key] === query[key] ? true : false;
    });
    if(matches){
      foundUsers.push(user);
    }
  });
  return callback(null, foundUsers);
};

// testing the function
User.find({ id : 2},function(error, users){
  if(error){
    throw error;
  }else{
    console.log(users);
  }

});

module.exports = {
  wait : wait,
  repeat : repeat,
  User : User
};