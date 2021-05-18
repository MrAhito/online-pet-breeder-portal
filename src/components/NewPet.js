import React, { useRef, useState } from 'react'
import db, { auth } from '../firebase/firebase'
import * as Icons from 'react-icons/fa'
import Select from 'react-select'
import Axios from 'axios'
import { BreedDataCat, BreedDatadefault, BreedDataDog, PetVitamins } from './SelectData'
import LoadSc from './LoadSc'

function NewPet() {
    const [breedData, setbreedData] = useState(BreedDatadefault);
    const [petEdit, setpetEdit] = useState(false)
    const [PetName, setPetName] = useState("");
    const [Petids, setPetids] = useState("");
    const [PetBDate, setPBdate] = useState("");
    const [PetSpec, setPetSpec] = useState("");
    const [PetBreed, setPetBreed] = useState("");
    const [PetGend, setPetGend] = useState("");
    const [PetsWeight, setPetsWeight] = useState("");
    const [PetsHeight, setPetsHeight] = useState("");
    const [Deworming, setDeworming] = useState("");
    const [VinI, setVinI] = useState("");
    const [VIinI, setVIinI] = useState("");
    const [AntiRabies, setAntiRabies] = useState("");
    const [CheckUp, setCheckUp] = useState("");
    const [Vitamins, setVitamins] = useState([]);
    const [dpImg, setdpImg] = useState('https://www.shareicon.net/data/256x256/2017/02/15/878685_user_512x512.png');
    const [userIMGUp, setuserIMGUp] = useState(null);
    const hiddenFileInput = useRef(null);
    const [loadSc, setloadSc] = useState(false);

    const checker = (e, setVal) => { 
        e.preventDefault();
        setVal(e.target.value);
    }
    const onImgChange = (event, setImgFile, setImgFileUp) => {
        try{    const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setImgFile(reader.result);
                }
            }
            reader.readAsDataURL(event.target.files[0])
            setImgFileUp(event.target.files[0])}catch(error){console.error(error)}
    }    
    
const DdlHandler= (e) => {
    setVitamins(Array.isArray(e)? e.map(x => x.label): [])
}
const setDateBreed = async (e) =>{     
        if(e.target.value === 'Dog'){
            setbreedData(BreedDataDog)
        }
        if(e.target.value === 'Cat'){
            setbreedData(BreedDataCat)
        }
    }
const AddnewPet = () => { 
    console.log(PetName + '\n' + Vitamins + '\n' + PetBDate + '\n' + PetGend + '\n' + PetBreed + '\n' + PetSpec + '\n' + PetsWeight + '\n' + 
    PetsHeight + '\n' + Deworming + '\n' + AntiRabies + '\n' + VinI + '\n' + VIinI + '\n' + CheckUp)
}

    return (
        <>
        
        <img src={dpImg} onClick={(e) => {hiddenFileInput.current.click();}} className='petProfile' alt='pet'/>
        <input style={{display: 'none'}} type='file'  ref={hiddenFileInput} onChange = {(e) => {onImgChange(e,setdpImg, setuserIMGUp)}} />
        <div className='petEdi-rapper'>
            <div className='petDetails'>
                <h3 className='petdettitle'>Basic Information: </h3>
                <div className=' petdeta' ><span className='infoLabel '>Name:  </span><input onChange={(e) => {checker(e, setPetName)}} type='text' placeholder='Name: ' className='infoVal ediet'/></div>
                <div className=' petdeta' ><span className='infoLabel '>Birthdate:  </span><input onChange={(e) => {checker(e, setPBdate)}} type='date'  className='infoVal ediet' /></div>
                <div className=' petdeta' ><span className='infoLabel '>Gender:  </span>
                <select onChange={(e) => {checker(e, setPetGend)}} defaultValue="" className='infoVal ediet selecta'>
                    <option value='' disabled>Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                </select> </div>
                <div className=' petdeta' ><span className='infoLabel '>Species:  </span>
                <select onChange={(e) => { checker(e, setPetSpec); setDateBreed(e); }} defaultValue="" className='infoVal ediet selecta'>
                <option value='' disabled>Breed</option>
                    <option value='Dog'>Dog</option>
                    <option value='Cat'>Cat</option>
                </select></div>
                <div className=' petdeta' ><span className='infoLabel '>Breed:  </span>
                <select onChange={(e) => {checker(e, setPetBreed)}} className='infoVal ediet selecta'>
                {breedData.map((item, index) => {
                    return (
                        <option key={index} value={item.value}>{item.text}</option>
                    )
                })}
                </select></div>
                <div className=' petdeta' ><span className='infoLabel '>Weight:  </span><input placeholder='Weight (g)' onChange={(e) => {checker(e, setPetsWeight)}} type='text'  className='infoVal ediet' /></div>
                <div className=' petdeta' ><span className='infoLabel '>Height:  </span><input placeholder='Height (cm)' onChange={(e) => {checker(e, setPetsHeight)}} type='text'  className='infoVal ediet' /></div>
            </div>
            <div className='petDetails'>
                <h3 className='petdettitle'>Health History: </h3>
                <div className=' petdeta' ><span className='infoLabel '>Deworming:  </span><input onChange={(e) => {checker(e, setDeworming)}}  type='date'  placeholder='No Records' className='infoVal ediet'/></div>
                <div className=' petdeta' ><span className='infoLabel '>5-in-1:  </span><input onChange={(e) => {checker(e, setVinI)}}  type='date'  placeholder='No Records' className='infoVal ediet' /></div>
                <div className=' petdeta' ><span className='infoLabel '>6-in-1:  </span><input onChange={(e) => {checker(e, setVIinI)}}  type='date' placeholder='No Records'  className='infoVal ediet' /></div>
                <div className=' petdeta' ><span className='infoLabel '>Anti-Rabies:</span><input  onChange={(e) => {checker(e, setAntiRabies)}} type='date' placeholder='No Records'  className='infoVal ediet' /></div>
                <div className=' petdeta' ><span className='infoLabel '>CheckUp: </span><input  onChange={(e) => {checker(e, setCheckUp)}}  type='date' placeholder='No Records'  className='infoVal ediet' /></div>
                <div className=' petdeta' ><span className='infoLabel '>Vitamins:  </span>
                    <Select classNamePrefix='Ediet' id='tagSelect' options={PetVitamins} onChange={(e) => {DdlHandler(e)}}  isMulti isSearchable />
                </div>
            </div>
         <button className='updateBtn newpetupo' onClick={AddnewPet()} >Insert Records</button>
         <LoadSc Stat = {loadSc}/>
         </div>
        </>
    )
}

export default NewPet
