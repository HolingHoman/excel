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

    text(text){
        if(typeof text === 'string'){
            this.$el.textContent = text
            return this
        }
        if(this.$el.tagName.toLowerCase() === 'input'){
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }

    find(selector){
        return $(this.$el.querySelector(selector))
    }

    findAll(selector){
        return this.$el.querySelectorAll(selector)
    }

    css(styles = {}){
        Object.keys(styles).forEach(el=>this.$el.style[el] = styles[el] )
    }

    addClass(className){
        this.$el.classList.add(className)
        return this
    }

    removeClass(className){
        this.$el.classList.remove(className)
        return this
    }

    id(parse){
        if(parse){
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    focus(){
        this.$el.focus()
        return this
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