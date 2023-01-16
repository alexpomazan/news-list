export function debounce(delay: number = 300): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    let timeoutId: number | undefined;

    const original = descriptor.value;

    descriptor.value = function (...args: any) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => original.apply(this, args), delay);
    };

    return descriptor;
  };
}
