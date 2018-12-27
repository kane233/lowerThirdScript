function Person(name, birthDate){

  function getAge() {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  function getName(){
    return name;
  };

  function sayHello(){
    alert("Hello, my name is "+ getName());
  };

  function setName(newName){
    name = newName;
  };

  var yearsOfExperience = 0;

  this.getAge = getAge;
  this.getName = getName;
  this.setName = setName;
  this.sayHello = sayHello;
};


var peter = new Person("Peter Pan",new Date(1995,0,30));
var john =  new Person("John Doe", new Date(2000,1,1));

john.sayHello();
john.setName("John Foo");
john.sayHello();
