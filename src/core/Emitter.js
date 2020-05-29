export class Emitter{
    constructor() {
        this.litseners = {}
    }

    emit(eventName, ...args) {
        if(!Array.isArray(this.litseners[eventName])){
            return false;
        }
        this.litseners[eventName].forEach(el=>{
                el(...args)
            })
    }

    subscribe(eventName, fn){
        this.litseners[eventName] =  this.litseners[eventName] || []
        this.litseners[eventName].push(fn)
        return () => {
            this.litseners[eventName] = this.litseners[eventName].filter(e=> e !== fn)
        }
    }



}