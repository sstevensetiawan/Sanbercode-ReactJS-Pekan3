import React, {Component} from 'react'

class Timer extends Component{
  constructor(props){
    super(props)
    this.state = {
      time: 100,
      clock: new Date().toLocaleString().split(",")[1]
    }
  }

  componentDidMount(){
    if (this.props.start !== undefined){
      this.setState({time: this.props.start})
    }
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: this.state.time - 1,
      clock: new Date().toLocaleString().split(",")[1] 
    });
  }


  render(){
    if(this.state.time == 0){
      clearInterval(this.timerID)
      return(
        <>
          <h1 style={{textAlign: "center"}}>

          </h1>
        </>
      )
    }
    else{
      return(
        <>
          <h1 style={{textAlign: "center"}}>
          <table style={{border: "0px solid", width: "100%", margin: "0 auto"}}>
            <tr>
              <td>
                Sekarang Jam :{this.state.clock}
              </td>
              <td>
                Hitung Mundur : {this.state.time}
              </td>
            </tr>
          </table>
          </h1>
        </>
      )
    }
  }
}

export default Timer