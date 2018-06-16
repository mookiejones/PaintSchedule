import * as React from 'react';
import { Component } from 'react';
import { Menu } from 'react-data-grid-addons';

var ContextMenu = Menu.ContextMenu;
var MenuItem = Menu.MenuItem;

interface ContextProps {
  onRowDelete: (e: any, data: any) => void;
  onRowInsertBelow: (e: any, data: any) => void;
  onPersistNewRow: (e: any, data: any) => void;
  multipleSelected: any;
  newRows: any;
  rowIdx: Number;
  idx: Number;
}

interface ContextState{}
export class StyleCodeEditorContextMenu extends Component<ContextProps, ContextState> {

  onRowDelete(e: any, data: any) {
    if (typeof(this.props.onRowDelete) === 'function') {
      this.props.onRowDelete(e, data);
    }
  }
  onRowInsertBelow(e: any, data: any) {
    if (typeof(this.props.onRowInsertBelow) === 'function') {
      this.props.onRowInsertBelow(e, data);
    }
  }
  onPersistNewRow(e: any, data: any) {
    if (typeof(this.props.onPersistNewRow) === 'function') {
      this.props.onPersistNewRow(e, data);
    }
  }
  render() {
    var multipleSelected = this.props.multipleSelected;
    var newRows = this.props.newRows;
    return (
      <ContextMenu>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onPersistNewRow} disabled={!newRows}>Save Row(s)</MenuItem>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowInsertBelow}>Insert Row</MenuItem>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowDelete}>Delete Row</MenuItem>
      </ContextMenu>
    );
  }
}
interface ProgramColorsContextMenuProps {
  shizz: (e: any, data: any) => void;
  parentKey: any;
 onRowAdd: (e: any, data: any) => void; 
 rowIdx: Number;
 idx: Number;
}
export class ProgramColorsContextMenu extends Component<ProgramColorsContextMenuProps>{
  onRowDelete(e: any, data: any) {
    if (typeof(this.props.shizz) === 'function') {
      console.log(this.props.parentKey);
      this.props.shizz(e, data);
    }
  }

  onRowAdd(e: any, data: any){
    if (typeof(this.props.onRowAdd) === 'function') {
      this.props.onRowAdd(e, data);
    }
  }

  render() {
    return (
      <ContextMenu>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowAdd}>Add Row</MenuItem>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowDelete}>Delete Rows</MenuItem>
      </ContextMenu>
    );
  }
}
 