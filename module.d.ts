declare module 'global' {
    interface String {
        hashCode:() => Number;
        formatUnicorn:()=>any;
    }
}