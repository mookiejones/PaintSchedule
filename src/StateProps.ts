
export interface IPaintScheduleEditorProps{
    changedRows:Array<any>;
    environment:any;
  }
export  interface IPaintScheduleEditorState{
    changedRows:Array<any>;
    styleCodes:Array<any>;
    programColors:any;
    rows:Array<any>;
    newRows:any;
    insertingRow:boolean;
    selectedRound:any;
    queuedUpdates:any;
    env:any;
    initialRows:Array<any>;
    selectedIds:Array<any>;
    numSelected:Number;
  }
 export interface INotesFormatterProps {
    value:string;
  }
  
export interface IReactiveBtnProps{
    numChanged:Number;
    clickEvent:any;  
    text:string;
  }