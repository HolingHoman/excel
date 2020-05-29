import {DOMListener} from '@core/DOMListener'

export class ExcelComponent extends DOMListener {

    constructor($root, options  = {}) {
        super($root, options.listeners);
        this.name = options.name || ''

        this.emitter = options.emitter

        this.prepare()
        this.unsubscibe = []

    }

    prepare(){}

    toHTML() {
        return '';
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    $on(event, fn){
        const unsub = this.emitter.subscribe(event,fn)
        this.unsubscibe.push(unsub)
    }

    init(){
        this.initDomListeners()
    }

    destroy(){
        this.removeDomListeners()
        this.unsubscibe.forEach(unsub => unsub())
    }

}