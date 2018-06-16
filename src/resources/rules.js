var RuleSet = {
  rules:[
    {
      name: "No Red Before White",
      check: function(thisRow, nextRow, thisRowIdx){
        var RedRegex = /^(.*?(\b(red)\b)[^$]*)$/;
        var WhiteRegex = /^(.*?(\b(white)\b)[^$]*)$/;
        if(RedRegex.test(thisRow.color.toLowerCase())){
          if(WhiteRegex.test(nextRow.color.toLowerCase())){
            return false;
          }
        }
        return true;
      }
    },
    {
      name: "Must have color break between color runs",
      check: function(thisRow, nextRow, thisRowIdx){
        var ServiceRegex = /^(.*?(\b(service)\b)[^$]*)$/;

        if(thisRow.color != nextRow.color){
          if(thisRow.color != "" && thisRow.color != "999" && !ServiceRegex.test(thisRow.color.toLowerCase())){
            if(nextRow.color != "" && nextRow.color != "999" && !ServiceRegex.test(nextRow.color.toLowerCase())){
              console.log("("+thisRow.color+")" + " -> " + "(" + nextRow.color+")");
              return false
             };
          }
        }
        return true;
      },
      resolution: "you must insert a 999 carrier between"
    }
  ]
};

module.exports = RuleSet;
