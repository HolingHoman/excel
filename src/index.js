import {Excel} from '@/components/excle/Excel'
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toollbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";

import './scss/index.scss'

const excle = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table]
});

excle.render()