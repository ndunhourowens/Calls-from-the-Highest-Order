
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
  // this empty array is for any matching keys in user
  var foundUsers = [];

  // finding the type of keys in query
  var keysInQuery = Object.keys(query);

  // find if the keys in query are in key in schema(a mock object of User)
  var hasKeys = keysInQuery.every(function(key){
    // '?' is like an if : is like an else
    // returning a boolen stating if keys in schema match keys in query
    return schema[key] ? true : false;  // returns true or false
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
  //  testUser is the objects in the datastore
  // iterating over objects in testUser
  testUsers.forEach(function(user){
    var matches = keysInQuery.every(function(key){
      // returning a true/false if there are matching keys in user and query
      return user[key] === query[key] ? true : false;
    });
    if(matches){
      // for all true matches push into the founding matching into the array
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