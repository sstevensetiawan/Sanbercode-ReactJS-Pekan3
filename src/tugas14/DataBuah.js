import React, {useState} from "react"


const Data = () =>{
  const[dataBuah, setDataBuah] = useState([
    {nama: "Semangka", harga: 10000, berat: 1000},
    {nama: "Anggur", harga: 40000, berat: 500},
    {nama: "Strawberry", harga: 30000, berat: 400},
    {nama: "Jeruk", harga: 30000, berat: 1000},
    {nama: "Mangga", harga: 30000, berat: 500}
  ])
  const[inputNamaBuah,setNamaBuah] = useState("")
  const[inputHargaBuah,setHargaBuah] = useState("")
  const[inputBeratBuah,setBeratBuah] = useState("")
  const[indexForm,setIndexForm] = useState(-1)

  const handleChangeNamaBuah = (event) => {
    setNamaBuah(event.target.value);
  }
  
  const handleChangeHargaBuah = (event) => {
    setHargaBuah(event.target.value);
  }

  const handleChangeBeratBuah = (event) => {
    setBeratBuah(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let newData = {nama: inputNamaBuah, harga:inputHargaBuah, berat:inputBeratBuah}
    setDataBuah([...dataBuah,newData])
    setNamaBuah("")
    setHargaBuah("")
    setBeratBuah("")
    setIndexForm(-1)
  }

  const handleUpdate = (event) => {
    let index = event.target.value
    let dataEditBuah = dataBuah[index]
    setNamaBuah([dataEditBuah.nama])
    setHargaBuah([dataEditBuah.harga])
    setBeratBuah([dataEditBuah.berat])
    setIndexForm(index)
  }

  const handleDelete = (event) => {
    let index = event.target.value
    let daftarBuah = dataBuah
    let editDaftarBuah = daftarBuah[indexForm]
    daftarBuah.splice(index,1)
    if (editDaftarBuah !== undefined){
      var newIndex = daftarBuah.findIndex((el) => el === editDaftarBuah)
      setDataBuah([...daftarBuah])
      setIndexForm(newIndex)
    }
    else{
      setDataBuah([...daftarBuah])
    }
  }

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
                dataBuah.map((data,index)=>{
                  return(                    
                    <tr key={index}>
                        <td>{data.nama}</td>
                        <td>{data.harga}</td>
                        <td>{data.berat/1000} Kg</td>
                        <td>
                            <button onClick={handleUpdate} value={index}>Update</button>
                            <button onClick={handleDelete} value={index}>Delete</button>
                        </td>
                    </tr>
                  )
                })
              }
          </tbody>
        </table>
        <h1>Tambah Buah</h1>
        <form onSubmit={handleSubmit}>
            <table>
                <tr>
                    <td>
                        <label>
                            Masukkan Nama Buah
                        </label>     
                    </td>
                    <td>
                        <input type="text" value={inputNamaBuah} onChange={handleChangeNamaBuah}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            Masukkan Harga Buah
                        </label>     
                    </td>
                    <td>
                        <input type="text" value={inputHargaBuah} onChange={handleChangeHargaBuah}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            Masukkan Berat Buah
                        </label>     
                    </td>
                    <td>
                        <input type="text" value={inputBeratBuah} onChange={handleChangeBeratBuah}/>
                    </td>
                </tr>
            </table>
          <button>submit</button>
        </form>
      </>
  )
}
export default Data