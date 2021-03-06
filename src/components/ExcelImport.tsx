import React from 'react';
import * as classnames from 'classnames';
import * as $ from 'jquery';

export class ExcelImport extends React.Component{
  getInitialState(){
    return {
      env: this.props.route.env,
      allRnds: [],
      tchdRnds: [],
      selectedIdx: 0,
      mainViewActive: true,
      btnAddDisabled: true,
      btnDeleteDisabled: true,
      importRnds: [],
      problemRows: [],
      infoTxt: '',
      alertTxt: {
        hidden: true,
        bold: '',
        normal: ''
      }
    };
  }
  componentWillMount(){
    this.loadRound();
  }
  showHide(){
    var currentViewState = this.state.mainViewActive;
    console.log(currentViewState);
    var shiz = [];
    this.state.allRnds.map(r => {
      var idx = this.state.tchdRnds.indexOf(r);
      if(idx == -1) shiz.push(r);
    });
    if(currentViewState){
      if(shiz.length < 1){
        this.setState({
          alertTxt: {
            hidden: false,
            bold: 'Ready for import',
            normal: 'No rounds to delete'
          }
        });
      }else{
        this.setState({mainViewActive: !currentViewState});
      }
    }else{
      this.setState({mainViewActive: !currentViewState});
    }

  }
  generateTable(){
    var err = false;
    var OneRC = 0;
   
    var data = this.textArea.value;
    var rows = data.split("\n");

    var tbl = rows.map((r, rIdx) => {
      return r.split("\t").map((c, cIdx) => {

        //14 = round column  eaafaf
        if(cIdx == 14){
          if(this.state.allRnds.indexOf(c) > -1)
            err = true;
        }
                
         return c;

      });
    });

    //return if columns 0, 1 and 20 are integers. styleCode, pieces, mold wip
    var baddies = [];
    var scrubbedTbl = [];
    tbl.map((r, rIdx) => {
      if(!isNaN(r[0]) && !isNaN(r[1]) && !isNaN(r[20]) && r[0] != "" && r[1] != "" && r[20] != "") {

        r[3] = isNaN(r[3]) || r[3] ==="" ? 0 : Math.round(r[3],0);  //add_take_off
        r[4] = isNaN(r[4]) || r[4] ==="" ? 0 : Math.round(r[4],0);  //total_crs
        r[10] = isNaN(r[10]) || r[10] ==="" ? 0 : Math.round(r[10],0); //blank
        r[11] = isNaN(r[11]) || r[11] ==="" ? 0 : Math.round(r[11],0);  //total_crs_2
        r[12] = isNaN(r[12]) || r[12] ==="" ? 0 : Math.round(r[12],0);  //total_pcs
        r[14] = isNaN(r[14]) || r[14] ==="" ? 0 : Math.round(r[14],0);  //round
        r[15] = isNaN(r[15]) || r[15] ==="" ? 0 : Math.round(r[15],0);  //crs_real_time
        r[16] = isNaN(r[16]) || r[16] ==="" ? 0 : Math.round(r[16],0);  //abo_1
        r[18] = isNaN(r[18]) || r[17] ==="" ? 0 : Math.round(r[18],0);  //abo_3

        scrubbedTbl.push(r);
      }else{
        baddies.push(r);
      }
    });

    OneRC = tbl[0].length;

    if(!err){
      this.setState({importRnds: scrubbedTbl, problemRows: baddies});
      this.tblCheck(OneRC, tbl.length);
    }else{
      alert("Duplicate round!");
    }
  }
  tblCheck(OneRC, RC){
    if (OneRC == 22) {
        //var DB = 'paint_schedule_master'
        if(this.revisionInput.value != '' &&  this.revisionInput.value != null && this.revisionInput.value != undefined){
          this.setState({btnAddDisabled: false, infoTxt: "Table has " + RC + " Rows and " + OneRC + " Columns."});
        }else {
          this.setState({btnAddDisabled: true, infoTxt: "Please enter a new schedule revision number"});
        }
    }
    else {
        this.setState({btnAddDisabled: true, infoTxt: "Error! Invalid number of columns data can NOT be imported to the database.\nTable has " + RC + " Rows and " + OneRC + " Columns."});
    }
  }
  toDB(){
    var length = this.state.importRnds.length;
    var data = JSON.stringify({tblData: this.state.importRnds});
    //var data = "tblData=" + this.state.importRnds;
    var revise = this.revisionInput.value;
    var url = "api/paint/savePntRevise";
    var url2 = "api/paint/pntSchlImport2"

    if(this.state.env == "development") {
      url = "api/paint/savePntReviseTest";
      url2 = "api/paint/pntSchlImport2Test";
    }

    if (revise.length > 0) {
      $.ajax({
          type: "POST",
          url: url,
          //data: "{'revise':'" + revise + "'}",          
          //contentType: "application/json; charset=utf-8",
          //dataType: "json",          
          data: "revise=" + revise,
          dataType: "text",
          success(msg) {
            console.log(msg);
              var temp;
              temp = msg.d;
              if (temp !== "0") {

              }
              else {
                  alert("ERROR! You revision was not saved.");
              }
          },
          error(request, status, error) {
              alert(request.responseText);
          }
      });
      $.ajax({
        type: "POST",
        url: url2,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success(msg) {
          console.log(msg);
          if(parseInt(msg.d) == length) alert("All rows successfully imported");
          else alert(msg.d + '/' + length + ' rows imported');
          this.textArea.value = '';
          this.loadRound();
        },
        error(request, status, error) {
            alert(request.responseText);
        }
      });
    }
  }
  deleteRound(){
    var rnd = parseInt(this.sel.options[this.state.selectedIdx].value);
    var url = (this.state.env == "production") ? "api/paint/delWholeRound" : "api/paint/delWholeRoundTest";

    if(rnd > 0){
      $.ajax({
        type: "POST",
        url: url,
        //data: "{'rnd':'" + rnd + "'}",
          data: "rnd=" + rnd,
        //contentType: "application/json; charset=utf-8",
        //dataType: "json",
          dataType: "text",
        success(msg) {
          var temp;
          temp = msg.d;
          if (temp !== 0) {
            this.loadRound();
            alert("Round: " + rnd + " has been successfully deleted.");
          }
          else {
            alert("This round can not be deleted, it has already started.");
            return;
          }
        },
        error(request, status, error) {
          alert(request.responseText);
        }
      });
    }
    //alert(this.state.selectedRnd);
  }
  deleteAll(){
    
      var url = this.state.env == "production" ? "api/paint/delWholeRound" : "api/paint/delWholeRoundTest";

    var shiz = [];
    this.state.allRnds.map(r => {
      var idx = this.state.tchdRnds.indexOf(r);
      if(idx == -1) shiz.push(r);
    });
    if(shiz.length > 0){
      $.ajax({
          type: "POST",
          url: url,
          //data: "{'rnd':'" + shiz.join(',') + "'}",
          //contentType: "application/json; charset=utf-8",
          //dataType: "json",
          data: "rnd=" + shiz.join(','),
          dataType: "text",
          success(msg) {
              var temp = msg.d.split("*");
              var retStr;
              for (var i = 0; i < temp.length; i++) {
                  var rslt = temp[i].split(",");
                  if (rslt[1] !== 0) {
                      retStr = retStr + "\nSuccess: Round " + rslt[0] + " has been deleted.\n";
                  }
                  else {
                      retStr = retStr + "\nError: Round " + rslt[0] + " has NOT be deleted.\n";
                  }
              }
              this.loadRound();
              alert(retStr);
          },
          error(request, status, error) {
              alert(request.responseText);
          }
      });
    }else{
      this.setState({
        alertTxt: {
          hidden: false,
          bold: 'Ready for import',
          normal: 'No rounds to delete'
        }
      })
    }
    //BEGIN Ajax call
  }
  onSelChange(event) {
    var id = event.nativeEvent.target.selectedIndex;
    this.setState({selectedIdx: id});
   }
  loadRound(){
    console.log(this.state.env);
    
    var url = this.state.env == "production" ? "api/paint/getRounds" : "api/paint/getRoundsTest";
    
    $.ajax({
      type: "POST",
      url: url,
      //data: "{'go':'2'}",      
      //contentType: "application/json; charset=utf-8",
      //dataType: "json",
      data: "go=2",
      dataType: "text",
      success(msg) {
          var temp;
          temp = msg.d;
          if (temp == "-1") {
              //allRnds = [];
              //tchdRnds = [];
              this.setState({allRnds: [], tchdRnds: []});
          }
          else {
              var twoLists = temp.split("@@@");
              //allRnds = twoLists[0].split("***");
              //tchdRnds = twoLists[1].split("***");
              this.setState({allRnds: twoLists[0].split("***"), tchdRnds: twoLists[1].split("***")})
              //showSetRounds();
          }
      },
      error(request, status, error) {
          alert(request.responseText);
      }
    });
  }
  render(){
    var viewStateClass = classnames({
      'hidden': this.state.mainViewActive
    });
    var viewStateClass2 = classnames({
      'hidden': !this.state.mainViewActive
    });
    var alertClass = classnames({
      'hidden': this.state.alertTxt.hidden
    });

    var d1 = this.state.btnAddDisabled;

    return(
      <div className="rdg">
        <div id="alertBox" className={alertClass}>
          <div className="alert alert-success">
            <a href="#" className="close" onClick={(e) =>{e.preventDefault(); this.setState({alertTxt: {hidden: true}})}} aria-label="close">&times;</a>
            <strong>{this.state.alertTxt.bold}</strong> - {this.state.alertTxt.normal}
          </div>
        </div>
        <div id="divDel" className={viewStateClass}>
          Select A Round To Delete:
          <select ref={c =>{this.sel = c}} onChange={this.onSelChange}>{this.state.allRnds.map(r => {
              var idx = this.state.tchdRnds.indexOf(r);
              if(idx == -1) return (<option key={r} value={r}>{r}</option>);
            })}</select><br />
          <br />
          <button className='btn btn-danger' id="btnDelete" type="button" onClick={this.deleteRound} >Delete Round</button>
          <span style={{width: '25px', color: 'white'}}>space</span>
          <button className='btn btn-danger' type="button" id="btnDelAll" onClick={this.deleteAll} >Delete All</button>
          <span style={{width: '25px', color: 'white'}}>space</span>
          <button className='btn btn-primary' type="button" id="btnBack" onClick={this.showHide} >Back</button>
        </div>
        <div id="divMain" className={viewStateClass2}>
            <table style={{width: '2075px', borderCollapse: 'separate'}}>
              <tbody>
                <tr>
                    <td style={{border: 'none'}}>
                      <h1>Paint Schedule Import Data:</h1>
                      <b>Active Rounds Within Database: </b>{this.state.allRnds.join(', ').toString() == "-1" ? "None" : this.state.allRnds.map((r, i) => {return <span key={i} className='badge'>{r}</span>})}
                      <br/>
                      <button className='btn btn-danger' id="btnDel" type="button" onClick={this.showHide} >Delete A Round</button>
                      <br/>
                      <br/>
                    <p>Copy and paste the round you would like to import from excel into the textarea below.
                        <br />
                          Next hit the <i>'Backspace'</i> <b>ONCE</b> to remove
                      the extra line return from the end of your data.
                      <br />
                          Then hit <i>'Generate Table'</i>, and if you have the correct number of columns you
                      will now be able to hit <i>'Import Data'</i>.</p>
                    </td>
                    <td style={{border: 'none', padding: '5px', margin: '5px'}}>
                        <div id="rules" style={{border: '3px solid orangered', padding: '10px', margin: '10px'}}>
                            NOTES:<br />
                            - You <b>must</b> copy and paste the data from Excel.<br />
                          - If your data does not have the correct number of columns you can <span className="auto-style1">NOT</span> import it. (17 columns)<br />
                            - Check to make sure there is not an extra line return at the end of you data(don't hit <i>'Enter'</i> after last line) this will mess up your column count.<br />
                            <a href="../images/pntExmpl.png">Example</a><br />
                        </div>
                    </td>
                </tr>
                <tr>
                  <td colSpan="3" style={{border: 'none', fontSize: '20px'}}><b>Enter Paint schedule Revision Name: </b>
                      <input type="text" id="revisTxt" ref={(i) => {this.revisionInput = i;}} style={{height: '28px', width: '150px'}} />
                      <br />
                      <br/>
                  </td>
                </tr>
                <tr>
                    <td style={{width: '840px', height: '820px', verticalAlign: 'top', border: 'none'}} >
                        <textarea ref={c => {this.textArea = c;}} id="excel_data" name="excel_data" style={{width: '825px', height: '755px'}}></textarea>
                        <br />
                        <br />
                        <table style={{border: 'none', width: '840px'}}>
                          <tbody>
                            <tr style={{border: 'none', width: '100%'}}>
                                <td style={{border: 'none', textAlign: 'left', width: '30%'}}>
                                    <button className='btn btn-primary' id="genTbl" type="button" onClick={this.generateTable} >Generate Table</button>
                                </td>
                                <td style={{border: 'none', textAlign: 'center'}}>

                                </td>
                                <td style={{border: 'none', textAlign: 'right', width: '30%'}}>
                                    <button disabled={d1} className='btn btn-primary' id="dataAdd" type="button" onClick={this.toDB} >Import Data</button></td>
                            </tr>
                            <tr>
                                <td colSpan="3" style={{border: 'none', height: '10px'}}></td>
                            </tr>
                            <tr>
                                <td colSpan="3" style={{border: 'none', height: '10px'}}></td>
                            </tr>
                            <tr>
                                <td id="show" colSpan="3" style={{border: 'none', fontSize: '20px'}}></td>
                            </tr>
                          </tbody>
                        </table>
                    </td>
                    <td rowSpan="7" style={{padding: '10px', margin: '10px', verticalAlign: 'top', border: 'none'}}>
                        <label id="tblInfo">{this.state.infoTxt}</label>
                        <br />
                          <table id="excel_table2" ref={c => this.problemTable = c}>
                            <tbody>
                              {
                                this.state.problemRows.map((r, rIdx) => {
                                  return <tr key={rIdx}>{r.map((c, cIdx) => {
                                      return <td style={{border: "2px solid red"}} key={rIdx+'-'+cIdx}>{c}</td>
                                    })
                                  }</tr>
                                })
                              }
                            </tbody>
                          </table>
                        <br />
                        <table id="result_table"></table>
                        <br />
                        <table id="excel_table" ref={c => this.excelTable = c}>
                          <tbody>
                            {
                              this.state.importRnds.map((r, rIdx) => {
                                return <tr key={rIdx}>{r.map((c, cIdx) => {
                                    return <td style={{border: "2px solid #00E500"}} key={rIdx+'-'+cIdx}>{c}</td>
                                  })
                                }</tr>
                              })
                            }
                          </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style={{border: 'none', height: '10px'}}></td>
                </tr>
                <tr>
                    <td style={{border: 'none', height: '10px'}}></td>
                </tr>
                <tr>
                    <td style={{border: 'none', height: '10px'}}></td>
                </tr>
                <tr>
                    <td style={{border: 'none', height: '10px'}}></td>
                </tr>

                <tr>
                    <td style={{border: 'none', height: '10px'}}></td>
                </tr>
                <tr>
                    <td style={{border: 'none', height: '10px'}}></td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    );
  }
}
 
