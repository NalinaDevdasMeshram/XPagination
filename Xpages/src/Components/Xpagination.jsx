import { useEffect } from "react";
import { useState } from "react";
import styles from './Xpagination.module.css'

const Xpagination = () => {
    const [tableData, setTableData] = useState([]);
    const [currentData, setCurrentData] = useState(1);
     const eachPagecontainrow = 10;

     // fetch All table data
    const handleEmplyeeData = async()=>{
try{
        const Response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
         const EmployeeData = await Response.json();
          console.log('employeesdata', EmployeeData)
          setTableData(EmployeeData)
        }
        catch(e){
            console.error('failed to fetch data', e.message)
            alert('failed to fetch data')
        }
    }
    useEffect(()=>{
     handleEmplyeeData();
    },[])
    // calculate rendering data
    const indexLastRow = currentData * eachPagecontainrow  // 1*10
    const indexfirstRow = indexLastRow - eachPagecontainrow //10-10
    const actualRowData = tableData.slice(indexfirstRow, indexLastRow)//(0, 10)

    // // handling previous button click
    //  const handlePreviousButton=()=>{
    //     if(currentData>1){
    //         setCurrentData(currentData - 1)
    //     }
    //  }
     // handling Nextbutton click
     const handleNextButton=()=>{
        if(indexLastRow < tableData.length){
         setCurrentData(currentData + 1)
        }
     }

     // handling previous button click
     const handlePreviousButton=()=>{
      if(currentData > 1){
          setCurrentData(currentData - 1)
      }
   }
  return (
    <div>
       <center><h1>Employee Data Table</h1></center> 
     <table>
        <thead style={{background:'#048c7f', color:'white'}}>
          <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
    </thead>
    <tbody>
        {actualRowData.map((rowData)=>(
          <tr key={rowData.id}>
              <td>{rowData.id}</td>
              <td>{rowData.name}</td>
              <td>{rowData.email}</td>
              <td>{rowData.role}</td>
             
          </tr>
        
        ))} 
       </tbody>
          </table>
           
        
       <div className={styles.btn} >
        <button onClick={handlePreviousButton} disabled={currentData===1}>Previous</button>
        <p>{currentData}</p>
        <button onClick={handleNextButton}  disabled={indexLastRow >= tableData.length}>Next</button>
      </div>
    </div>
  )
}

export default Xpagination