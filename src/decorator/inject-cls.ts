export function InjectCls<T>(cls: { new(): T}): PropertyDecorator{
    return (target: any, propertyKey: string | symbol) => {
        target[propertyKey] = new cls();
    }
}