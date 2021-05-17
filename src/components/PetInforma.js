
import React, { useEffect, useState } from 'react'
import db, { auth } from '../firebase/firebase'
import * as Icons from 'react-icons/fa'
import Select from 'react-select'
import { BreedDataCat, BreedDatadefault, BreedDataDog, PetVitamins } from './SelectData'


function PetInforma(props) {
    const [breedData, setbreedData] = useState(BreedDatadefault);

    const [Pets, setPets] = useState([])
    const [ind, setind] = useState(0)
    const [petEdit, setpetEdit] = useState(false)
    const [PetName, setPetName] = useState("");
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

    const EditpetData = async (e) => {
        console.log(e.target.value)
        if(e.target.value === undefined){
            return;
        }else{
            setDateBreed();
            await getpetindex(e);
            setpetEdit(true);
        }

}
const checker = (e, setVal) => { 
    e.preventDefault();
    setVal(e.target.value);
}

const DdlHandler= (e) => {
    setVitamins(Array.isArray(e)? e.map(x => x.label): [])
}
const UpdateRecords = (e, name, bday, gender, spec, bred, hei,wei, worm,vini, viini, antir, chec, vit) => {
    e.preventDefault();
    if (PetName.replace(/\s/g, "").length <= 0) {setPetName(name)};
    if (PetsHeight.replace(/\s/g, "").length <= 0) {setPetsHeight(hei)};
    if (PetBDate.replace(/\s/g, "").length <= 0) {setPBdate(bday)};
    if (PetBreed.replace(/\s/g, "").length <= 0) {setPetBreed(bred)};
    if (PetGend.replace(/\s/g, "").length <= 0) {setPetGend(gender)};
    if (PetSpec.replace(/\s/g, "").length <= 0) {setPetSpec(spec)};
    if (PetsWeight.replace(/\s/g, "").length <= 0) {setPetsWeight(wei)};
 
    console.log(PetName + '\n' + PetsHeight + '\n' + PetBDate + '\n' + PetBreed + '\n' + PetGend + '\n' + PetSpec + '\n' + PetsWeight + '\n' +
    Deworming + '\n' + VIinI + '\n' + VinI + '\n' + AntiRabies + '\n' + CheckUp + '\n' + Vitamins )
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
                        <div className=' petdeta' ><span className='infoLabel '>Gender:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Gender}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Species:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Species}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Breed:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Breed}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Weight:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Weight}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Height:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Height}/></div>
                    </div>
                    <div className='petDetails'>
                        <h3 className='petdettitle'>Health History: </h3>
                        <div className=' petdeta' ><span className='infoLabel '>Deworming:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Deworm}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>5-in-1:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.VinI}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>6-in-1:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.VIinI}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Anti-Rabies:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.AntiRabies}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>CheckUp: </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.CheckUp}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Vitamins:  </span><input readOnly placeholder='No Records' className='infoVal ' value={petdata.Vitamins}/></div>
                    </div>
                <button type='button' value={index} onClick={(e) => {EditpetData(e);}} className='petEditbtn'><Icons.FaEdit/>Edit</button>
                <div className={petEdit ? 'petEdit-wrapper show' : 'petEdit-wrapper'}>

                <div className='pet-edit'>
                <div className='petEdit-head'>Edit Pet Information</div><div className='closeEdit' onClick={(e)=>{setpetEdit(false)}}><Icons.FaWindowClose /></div>
                <img className='petProfile' src={Pets[ind].photoURL} alt='pet'/>
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
                        <div className=' petdeta' ><span className='infoLabel '>5-in-1:  </span><input onChange={(e) => {checker(e, setVinI)}}  type='date'  placeholder='No Records' className='infoVal ediet' defaultValue={Pets[ind].VinI}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>6-in-1:  </span><input onChange={(e) => {checker(e, setVIinI)}}  type='date' placeholder='No Records'  className='infoVal ediet' defaultValue={Pets[ind].VIinI}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>Anti-Rabies:</span><input  onChange={(e) => {checker(e, setAntiRabies)}} type='date' placeholder='No Records'  className='infoVal ediet' defaultValue={Pets[ind].AntiRabies}/></div>
                        <div className=' petdeta' ><span className='infoLabel '>CheckUp: </span><input  onChange={(e) => {checker(e, setCheckUp)}}  type='date' placeholder='No Records'  className='infoVal ediet' defaultValue={Pets[ind].CheckUp}/></div>
                        {// <Select className='infoVal ediet' />
                        }
                        <div className=' petdeta' ><span className='infoLabel '>Vitamins:  </span>
                            <Select classNamePrefix='Ediet' id='tagSelect' options={PetVitamins} onChange={(e) => {DdlHandler(e)}}  isMulti isSearchable />
                        </div>
                    </div>
                 </div>
                 <button onClick={(e)=>{UpdateRecords(e, Pets[ind].Name, Pets[ind].Birthdate, Pets[ind].Gender, Pets[ind].Species, Pets[ind].Breed, Pets[ind].Height, Pets[ind].Weight, Pets[ind].Deworm, Pets[ind].Vin1, Pets[ind].VIinI, Pets[ind].AntiRabies, Pets[ind].CheckUp, Pets[ind].Vitamins)}} className='updateBtn'>Update Records</button>
                 </div>
                </div>
                </div>
                ))}
            </>
        )
}

export default PetInforma