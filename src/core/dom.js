class DOM{
    constructor(selector) {
        this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector
    }

    html(html){
        if(typeof html === 'string'){
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    clear(){
        this.html('')
        return this
    }

    append(node){
        if(node instanceof DOM){
            node = node.$el
        }

        if(Element.prototype.append){
            this.$el.append(node)
        }else{
            this.$el.appendChild(node)
        }
        return this
    }

    on(eventType, fn){
        this.$el.addEventListener(eventType, fn)
    }

    off(eventType, fn){
        this.$el.removeEventListener(eventType, fn);
    }

    closest(selector){
        return $(this.$el.closest(selector))
    }

    getCordes(){
        return this.$el.getBoundingClientRect()
    }

    get data(){
        return this.$el.dataset
    }


    findAll(selector){
        return this.$el.querySelectorAll(selector)
    }

    css(styles = {}){
        Object.keys(styles).forEach(el=>this.$el.style[el] = styles[el] )
    }

}

export function $(selector) {
    return new DOM(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);
    if(classes){
        el.classList.add(classes)
    }
    return $(el)
}