var React=require("react");

var maincomponent = React.createClass({
  getInitialState:function() {
    return {data:null}
  }
  ,componentDidMount:function() {
    this.db=new PouchDB("samdb");

    this.db.get("a1",function(err,res){ //fetch
      if (err) {
        this.db.put({_id:"a1",title:"samsuanchen"});         //insert new record
      } else {
        this.setState({data:res.title,rev:res._rev});
      }
    }.bind(this));
  }
  ,save:function(val) {
    this.db.put({_id:"a1",title:val,_rev:this.state.rev},function(err,res){ //modify
      if (!err) {//success
        this.setState({rev:res._rev});
      } else {
        console.error(err);
      }
    }.bind(this));
  }
  ,keyPress:function(e) {
    if (e.key=="Enter") {
      this.save(e.target.value);
    }
  }
  ,onChange:function(e) {
    this.setState({data:e.target.value});
  }
  ,render: function() {
    return <div>
      <input value={this.state.data} onChange={this.onChange} onKeyPress={this.keyPress}/>
    </div>;
  }
});
module.exports=maincomponent;