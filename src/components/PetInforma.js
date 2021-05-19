
import React, { useEffect, useRef, useState } from 'react'
import db, { auth } from '../firebase/firebase'
import * as Icons from 'react-icons/fa'
import Select from 'react-select'
import Axios from 'axios'
import { BreedDataCat, BreedDatadefault, BreedDataDog, PetVitamins } from './SelectData'
import LoadSc from './LoadSc'


function PetInforma(props) {
    const [breedData, setbreedData] = useState(BreedDatadefault);

    const [Pets, setPets] = useState([])
    const [ind, setind] = useState(0)
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


    async  function uploadImage (imgUser) {
        const  formData = new FormData()
        var linking = ''
       formData.append('file', imgUser, imgUser.name);
       formData.append('upload_preset', 'r5byh8yh')
       await Axios.post("https://api.cloudinary.com/v1_1/pet-breeding/image/upload", formData, {
           onUploadProgress : progressEvent => {
               console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')}
       }).then(res => { 
           const link = res.data.url
           linking = link;
       })
       .catch (err => { console.error(err)})
         return(linking)
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
useEffect (() => {
        const fetchData = async () => {
        try{ 
        const PetRef = db.collection('pets');
        const pets = await PetRef.where('OwnerId', '==', props.useID).get();
        setPets(pets.docs.map(doc => doc.data()))
        }catch(error){
        console.error(error);
    }
    }
    fetchData()
    })
    const setDateBreed = () =>{
        if(Pets[ind].Species === 'Dog'){
            setbreedData(BreedDataDog)
        }
        if(Pets[ind].Species === 'Cat'){
            setbreedData(BreedDataCat)
        }
    }

    async  function getpetindex (e) {
        e.preventDefault();
        var inde = e.target.value;
        await auth.onAuthStateChanged(user => {
            setind(inde)
        })
        return inde;
   }

    const EditpetData = async (e, photo, petID, name, bday, gender, spec, bred, hei,wei, worm,vini, viini, antir, chec, vit) => {
        console.log(e.target.value)
        if(e.target.value === undefined){
            return;
        }else{
            await getpetindex(e);
            setpetEdit(true);
            defaultvaluehandler(photo, petID, name, bday, gender, spec, bred, hei,wei, worm,vini, viini, antir, chec, vit)
        }
}

const deletePet=(id)=>{
    db.collection('pets').doc(id).delete();
    alert('Pet Info Successfully Deleted')

}

const checker = (e, setVal) => { 
    e.preventDefault();
    setVal(e.target.value);
}

const defaultvaluehandler = async (photo, petID, name, bday, gender, spec, bred, hei,wei, worm,vini, viini, antir, chec, vit) => {
    try{
    setPetids(petID);
    setdpImg(photo);
    if(PetName.replace(/\s/g, "").length <= 0 || PetsHeight.replace(/\s/g, "").length <= 0 || PetBDate.replace(/\s/g, "").length <= 0 || 
    PetBreed.replace(/\s/g, "").length <= 0 || PetGend.replace(/\s/g, "").length <= 0 ||  PetSpec.replace(/\s/g, "").length <= 0 || 
    PetsWeight.replace(/\s/g, "").length <= 0){
    if (PetName.replace(/\s/g, "").length <= 0) {setPetName(name); };
    if (PetsHeight.replace(/\s/g, "").length <= 0) {setPetsHeight(hei); };
    if (PetBDate.replace(/\s/g, "").length <= 0) {setPBdate(bday); };
    if (PetBreed.replace(/\s/g, "").length <= 0) {setPetBreed(bred); };
    if (PetGend.replace(/\s/g, "").length <= 0) {setPetGend(gender); };
    if (PetSpec.replace(/\s/g, "").length <= 0) {setPetSpec(spec); };
    if (PetsWeight.replace(/\s/g, "").length <= 0) {setPetsWeight(wei); };
    if (Deworming.replace(/\s/g, "").length <= 0){if(worm === undefined){setDeworming("No Records")}else{setDeworming(worm);}}
    if (VinI.replace(/\s/g, "").length <= 0) {if(vini === undefined){setVinI("No Records")}else{setVinI(vini);}}
    if (VIinI.replace(/\s/g, "").length <= 0){if(viini === undefined){setVIinI("No Records")}else{setVIinI(viini);}}
    if (AntiRabies.replace(/\s/g, "").length <= 0) {if(antir === undefined){setAntiRabies("No Records")}else{setAntiRabies(antir);}}
    if (CheckUp.replace(/\s/g, "").length <= 0){if(chec === undefined){setCheckUp("No Records")}else{setCheckUp(chec);}}
    if (Vitamins.length <= 0){if(worm === undefined){setVitamins("No Records")}else{setVitamins(vit);}}
    }
}catch(error){console.log(error)}
   
}

const DdlHandler= (e) => {
    setVitamins(Array.isArray(e)? e.map(x => x.label): [])
}
const UpdateRecords = async () => {
    setloadSc(true);
    try{
        var a = dpImg;
        if(!(userIMGUp === null)){
             a = await uploadImage(userIMGUp);
            console.log("Link user fetch: "  + a);
         }

    db.collection('pets').doc(Petids).update({
        photoURL: a,
        Name : PetName,
        Height : PetsHeight,
        Weight : PetsWeight,
        Birthdate : PetBDate,
        Gender : PetGend,
        Species : PetSpec,
        Breed : PetBreed,
        Deworm : Deworming,
        VIinI : VIinI,
        Vin1 : VinI,
        AntiRabies : AntiRabies,
        CheckUp : CheckUp,
        Vitamins : Vitamins,
    }).then( res => { 
        // window.location.reload(false)
        alert('Records has been Updated');
        setloadSc(false);
        setpetEdit(false)
        }).catch(err => { console.log(err) });
}catch(error){console.log(error)}
    
}
        return (
            <>
            
            {Pets.map((petdata, index) => (
            <div key={index} className='pet-info'>
                <img className='petProfile' src={petdata.photoURL} alt='pet'/>
                    <div className='petDetails'>
                        <h3 className='petdettitle'>Basic Information: </h3>
                        <div className=' petdeta' ><span className='infoLabel '>Name:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Name}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Birthdate:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Birthdate}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Age:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Age + ' month(s)'}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Gender:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Gender}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Species:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Species}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Breed:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Breed}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Weight:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Weight}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Height:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Height}/></div>
                    </div>
                    <div className='petDetails'>
                    <div className=' petdeta' ><h3 className='petdettitle'>Breedable: </h3><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Breeding}/></div>
                    
                    <h3 className='petdettitle'>Health History: </h3>
                        <div className=' petdeta' ><span className='infoLabel '>Deworming:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Deworm}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>5-in-1:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Vin1}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>6-in-1:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.VIinI}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Anti-Rabies:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.AntiRabies}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>CheckUp: </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.CheckUp}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Vitamins:  </span><textarea readOnly placeholder='No Records' className='txtAreVit ' value={petdata.Vitamins}/></div>
                    </div>
                <button type='button' value={index} onClick={ async (e) => {
                    EditpetData(e, Pets[index].photoURL, Pets[index].PetId, Pets[index].Name, Pets[index].Birthdate, Pets[index].Gender, 
                        Pets[index].Species, Pets[index].Breed, Pets[index].Height, Pets[index].Weight, Pets[index].Deworm, 
                        Pets[index].Vin1, Pets[index].Vin1, Pets[index].AntiRabies, Pets[index].CheckUp, Pets[index].Vitamins)
                    }} className='petEditbtn'><Icons.FaEdit/>Edit</button>
                <button type='button' value={index} onClick={(e) => {deletePet(Pets[index].PetId)}} 
                                className='petEditbtn dela'><Icons.FaTrashAlt/>Delete</button>



                <div className={petEdit ? 'petEdit-wrapper show' : 'petEdit-wrapper'}>
                <div className='pet-edit'>
                <div className='petEdit-head'>Edit Pet Information</div><div className='closeEdit' onClick={(e)=>{setpetEdit(false)}}><Icons.FaWindowClose /></div>
                <img src={dpImg} onClick={(e) => {hiddenFileInput.current.click();}} className='petProfile' alt='pet'/>
                <input style={{display: 'none'}} type='file'  ref={hiddenFileInput} onChange = {(e) => {onImgChange(e,setdpImg, setuserIMGUp)}} />
                <div className='petEdi-rapper'>
                    <div className='petDetails'>
                        <h3 className='petdettitle'>Basic Information: </h3>
                        <div className=' petdeta' ><span className='infoLabel '>Name:  </span><input onChange={(e) => {checker(e, setPetName)}} type='text' placeholder='No Records' className='infoVal ediet' defaultValue={Pets[ind].Name}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Birthdate:  </span><input onChange={(e) => {checker(e, setPBdate)}} type='date'  placeholder='No Records' className='infoVal ediet' defaultValue={Pets[ind].Birthdate}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Gender:  </span>
                        <select onChange={(e) => {checker(e, setPetGend)}} className='infoVal ediet selecta' defaultValue={Pets[ind].Gender}>
                            <option value='' disabled>Gender</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select> </div>
                        <div className=' petdeta' ><span className='infoLabel '>Species:  </span>
                        <select onChange={(e) => { setDateBreed(e);  checker(e, setPetSpec)}} className='infoVal ediet selecta' defaultValue={Pets[ind].Species}>
                        <option value='' disabled>Breed</option>
                            <option value='Dog'>Dog</option>
                            <option value='Cat'>Cat</option>
                        </select></div>
                        <div className=' petdeta' ><span className='infoLabel '>Breed:  </span>
                        <select onChange={(e) => {checker(e, setPetBreed)}} className='infoVal ediet selecta' defaultValue={Pets[ind].Breed}>
                        {breedData.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.text}</option>
                            )
                        })}
                        </select></div>
                        <div className=' petdeta' ><span className='infoLabel '>Weight:  </span><input onChange={(e) => {checker(e, setPetsWeight)}} type='text' placeholder={Pets[ind].Weight}  className='infoVal ediet' defaultValue={Pets[ind].Weight}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Height:  </span><input onChange={(e) => {checker(e, setPetsHeight)}} type='text' placeholder={Pets[ind].Height}  className='infoVal ediet' defaultValue={Pets[ind].Height}/></div>
                    </div>
                    <div className='petDetails'>
                        <h3 className='petdettitle'>Health History: </h3>
                        <div className=' petdeta' ><span className='infoLabel '>Deworming:  </span><input onChange={(e) => {checker(e, setDeworming)}}  type='date'  placeholder='No Records' className='infoVal ediet' defaultValue={Pets[ind].Deworm}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>5-in-1:  </span><input onChange={(e) => {checker(e, setVinI)}}  type='date'  placeholder='No Records' className='infoVal ediet' defaultValue={Pets[ind].Vin1}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>6-in-1:  </span><input onChange={(e) => {checker(e, setVIinI)}}  type='date' placeholder='No Records'  className='infoVal ediet' defaultValue={Pets[ind].VIinI}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Anti-Rabies:</span><input  onChange={(e) => {checker(e, setAntiRabies)}} type='date' placeholder='No Records'  className='infoVal ediet' defaultValue={Pets[ind].AntiRabies}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>CheckUp: </span><input  onChange={(e) => {checker(e, setCheckUp)}}  type='date' placeholder='No Records'  className='infoVal ediet' defaultValue={Pets[ind].CheckUp}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Vitamins:  </span>
                            <Select classNamePrefix='Ediet' id='tagSelect' options={PetVitamins} onChange={(e) => {DdlHandler(e)}}  isMulti isSearchable />
                        </div>
                    </div>
                 </div>
                 <button onClick={(e)=>{UpdateRecords()}} className='updateBtn'>Update Records</button>
                 <LoadSc Stat = {loadSc}/>
                 </div>
                </div>
                </div>
                ))}
            </>
        )
}

export default PetInforma