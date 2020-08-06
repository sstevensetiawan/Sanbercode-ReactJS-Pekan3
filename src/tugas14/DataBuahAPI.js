import React, {useState,useEffect} from "react"
import Axios from "axios"


const Data = () =>{
  const[dataBuah, setDataBuah] = useState(null)
  const[inputNamaBuah,setNamaBuah] = useState("")
  const[inputHargaBuah,setHargaBuah] = useState("")
  const[inputBeratBuah,setBeratBuah] = useState("")
  const[indexForm,setIndexForm] = useState(-1)
  const[status,setStatus] = useState("Submit")

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
    let nama = inputNamaBuah
    let harga = inputHargaBuah
    let berat = inputBeratBuah
    if (nama.replace(/\s/g,'') !== ""){      
      if (status === "Submit"){        
        Axios.post(`http://backendexample.sanbercloud.com/api/contestants`, {nama,harga,berat})
        .then(res => {
            setDataBuah([...dataBuah, {id: res.data.id, name: nama, price: harga, weight: berat}])
        })
      }else if(status === "Update"){
        Axios.put(`http://backendexample.sanbercloud.com/api/contestants/${indexForm}`, {nama,harga,berat})
        .then(res => {
            let dataBuah1 = dataBuah.find(el=> el.id === indexForm)
            dataBuah1.name = nama
            dataBuah1.price = harga
            dataBuah1.weight = berat
            setDataBuah([...dataBuah])
        })
      }
    }
    setStatus("Submit")
    setIndexForm(-1)
    setNamaBuah("")
    setHargaBuah("")
    setBeratBuah("")
  }

  const handleUpdate = (event) => {
    let index = parseInt(event.target.value)
    let dataEditBuah = dataBuah.find(x=> x.id === index)
    setNamaBuah(dataEditBuah.name)
    setHargaBuah(dataEditBuah.price)
    setBeratBuah(dataEditBuah.weight)
    setIndexForm(index)
    setStatus("Update")

  }

  const handleDelete = (event) => {
    let index = parseInt(event.target.value)
    let newDataBuah = dataBuah.filter(el => el.id != index)
    Axios.delete(`http://backendexample.sanbercloud.com/api/fruits/${index}`)
    .then(res => {
      console.log(res)
    })
    setDataBuah([...newDataBuah])

  }

  useEffect( () => {
    if (dataBuah === null){
      Axios.get(`http://backendexample.sanbercloud.com/api/fruits`)
      .then(res => {
        setDataBuah(res.data.map(el=>{ return {id: el.id, name: el.name, price: el.price, weight: el.weight}} ))
      })
    }
  }, [dataBuah])


  return(
    <>
      <h1>Daftar Buah</h1>
        <table style={{border: "1px solid", width: "40%", margin: "0 auto"}}>
          <thead style={{background: "#aaa"}}>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Harga</th>
              <th>Berat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{background: "coral"}}>
              {
                dataBuah !== null && dataBuah.map((data, index)=>{
                  return(
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{data.name}</td>
                      <td>{data.price}</td>
                      <td>{data.weight/1000} Kg</td>
                      <td>
                        <button onClick={handleUpdate} value={data.id}>Update</button>
                        <button onClick={handleDelete} value={data.id}>Delete</button>
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