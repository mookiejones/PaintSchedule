
import { PaintScheduleEditor } from './PaintScheduleEditor/PaintScheduleEditor';
import { StyleCodeEditor } from './StyleCodeEditor/StyleCodeEditor';
const links=[
  {title:"Schedule Editor",link:'/edit', component:PaintScheduleEditor},
  {title:"Style Codes",link:'/style-codes',component:StyleCodeEditor},
  {title:"Line View", link:'/paint-line',component:null},
  {title:'Paint App',link:'/paint-app',component:null},
  {title:'Excel Import',link:'/excel-import',component:null},
  {title:'Driver Performance',link:'/driver-performance',component:null}
];

export {links}; 
