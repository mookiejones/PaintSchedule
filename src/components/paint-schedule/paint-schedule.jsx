var React = require('react');
var update = require('react-addons-update');
var classnames = require('classnames');

var columns = [
  {
    key: 'round',
    name: 'Round',
    editable : true
  },
  {
    key: 'round_position',
    name: 'Round Position',
    editable : true
  },
  {
    key: 'style_code',
    name: 'Style Code',
    editable: true
  },
  {
    key: 'pieces',
    name: 'Pieces',
    editable : true
  },
  {
    key: 'assembly_flow',
    name: 'Assembly Flow',
    editable : true
  },
  {
      key: 'add_take_off',
      name: 'add_take_off',
      editable : true
  },
  {
    key: 'total_crs',
    name: 'Total Carriers',
    editable : true
  },
  {
      key: 'program',
      name: 'program',
      editable : true
    },
    {
      key: 'mold_skin_style',
      name: 'mold_skin_style',
      editable: true
    },
    {
      key: 'rework_color_chart',
      name: 'Rework Color Chart',
      editable : true
    },
    {
      key: 'color',
      name: 'Color',
      editable : true
    },
    {
      key: 'total_pcs',
      name: 'Total Pcs',
      editable : true
    },
    {
      key: 'customer',
      name: 'Customer',
      editable : true
    },
    {
      key: 'crs_real_time',
      name: 'crs_real_time',
      editable : true
    },
    {
      key: 'mold_wip_density',
      name: 'mold_wip_density',
      editable : true
    }
]

var PaintSchedule = React.createClass({
  getInitialState: function(){
    return {
      schedule: [],
      rows: []
    };
  },
  generateRoundHeader: function(row){
    return {};
  },
  getSchedule: function(){

    var url = this.state.env === "production" ? "../paint.asmx/GetPaintSchedule" : "../paint.asmx/GetPaintScheduleTest";
    
    $.ajax({
      method: "POST",
      url: url,
      data: JSON.stringify({ }),
      contentType: "application/json; charest=utf-8",
      dataType: "json",
      success: function (msg) {
         var data = JSON.parse(msg);
         //console.log(data);
         this.generateView(data);
         //this.setState({ schedule: update(data, {$push:[]}) })
      }.bind(this),
      error: function (request, status, error) {
         console.log(error);
      }
    });
  },
  generateView: function(data){
    var view = {};
    for(var i = 0; i < data.length; i++){
      if(!view[data[i]['round'].toString()]){
        view[data[i]['round'].toString()] = []
        view[data[i]['round'].toString()].push(data[i])
      }else{
        view[data[i]['round'].toString()].push(data[i]);
      }
    }
  },

  componentWillMount: function(){
    this.getSchedule();
  },
  render: function(){
    return(
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {columns.map(function(column_metadata, colIdx){
              return(<th>{column_metadata.name}</th>)
            })}
          </tr>
        </thead>
        <tbody>
          {
            this.state.rows.map(function(row, idx){
              return (
                <tr key={row.id} className="">
                  {columns.map(function(column_metadata, colIdx){
                        return(
                          <td className="" key={row.id + "-" + colIdx}>
                            {row[column_metadata.key]}
                          </td>
                        )
                  })}
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }
});

module.exports = PaintSchedule;
