export function pipeline(...functions: any[]): any {
  return function(initial: any): any {
    let lastResult: any;
    for (const fn of functions) {
      lastResult = fn(lastResult || initial);
    }
    return lastResult;
  };
}
