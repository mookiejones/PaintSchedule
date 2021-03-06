import { Component } from 'react';
import * as classnames from 'classnames';

interface IRackOwner{
  children:string;
  currentUser:any;
}
export class RackOwner extends Component<IRackOwner>{

    render(){
      if(this.props.children != "##AVAILABLE##"){
        var name = this.props.children.split(' ');
        var lastInitial = name[1][0];
        var display = name[0] + ' ' + lastInitial;
      }
  
      var styles = classnames({
        'tap': true,
        'label': true,
        'label-success': this.props.children == "##AVAILABLE##",
        'label-info': this.props.children == this.props.currentUser.name,
        'label-primary': this.props.children != "##AVAILABLE##" && this.props.children != this.props.currentUser.name
      });
      return (
        <td className='tap' style={{textAlign: 'center', paddingTop: '25px', paddingBottom: '25px'}}>
          <span className={styles}>{this.props.children == "##AVAILABLE##" ? "AVAILABLE" : display }</span>
        </td>
      );
    }
  }