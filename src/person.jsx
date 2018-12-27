function Person(name, age) {
    function getAge() {
        return "age:" + age;
    }

    function sayHello() {
        alert("hello,my name is " + name)
    }

    function setName(newName) {
        name = newName
    }
    this.name = name
    this.setName = setName
    this.getAge = getAge
    this.sayHello = sayHello
}
var kane = new Person("kane", 20)
var jack = new Person("jack", 24)

kane.sayHello()
kane.setName("mike")
kane.sayHello()