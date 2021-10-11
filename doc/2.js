class Person {
  say() {
    console.log(this);
  }
  speak = () => {
    console.log(this);
  };
}
let p = new Person();
p.say();
p.speak();
