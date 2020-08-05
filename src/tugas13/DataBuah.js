import React, {Component} from "react"

class DataBuah extends Component{

  constructor(props){
    super(props)
    this.state ={
        DataBuahBuahan : [
            {nama: "Semangka", harga: 10000, berat: 1000},
            {nama: "Anggur", harga: 40000, berat: 500},
            {nama: "Strawberry", harga: 30000, berat: 400},
            {nama: "Jeruk", harga: 30000, berat: 1000},
            {nama: "Mangga", harga: 30000, berat: 500}
          ],
        inputNamaBuah : "",
        inputHargaBuah : "",
        inputBeratBuah : "",
        indexForm: -1
    }

    this.handleChangeNamaBuah = this.handleChangeNamaBuah.bind(this);
    this.handleChangeHargaBuah = this.handleChangeHargaBuah.bind(this);
    this.handleChangeBeratBuah = this.handleChangeBeratBuah.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChangeNamaBuah(event){
    this.setState({inputNamaBuah: event.target.value});
  }
  
  handleChangeHargaBuah(event){
    this.setState({inputHargaBuah: event.target.value});
  }

  handleChangeBeratBuah(event){
    this.setState({inputBeratBuah: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault()
    let newData = {nama: this.state.inputNamaBuah, harga:this.state.inputHargaBuah, berat:this.state.inputBeratBuah}
    this.setState({
        DataBuahBuahan: [...this.state.DataBuahBuahan, newData],
        inputNamaBuah : "",
        inputHargaBuah : "",
        inputBeratBuah : "",
        indexForm:-1
    })
  }

  handleUpdate(event){
    let index = event.target.value
    let buahbuahan = this.state.DataBuahBuahan[index]
    this.setState({
        inputNamaBuah : buahbuahan.nama,
        inputHargaBuah : buahbuahan.harga,
        inputBeratBuah : buahbuahan.berat,
        indexForm: index
    })
  }

  handleDelete(event){
    let index = event.target.value
    let daftarBuah = this.state.DataBuahBuahan
    let editDaftarBuah = daftarBuah[this.state.indexForm]
    daftarBuah.splice(index,1)
    if (editDaftarBuah !== undefined){
        var newIndex = daftarBuah.findIndex((el) => el === editDaftarBuah)
        this.setState({DataBuahBuahan:daftarBuah, indexForm:newIndex})
    }
    else{
        this.setState({DataBuahBuahan:daftarBuah})
    }
  }

  render(){
    return(
      <>
        <h1>Daftar Buah</h1>
        <table style={{border: "1px solid", width: "40%", margin: "0 auto"}}>
          <thead style={{background: "#aaa"}}>
            <tr>
              <th>Nama</th>
              <th>Harga</th>
              <th>Berat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{background: "coral"}}>
              {
                this.state.DataBuahBuahan.map((data,index)=>{
                  return(                    
                    <tr>
                        <td>{data.nama}</td>
                        <td>{data.harga}</td>
                        <td>{data.berat/1000} Kg</td>
                        <td>
                            <button onClick={this.handleUpdate} value={index}>Update</button>
                            <button onClick={this.handleDelete} value={index}>Delete</button>
                        </td>
                    </tr>
                  )
                })
              }
          </tbody>
        </table>
        <h1>Tambah Buah</h1>
        <form onSubmit={this.handleSubmit}>
            <table>
                <tr>
                    <td>
                        <label>
                            Masukkan Nama Buah
                        </label>     
                    </td>
                    <td>
                        <input type="text" value={this.state.inputNamaBuah} onChange={this.handleChangeNamaBuah}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            Masukkan Harga Buah
                        </label>     
                    </td>
                    <td>
                        <input type="text" value={this.state.inputHargaBuah} onChange={this.handleChangeHargaBuah}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            Masukkan Berat Buah
                        </label>     
                    </td>
                    <td>
                        <input type="text" value={this.state.inputBeratBuah} onChange={this.handleChangeBeratBuah}/>
                    </td>
                </tr>
            </table>
          <button>submit</button>
        </form>
      </>
    )
  }
}

export default DataBuah