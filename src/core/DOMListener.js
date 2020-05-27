import {cupitalize} from '@core/utils'

export class DOMListener {
    constructor($root, listeners = []) {
        if(!$root){
            throw new Error('No $root')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDomListeners(){
        this.listeners.forEach(listener => {

            const method = getMethodName(listener)

            if(!this[method]){
                throw new Error(`MEthod ${method} is not esist${this.name}`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDomListeners() {
        this.listeners.forEach(listener=>{
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }

}


function getMethodName(eventName) {
    return 'on' + cupitalize(eventName);
}