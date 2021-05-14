import React, { useState } from 'react'
import Select from 'react-select'
import './App1.css'
function Multipledd1() {
var Countryname = [
    {
        value : 1,
        label: 'India'
    },
    {
        value : 1,
        label: 'India'
    },
    {
        value : 2,
        label: 'USA'
    },
    {
        value : 3,
        label: 'Nepal'
    },
    {
        value : 4,
        label: 'Japan'
    },
    {
        value : 5,
        label: 'New Zealand'
    },
];
var [DisplayVal, getVal] = useState();

var DdlHandler = (e) =>{
    getVal( Array.isArray(e)? e.map(x => x.label): [])
}




    return (
        <>
            <Select isMulti isSearchable options={Countryname} onChange={DdlHandler} className='reactSelect' />
            <center>
                <b>The Selected Countrry Names: </b> <h3 style={{color:'red'}}>{DisplayVal + ",  "} </h3>
            </center>
        </>
    )
}

export default Multipledd1
