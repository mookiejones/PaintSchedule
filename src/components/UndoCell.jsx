import React from 'react';

var styles = ['green', 'yellow', 'orange', 'red', 'purple', 'blue']
export default class UndoCell extends React.Component{
    render(){
      switch (this.props.role) {
        case 'load':
          if(this.props.rowData[this.props.rowData.length - 3] != "##AVAILABLE##" && this.props.rowData[this.props.rowData.length - 2] != "##AVAILABLE##") return <td style={{fontSize: '45px'}} className={'undo ' + 'rack-group-' + styles[parseInt(this.props.rowData[3]) % styles.length]}><i className='fa fa-undo'></i></td>
          return <td className={'tap rack-group-' + styles[parseInt(this.props.rowData[3]) % styles.length]}>{this.props.rowData[10]}</td>
          break;
        case 'stage':
          if(this.props.rowData[this.props.rowData.length - 2] != "##AVAILABLE##") return <td style={{fontSize: '45px'}} className={'undo ' + 'rack-group-' + styles[parseInt(this.props.rowData[3]) % styles.length]}><i style={{paddingLeft: '5px'}} className='fa fa-undo'></i></td>
          return <td className={'tap rack-group-' + styles[parseInt(this.props.rowData[3]) % styles.length]}>{this.props.rowData[10]}</td>
          break;
        case 'assist':
          if(this.props.rowData[this.props.rowData.length - 1] == this.props.currentUser.name) return <td style={{fontSize: '45px'}} className={'undo ' + 'rack-group-' + styles[parseInt(this.props.rowData[3]) % styles.length]}><i style={{paddingLeft: '5px'}} className='fa fa-undo'></i></td>
          return <td className={'tap rack-group-' + styles[parseInt(this.props.rowData[3]) % styles.length]}>{this.props.rowData[10]}</td>
          break;
        default:
          return <td></td>
      }
    }
  }