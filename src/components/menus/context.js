var React = require('react');
var ReactDataGridPlugins = require('react-data-grid-addons');

var ContextMenu = ReactDataGridPlugins.Menu.ContextMenu;
var MenuItem = ReactDataGridPlugins.Menu.MenuItem;
var SubMenu = ReactDataGridPlugins.Menu.SubMenu;

var StyleCodeEditorContextMenu = React.createClass({
  onRowDelete: function(e, data) {
    if (typeof(this.props.onRowDelete) === 'function') {
      this.props.onRowDelete(e, data);
    }
  },
  onRowInsertBelow: function(e, data) {
    if (typeof(this.props.onRowInsertBelow) === 'function') {
      this.props.onRowInsertBelow(e, data);
    }
  },
  onPersistNewRow: function(e, data){
    if (typeof(this.props.onPersistNewRow) === 'function') {
      this.props.onPersistNewRow(e, data);
    }
  },
  render: function() {
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
});

var ProgramColorsContextMenu = React.createClass({
  onRowDelete: function(e, data) {
    if (typeof(this.props.shizz) === 'function') {
      console.log(this.props.parentKey);
      this.props.shizz(e, data);
    }
  },
  onRowAdd: function(e, data){
    if (typeof(this.props.onRowAdd) === 'function') {
      this.props.onRowAdd(e, data);
    }
  },
  render: function() {
    return (
      <ContextMenu>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowAdd}>Add Row</MenuItem>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowDelete}>Delete Rows</MenuItem>
      </ContextMenu>
    );
  }
});

export { StyleCodeEditorContextMenu, ProgramColorsContextMenu }
