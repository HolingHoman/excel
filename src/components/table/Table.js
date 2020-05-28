import {createTable} from '@/components/table/table.template'
import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {tableResize} from "@/components/table/table.resize";
import {shouldResize} from "@/components/table/table.functions";

export class Table extends ExcelComponent{


    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        });
    }

    toHTML(){
        return createTable(30)
    }

    onMousedown(e){
        if(shouldResize(e)){
            tableResize(this.$root, e)
        }
    }

}