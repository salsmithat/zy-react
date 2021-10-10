/**
 * arguments没有slice方法
 */
function create() {
  //   console.log(arguments.slice(2));
  console.log(Array.prototype.slice.call(arguments, 2));
}
create(1, 2, 3, 4, 5);
