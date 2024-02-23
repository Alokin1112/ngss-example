// Dekorator oznaczający metody
function MethodDecorator(dayOfWeek: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            const result = originalMethod.apply(this, args);
            console.log(`Wywołano metodę ${propertyKey} w dniu ${dayOfWeek}`);
            return result;
        };

        return descriptor;
    };
}

class Executer {
    // Metoda, która wywołuje oznaczone metody dla danego dnia tygodnia
    static exec(obj: any, dayOfWeek: string) {
        const prototype = Object.getPrototypeOf(obj);
        const methods = Object.getOwnPropertyNames(prototype);

        methods.forEach(methodName => {
            const method = obj[methodName];
            const methodDayOfWeek = Reflect.getMetadata('dayOfWeek', obj, methodName);

            if (typeof method === 'function' && methodDayOfWeek === dayOfWeek && method !== obj.constructor) {
                method();
            }
        });
    }
}

class MyClass {
    @MethodDecorator('poniedziałek')
    method1() {
        console.log('Metoda 1 wywołana');
    }

    @MethodDecorator('wtorek')
    method2() {
        console.log('Metoda 2 wywołana');
    }
}

const instance = new MyClass();
Executer.exec(instance, 'poniedziałek'); // Wywołuje tylko metody oznaczone dla poniedziałku
