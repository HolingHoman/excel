import {$} from "@core/dom";
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class Router {
    constructor(selector, routes) {
        if(!selector) throw new Error('Selector NON')

        this.$placeholder = $(selector)
        this.router = routes

        this.page = null

        this.changePageHandler = this.changePageHandler.bind(this)



        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    changePageHandler(){
        if(this.page) {
            this.page.destroy()
        }


        this.$placeholder.clear()

        const Page = ActiveRoute.path.includes('excel') ? this.router.excel : this.router.dashboard

        this.page = new Page(ActiveRoute.param)

        this.$placeholder.append(this.page.getRoot())

        this.page.afterRender()
    }

    destroy(){
        window.removeEventListener('hashchange', this.changePageHandler)
    }


}