import React from 'react'

function CurrEmployee({currEmployeeArr}) {
  return (
    <div>
        <table
    border={1}
    width='25%'
    cellPadding={10}
>
    <tr style={{ background: '#00FFFF', color: 'red', fontWeight: '700' }}>

        <th>Employee Name</th>
        <th>Employee No.</th>
        <th>CheckInTime</th>
        <th>CheckOutTime</th>
    </tr>
    {
        currEmployeeArr.map((item, index) => {
            return <tr key={index} style={{ color: 'white', background: 'blue' }}>

                <td>{item.name}</td>
                <td>{item.carNo}</td>
                <td>{item.inTime}</td>

                <td>{item.outTime}</td>

                            </tr>
        })
    }
</table>

</div>
)
}



export default CurrEmployee