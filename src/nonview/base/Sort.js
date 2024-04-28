export default class Sort {
  static cmpDim(func) {
    return function (a, b) {
      return func(a) - func(b);
    };
  }
}
