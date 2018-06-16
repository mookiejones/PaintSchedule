persistUpdatedRows: function(){
  var changed = this.state.changedRows;
  var numChanged = changed.length;

  var url = "../paint.asmx/UpdatePaintSchedule";
  if(this.state.env == "development") url = "../paint.asmx/UpdatePaintScheduleTest";

  $.ajax({
    method: "POST",
    url: url,
    data: JSON.stringify({ss: changed}),
    contentType: "application/json; charest=utf-8",
    dataType: "json",
    success: function (msg) {
       var data = JSON.parse(msg.d);
       //persist to database
       this.setState({changedRows: []});
       console.log(data);
    }.bind(this),
    error: function (request, status, error) {
       console.log(error);
    }
  });
}

removeSelectedRows: function(){
  var key = this.props.rowKey;
  var rowsToRemove = this.state.selectedIds;

  console.log(rowsToRemove);
}

onRowExpandToggle: function({ columnGroupName, name, shouldExpand }) {
  var expandedRows = Object.assign({}, this.state.expandedRows);
  expandedRows[columnGroupName] = Object.assign({}, expandedRows[columnGroupName]);
  expandedRows[columnGroupName][name] = {isExpanded: shouldExpand};
  this.setState({expandedRows: expandedRows});
}

onRowExpandToggle: function(args){
  var expandedRows = Object.assign({}, this.state.expandedRows);
  expandedRows[args.columnGroupName] = Object.assign({}, expandedRows[args.columnGroupName]);
  expandedRows[args.columnGroupName][args.name] = {isExpanded: args.shouldExpand};
  this.setState({expandedRows: expandedRows});
}

onRowsSelected: function(rows) {
  this.setState({selectedIds: this.state.selectedIds.concat(rows.map(r => r.row[this.props.rowKey]))});
  this.setState({numSelected: this.state.numSelected += rows.length});
}

onRowsDeselected: function(rows) {
  var key = this.props.rowKey;
  var rowIds = rows.map(function(r){return r.row[key]})
  this.setState({selectedIds: this.state.selectedIds.filter(i => rowIds.indexOf(i) === -1 )});
  this.setState({numSelected: this.state.numSelected -= rows.length});
}

insertSelectedRows: function(rowIdx){
  var changedRows = this.state.changedRows;
  var rows = this.state.rows;
  var currentRound = parseInt(rows[rowIdx].round);
  var currentPos = parseInt(rows[rowIdx].round_position);
  var selectedRows = Object.assign([], Selectors.getSelectedRowsByKey({rowKey: this.props.rowKey, selectedKeys: this.state.selectedIds, rows: this.state.rows}));

  var copyiedRows = selectedRows.map((r, i) => {return update(r, {$merge:{action:"INSERT", round_position: currentPos + i, id:"TEMP-ID-" + this.state.newRows + i.toString()}})});

  for(var i = rowIdx; i < rows.length; i++){
    if(parseInt(rows[i].round) == currentRound && parseInt(rows[i].round_position) >= currentPos){
      rows[i].round_position = (parseInt(rows[i].round_position) + selectedRows.length).toString();
    }
  }
  for(var i = 0; i < copyiedRows.length; i++){
    rows.splice(i+rowIdx, 0, copyiedRows[i]);
    changedRows.push(copyiedRows[i]);
  }
  this.setState({rows: rows, changedRows: changedRows, selectedIds: [], numSelected: 0, newRows: this.state.newRows + copyiedRows.length});
}

copyToNewRound: function(e, data){
  console.log('copy to new');
}

copyToEndOfRound: function(e, data){
  console.log('copy to end');
}

copySelectedAbove: function(e, data){
  this.insertSelectedRows(data.rowIdx);
}

onDeleteSelectedRows: function(e, data) {
  var rows = this.state.rows;
  var selectedRows = Object.assign([], Selectors.getSelectedRowsByKey({rowKey: this.props.rowKey, selectedKeys: this.state.selectedIds, rows: this.state.rows}));

  var selectedIdxs = selectedRows.map(function(selected_row){
    var key = selected_row.id;
    var sIdx = -1
    rows.map(function(row, idx){
      if(row.id == key){
        sIdx = idx;
        return;
      }
    });
    return sIdx;
  });

  selectedIdxs.sort((a, b) => {return parseInt(a) - parseInt(b)})

  selectedIdxs.map((id, i) => {
    this.deleteRow(e, {rowIdx: parseInt(id) - i});
  });
  this.setState({selectedIds: [], numSelected: 0});
}
