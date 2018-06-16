import React from 'react';

export class Login extends React.Component{
    getInitialState(){
      return {disabled: false}
    }
    loginUser(e){
      e.preventDefault();
  
      var userId = this.input.value;
      var role = this.select.value;
      var request = new XMLHttpRequest();
        
        request.open('GET', 'api/paint/VerifyEmpID?EmployeeID=' + userId, true);
      //request.open('POST', 'api/paint/VerifyEmpID', true);
      request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          //var temp = JSON.parse(request.response);
          //var data = temp.d;
          var data = request.response;
  
          if(data !== "-1" && data != "0") {
            if(this.input) this.input.blur();
            this.setState({disabled: true})
            this.props.setUser(userId, data, role);
          }
        } else {
        }
      };
      //request.send(JSON.stringify({EmployeeID: userId}));
      request.send();
    }
    render(){
      return(
        <div className='login-wrapper' style={{width: '250px', margin: 'auto'}}>
          <form action="" className="form-signin">
            <h2 className="form-signin-heading">Please sign in</h2>
            <label htmlFor="inputId" className="sr-only">Employee ID</label>
            <input disabled={this.state.disabled} type="text" pattern="[0-9]*" ref={(i) => this.input = i} id="inputId" className="form-control" placeholder="Employee ID" />
            <label htmlFor="selectRole" className="sr-only">Password</label>
            <select disabled={this.state.disabled} ref={(s) => this.select = s} id="selectRole" className="form-control" placeholder="Role">
              <option value="assist">Load Assist</option>
              <option value="stage">Staging</option>
              <option value="load">Load</option>
            </select>
            <br/>
            <button onClick={this.loginUser} className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          </form>
        </div>
      )
    }
  }