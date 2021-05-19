import axios from 'axios';
import React, { useRef, useState } from 'react'
import Select from 'react-select'
import db from '../firebase/firebase';
import LoadSc from './LoadSc';
import { BreedDataCat, BreedDatadefault, BreedDataDog, PetVitamins } from './SelectData'

function NewPet(props) {
    const [breedData, setbreedData] = useState(BreedDatadefault);
    const [PetName, setPetName] = useState("");
    const [PetBDate, setPBdate] = useState("");
    const [PetSpec, setPetSpec] = useState("");
    const [PetBreed, setPetBreed] = useState("");
    const [PetGend, setPetGend] = useState("");
    const [PetsWeight, setPetsWeight] = useState("");
    const [PetsHeight, setPetsHeight] = useState("");
    const [Deworming, setDeworming] = useState("");
    const [petAge, setpetAge] = useState("");
    const [VinI, setVinI] = useState("");
    const [VIinI, setVIinI] = useState("");
    const [AntiRabies, setAntiRabies] = useState("");
    const [CheckUp, setCheckUp] = useState("");
    const [Vitamins, setVitamins] = useState([]);
    const [dpImg, setdpImg] = useState('https://www.shareicon.net/data/256x256/2017/02/15/878685_user_512x512.png');
    const [userIMGUp, setuserIMGUp] = useState(null);
    const hiddenFileInput = useRef(null);
    const [loadSc, setloadSc] = useState(false);
    const [breeding, setbreeding] = useState(false);

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
    const dateDiff =(e) =>{ 
        const date1 = new Date (e.target.value)
        const date2 = new Date('05-21-2021')
        const res = date2 - date1
        return  Math.ceil(res/(1000 * 60 * 60 * 24 * 30))
    }
const AddnewPet = async () => { 
    if(PetName === "" || PetBDate === "" || PetGend === ""  ||  PetBreed === "" || PetSpec === "" || PetsWeight === "" || 
    PetsHeight === ""){
        alert('Please fill requiered fields')
    }else{
        setloadSc(true)
        var a = dpImg;
        if(!(userIMGUp === null)){
             a = await uploadImage(userIMGUp);
            console.log("Link user fetch: "  + a);
         }
        const refer = db.collection("pets/");
        await refer.add({
            Timestamp : new Date(),
            photoURL : a,
            Name : PetName,
            Birthdate : PetBDate,
            Owner : props.firstName + " " + props.lastName,
            OwnerId : props.useID,
            Gender : PetGend,
            Breed : PetBreed,
            Species : PetSpec,
            Age : petAge,
            Breeding : breeding,
            Weight : PetsWeight + "(g)",
            Height : PetsHeight + " (cm)",
            Deworm : Deworming,
            VIinI : VIinI,
            Vin1 : VinI,
            AntiRabies : AntiRabies,
            CheckUp : CheckUp,
            Vitamins : Vitamins,
        }).then(res => {
            db.doc("pets/"+res.id).set({PetId : res.id,}, { merge: true })
            console.log("Pet Details inserted")
            window.location.reload(false)
            setloadSc(false);
    });
            alert('Records has been Updated');
          
    }
}
async  function uploadImage (imgUser) {
    const  formData = new FormData()
    var linking = ''
   formData.append('file', imgUser, imgUser.name);
   formData.append('upload_preset', 'r5byh8yh')
   await axios.post("https://api.cloudinary.com/v1_1/pet-breeding/image/upload", formData, {
       onUploadProgress : progressEvent => {
           console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')}
   }).then(res => { 
       const link = res.data.url
       linking = link;
   })
   .catch (err => { console.error(err)})
     return(linking)
}

    return (
        <>
        
        <img src={dpImg} onClick={(e) => {hiddenFileInput.current.click();}} className='petProfile' alt='pet'/>
        <input style={{display: 'none'}} type='file'  ref={hiddenFileInput} onChange = {(e) => {onImgChange(e,setdpImg, setuserIMGUp)}} />
        <div className='petEdi-rapper'>
            <div className='petDetails'>
                <h3 className='petdettitle'>Basic Information: </h3>
                <div className=' petdeta' ><span className='infoLabel '>Name:<span className='asterisk'>*</span></span><input onChange={(e) => {checker(e, setPetName)}} type='text' placeholder='Name: ' className='infoVal ediet'/></div>
                <div className=' petdeta' ><span className='infoLabel '>Birthdate:<span className='asterisk'>*</span>  </span><input onBlur={(e) => {checker(e, setPBdate); setpetAge(dateDiff(e));
                        if(dateDiff(e) < 6){ setbreeding(false); alert('Your Pet is Not Eligile for Breeding') }else{setbreeding(true)}
                    }} type='date'  className='infoVal ediet' /></div>
                <div className=' petdeta' ><span className='infoLabel '>Gender:<span className='asterisk'>*</span>  </span>
                <select onChange={(e) => {checker(e, setPetGend)}} defaultValue="" className='infoVal ediet selecta'>
                    <option value='' disabled>Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                </select> </div>
                <div className=' petdeta' ><span className='infoLabel '>Species:<span className='asterisk'>*</span>  </span>
                <select onChange={(e) => { checker(e, setPetSpec); setDateBreed(e); }} defaultValue="" className='infoVal ediet selecta'>
                <option value='' disabled>Breed</option>
                    <option value='Dog'>Dog</option>
                    <option value='Cat'>Cat</option>
                </select></div>
                <div className=' petdeta' ><span className='infoLabel '>Breed:<span className='asterisk'>*</span>  </span>
                <select onChange={(e) => {checker(e, setPetBreed)}} className='infoVal ediet selecta'>
                {breedData.map((item, index) => {
                    return (
                        <option key={index} value={item.value}>{item.text}</option>
                    )
                })}
                </select></div>
                <div className=' petdeta' ><span className='infoLabel '>Weight:<span className='asterisk'>*</span>  </span><input placeholder='Weight (g)' onChange={(e) => {checker(e, setPetsWeight)}} type='text'  className='infoVal ediet' /></div>
                <div className=' petdeta' ><span className='infoLabel '>Height:<span className='asterisk'>*</span>  </span><input placeholder='Height (cm)' onChange={(e) => {checker(e, setPetsHeight)}} type='text'  className='infoVal ediet' /></div>
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
         <button className='updateBtn newpetupo' onClick={(e) => {AddnewPet(e)}} >Insert Records</button>
         <LoadSc Stat = {loadSc}/>
         </div>
        </>
    )
}

export default NewPet
