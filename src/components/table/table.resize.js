import {$} from "@core/dom";

export function tableResize($root, e) {
    const $resizer = $(e.target);
    const $parent = $resizer.closest('[data-type="resizable"]')
    const cords = $parent.getCordes()
    const type = $resizer.data.resize
    const sideProp = type === 'coll' ? 'bottom' : 'right'
    let value;
    $resizer.css({opacity: 1, [sideProp]: '-2000px'})
    document.onmousemove = event =>{
        if(type === 'coll'){
            const delta = event.pageX - cords.right
            value = (cords.width + delta)
            $resizer.css({right: -delta + 'px'})
        }else{
            const delta = event.pageY - cords.bottom
            value = (cords.height + delta)
            $resizer.css({bottom: -delta + 'px'})
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        if(type === 'coll'){
            $parent.css({width: value + 'px'})
            $root.findAll(`[data-col="${$parent.data.col}"]`).forEach(el => el.style.width = value + 'px' )
        }else{
            $parent.css({height: value + 'px', bottom: '0'})
        }

        $resizer.css({opacity: 0, bottom: 0, right: 0})
    }
}