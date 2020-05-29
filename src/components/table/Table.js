import {createTable} from '@/components/table/table.template'
import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {tableResize} from "@/components/table/table.resize";
import {isCell, matrix, nextSelector, shouldResize} from "@/components/table/table.functions";
import {TableSelection} from "@/components/table/TableSelection";

export class Table extends ExcelComponent{


    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    toHTML(){
        return createTable(30)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init();

        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('formula:input', text=>{
            this.selection.current.text(text)
            console.log(text)
        })
        this.$on('formula:done', ()=>{
            this.selection.current.focus()
        })
    }

    selectCell(cell){
        this.selection.select(cell)
        this.$emit('table:select', cell)
    }

    onMousedown(e){
        if(shouldResize(e)){
            tableResize(this.$root, e)
        }else if(isCell(e)){
            const $target = $(e.target)
            this.selectCell($target)
            //this.$emit('table:select', $target)
            if(e.shiftKey) {
                const celss = matrix($target, this.selection.current).map(id=>this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup(celss)
            }
            else{
                this.selection.select($target)
            }
        }
    }

    onInput(e){
        this.$emit('table:input', $(e.target))
    }

    onKeydown(e){
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp']
        const {key} = e
        if(keys.includes(key) && !e.shiftKey){
            e.preventDefault()
            const id = this.selection.current.id(true)
            const next = this.$root.find(nextSelector(key, id))
            this.selectCell(next)
        }
    }


}