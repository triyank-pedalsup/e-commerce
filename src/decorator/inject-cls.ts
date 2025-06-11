//this is the simple example of the dacorator and how to use the decorator

export function InjectCls<T>(cls: { new(): T}): PropertyDecorator{
    return (target: any, propertyKey: string | symbol) => {
        target[propertyKey] = new cls();
    }
}
