import React, { useEffect, useState } from 'react'
import CurrEmployee from './CurrEmployee';
import './employee.css'



function EmplyTable() {
    const [noOfEmp, setNoOfEmp] = useState(0);
    const [inputarr, setInputarr] = useState([]);
    const [currEmployeeArr, setCurrEmployeeArr] = useState([]);
    const [showCurrEmployee, setShowCurrEmployee] = useState(false);
    const [inputsearch,setInputsearch] = useState('')
    const [inputdata, setInputdata] = useState({
        name: '',
        emplyNo: '',
        inTime: '',
        outTime: '',
    })

    function handlchange(e) {
        setInputdata({ ...inputdata, [e.target.name]: e.target.value })
    }
    let { name, emplyNo, outTime, inTime } = inputdata
    function submit() {
        if(name && emplyNo && outTime && inTime){
        setInputarr([...inputarr, { name, emplyNo, outTime, inTime }])
        setInputdata({ name: '', emplyNo: '', outTime: '', inTime: '' })
        setNoOfEmp(noOfEmp + 1);
        }
        else{
            alert('Please Fill All Details')
        }
    }
    function clear(id) {
        let newarrlist = [...inputarr]
        newarrlist.splice(id, 1)
        setNoOfEmp(noOfEmp - 1)
        return setInputarr(newarrlist)
    }
    function compareTime(item) {
        let currTime = new Date().getHours() + ':' + new Date().getMinutes();
        let regex = new RegExp(':', 'g'),
            timeStr1 = item.outTime,
            timeStr2 = currTime;
        if (parseInt(timeStr1.replace(regex, '')) >= parseInt(timeStr2.replace(regex, ''))) {

            return true;
        } else {

            return false;
        }

    }
    let currVehicles = inputarr.filter((item) => {
        return compareTime(item)
    });
    useEffect(() => {
       
        setCurrEmployeeArr(currVehicles);
    }, [showCurrEmployee])


    return (

        <div>
            
            <h1>Employee Details Table</h1><br />
            <h2>Number of Employee -:{noOfEmp}</h2>
            <input
                type='text'
                name='name'
                value={inputdata.name}
                autoComplete='newpasword'
                placeholder='Employee Name...'
                onChange={handlchange}
            >
            </input>
            <br />
            <input
                type='text'
                name='emplyNo'
                value={inputdata.emplyNo}
                autoComplete='newpasword'
                placeholder='Employee No...'
                onChange={handlchange}
            >

            </input>
          
            
            <div style={{fontWeight: '900', marginTop:'1rem'}}>In-Time:-</div>
            
            <input
                type='time'
                name='inTime'
                value={inputdata.inTime}
                autoComplete='newpasword'
                placeholder=''
                onChange={handlchange}
            ></input>
           
            
            <div style={{fontWeight: '900',marginTop:'1rem'}}>Out-Time:-</div>
            

            <input
                type='time'
                name='outTime'
                value={inputdata.outTime}
                autoComplete='newpasword'
                placeholder=''
                onChange={handlchange}
            ></input>
             <br />
             <input type='search' onChange={(e)=>setInputsearch(e.target.value)}
               placeholder='SearchByNo./Name..'
               style={{height:'3rem',marginBottom:'1rem'}}></input>
             <br />
            <div className='btn'>
            <button  className = 'button'              
                onClick={submit}
            >
                Add Emp
            </button>

            <button  className = 'button' 
               
                onClick={()=>setShowCurrEmployee(true)}
            >
                Current Emp
            </button>

            <button className = 'button'                            
                onClick={() => setShowCurrEmployee(false)}
            >
                Emp History
            </button> 
            </div>
            {!showCurrEmployee ? (
               
                <table
                    border={1}
                    width='45%'
                    cellPadding={10}
                   
                >
                    <tr style={{  fontWeight: '700' }}>

                        <th>Employee Name</th>
                        <th>Employee No.</th>
                        <th>CheckInTime</th>
                        <th>CheckOutTime</th>
                        <th>clear</th>
                    </tr>
        {
                        inputarr.filter((i)=>i.name.toLowerCase().includes(inputsearch) ||
                        i.emplyNo.toLowerCase().includes(inputsearch))
                        .map((item, index) => {
                            return <tr key={index} style={{ color: 'green', background: 'blue' }}>
                                <td>{item.name}</td>
                                <td>{item.emplyNo}</td>
                                <td>{item.inTime}</td>
                                <td>{item.outTime}</td>
                                <td><button style={{background:'blue',color:'white'}}
                                onClick={() => clear(index)}>Delete</button></td>
                            </tr>
                        })
                    }
                </table>
             ) : (
                <CurrEmployee currEmployeeArr={currEmployeeArr} />)}
               </div>
    )
}

export default EmplyTable