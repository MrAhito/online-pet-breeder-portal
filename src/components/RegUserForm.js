import React, { useRef, useState } from 'react'
import * as faIcons from 'react-icons/fa'
import {  useHistory } from "react-router-dom";
import fireBaseDB, { auth } from '../firebase/firebase';
import Select from 'react-select'
import Axios from 'axios'
import { BreedDataCat, BreedDataDog, BreedDatadefault, PetVitamins } from './SelectData';
import db from '../firebase/firebase';
import LoadSc from './LoadSc';

function RegUserForm(props) {
    
    const history = useHistory();
    const [breedData, setbreedData] = useState(BreedDatadefault);

    const fnameRef = useRef();
    const lnameRef = useRef();
    const regEmRef = useRef();
    const regAdRef = useRef();
    const regPaRef = useRef();
    const conRef = useRef();
    const bdateRef = useRef();
    const genRef = useRef();
    const cusGRef = useRef();
    const petNameRef = useRef();
    const petDateRef = useRef();
    const petGenderRef = useRef();
    const petSpeciRef = useRef();
    const petBreedRef = useRef();
    const petWeightRef = useRef();
    const petHeightRef = useRef();
    const hiddenFileInput = useRef(null);
    const hiddenFileInput2 = useRef(null);

    const [userBdate, setuserBdate] = useState(false)
    const [vin1Type, setvin1Type] = useState(false)
    const [cgend, setcgend] = useState(false);
    const [errFName, setFName] = useState(true);
    const [errLName, setLName] = useState(true);
    const [errRegEm, setRegEm] = useState(true);
    const [errRegAd, setRegAd] = useState(true);
    const [errRegPa, setRegPa] = useState(true);
    const [errCon, setCon] = useState(true);
    const [errBday, setBday] = useState(true);
    const [errGen, setGen] = useState(true);
    const [errPName, setPName] = useState(true);
    const [errPDate, setPDate] = useState(true);
    const [errPSpec, setPSpec] = useState(true);
    const [errPBred, setPBred] = useState(true);
    const [errPGend, setPGend] = useState(true);
    const [errCGen, setCGen] = useState(false);
    const [errPWeight, setPWeight] = useState(false);
    const [errPHeight, setPHeight] = useState(false);
    const [showPet, setshowPet] = useState(true);
    const [visiPas, setvisiPas] = useState(false);
    const petSHow = () => setshowPet(!showPet);
    const [loadVisi, setloadVisi] = useState(false);
    const [breeding, setbreeding] = useState(false);

    const [petAge, setpetAge] = useState()
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Address, setAddr] = useState("");
    const [BirthDate, setBDate] = useState("");
    const [PassWord, setPWord] = useState("");
    const [Contact, setContact] = useState("");
    const [Email, setEmail] = useState("");
    const [Gender, setGender] = useState("");
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

    const [dpImg, setdpImg] = useState('https://www.shareicon.net/data/256x256/2017/02/15/878685_user_512x512.png');
    const [petImg, setpetImg] = useState('https://res.cloudinary.com/pet-breeding/image/upload/v1621367507/icon_sqix6i.png');
    const [userIMGUp, setuserIMGUp] = useState(null);
    const [petIMGUp, setpetIMGUp] = useState(null);

    const cGend = (e) => {
        e.preventDefault();
       
        if (genRef.current.value.replace(/\s/g, "").length <= 0) {
            setGen(true);
        } else if (genRef.current.value === "custome") {
            setcgend(true);
        } else {
            setCGen(false);
            cusGRef.current.value ='';
            setcgend(false);
            setGender(genRef.current.value);
            setGen(false);
        }
    }
    const checkerda = (e, setVal) => { 
        e.preventDefault();
        setVal(e.target.value);
    }
    async function signUp (e) {
        const petName = petNameRef.current.value;
        const petDate = petDateRef.current.value;
        const petSpeci = petSpeciRef.current.value;
        const petBreed = petBreedRef.current.value;
        const petGender = petGenderRef.current.value;
        const petWeight = petWeightRef.current.value;
        const petHeight = petHeightRef.current.value;
    
        if (petName.replace(/\s/g, "").length <= 0) {
            setPName(true);
        }
        if (petDate.replace(/\s/g, "").length <= 0) {
            setPDate(true);
        } 
        if (petSpeci.replace(/\s/g, "").length <= 0) {
            setPSpec(true);
        } 
        if (petBreed.replace(/\s/g, "").length <= 0) {
            setPBred(true);
        } 
        if (petGender.replace(/\s/g, "").length <= 0) {
            setPGend(true);
        } 
        if (petWeight.replace(/\s/g, "").length <= 0) {
            setPWeight(true);
        } 
        if (petHeight.replace(/\s/g, "").length <= 0) {
            setPHeight(true);
        }

        if ( errPName === false && errPBred === false && errPDate === false && errPGend === false && errPSpec === false && errPWeight === false
            && errPHeight === false){
                setloadVisi(true)
                var a = dpImg, b = petImg;
                if(!(userIMGUp === null)){
                     a = await uploadImage(userIMGUp);
                    console.log("Link user fetch: "  + a);
                 }
                if(!(petIMGUp === null)){
                    b = await uploadImage(petIMGUp);
                console.log("Link pet fetch: "  + b);
                }
                createuser(a, b);
            }
        }
    
        const dateDiff =(e) =>{ 
            const date1 = new Date (e.target.value)
            const date2 = new Date('05-21-2021')
            const res = date1 - date2
            return res/(1000 * 60 * 60 * 24 * 30)
        }

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

const createuser = (u, p) => {
    console.log("this is user link: " + u + "\nthis is pet link: " + p)
        auth.createUserWithEmailAndPassword(
        Email, PassWord
     ).then(user => {
         if (!user) return;
         console.log("Creating User Started")
         user.user.updateProfile({
            displayName : FirstName,
            photoURL : u,
         }).then(user  => {
            const uids = auth.currentUser.uid;
            const userRef = fireBaseDB.doc("users/" + uids);
            const pettRef = fireBaseDB.collection("pets/");
            const snaps =  userRef.get();
            if (!snaps.exist) {
                try {
                    userRef.set({
                        uid : uids,
                        photoURL : u,
                        Timestamp : new Date(),
                        Firstname : FirstName, 
                        Lastname : LastName,  
                        Address,
                        Birthdate : BirthDate,
                        Pasword : PassWord,
                        phoneNum : Contact,
                        email : Email,
                        Gender,
                    })
                    pettRef.add({
                        Timestamp : new Date(),
                        photoURL : p,
                        Name : PetName,
                        Birthdate : PetBDate,
                        Owner : FirstName + " " + LastName,
                        OwnerId : uids,
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
                        console.log("Pets and User Details inserted")
                });
                         history.push('/dashboard');
                         setloadVisi(false)
                    alert('New User Successfully Registered')
                }catch (error) {
                         console.log("Error in creating user info", error);
                }
            }
         }
         ).catch(err => {
            console.log("Error in creating user info", err);
         })
     }).catch(err => {
        console.log("Error in creating user info", err);
    });
}

const showError = () => {
        const firstName = fnameRef.current.value;
        const lastName = lnameRef.current.value;
        const regEmail = regEmRef.current.value;
        const regAddress = regAdRef.current.value;
        const regPass = regPaRef.current.value;
        const conNum = conRef.current.value;
        const birthDate = bdateRef.current.value;
        const genDer = genRef.current.value;
        const customGen = cusGRef.current.value;

        if (firstName.replace(/\s/g, "").length <= 0) {
            setFName(true);
        } 
        if (lastName.replace(/\s/g, "").length <= 0) {
            setLName(true);
        }
        if (regEmail.replace(/\s/g, "").length <= 0) {
            setRegEm(true);
        }
        if (regAddress.replace(/\s/g, "").length <= 0) {
            setRegAd(true);
        }
        if (regPass.replace(/\s/g, "").length <= 0) {
            setRegPa(true);
        }
        if (conNum.replace(/\s/g, "").length <= 0) {
            setCon(true);
        } 
        if (birthDate.replace(/\s/g, "").length <= 0) {
            setBday(true);
        } 
        if (genDer.replace(/\s/g, "").length <= 0) {
            setGen(true);
        } else if (genDer === "custome") {
            if (customGen.replace(/\s/g, "").length <= 0) {
                setCGen(true);
            }
        }
        if( errFName === false && errLName === false && errRegAd === false && errBday === false  && errRegPa === false && errCon === false
            && errRegEm === false && errGen === false && errCGen === false ){
            setshowPet(!showPet);
        }
    }

 const onImgChange = (event, setImgFile, setImgFileUp) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setImgFile(reader.result);
            }
        }
        reader.readAsDataURL(event.target.files[0])
        setImgFileUp(event.target.files[0])
}

const checker = (e, vallid, setVal) => { //Checker of input value if blank or not
    e.preventDefault();
    if(e.target.value.replace(/\s/g, "").length <= 0){
        vallid(true);
        }else{
    vallid(false);
    setVal(e.target.value);
    }
}
const chekCon = (e, vallid, setVal) => {
    e.preventDefault();
    if(e.target.value.replace(/\s/g, "").length <= 0){
        vallid(true);
        }else if(e.target.value.length >= 12 || e.target.value.length <=6){
        vallid(true);
        }else{
    vallid(false);
    setVal(e.target.value);
    }
}
const chekPass = (e, vallid, setVal) => {
    e.preventDefault();
    if(e.target.value.replace(/\s/g, "").length <= 0){
        vallid(true);
        }else if(e.target.value.length >= 31 || e.target.value.length <=5){
        vallid(true);
        }else{
    vallid(false);
    setVal(e.target.value);
    }
}
const checkEma = (e, vallid, setVal) => {
    e.preventDefault();
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(e.target.value) === false) {
    setVal('');
    vallid(true);
  }
  else {
    vallid(false);
    setVal(e.target.value);
  }
}
const showPasword = () => setvisiPas(!visiPas);
const setDateBreed = (e) =>{
    e.preventDefault();
    if(e.target.value === 'Dog'){
        setbreedData(BreedDataDog)
    }
    if(e.target.value === 'Cat'){
        setbreedData(BreedDataCat)
    }
}

const DdlHandler= (e) => {
    setVitamins(Array.isArray(e)? e.map(x => x.label): [])
}
    return (
        <>
            <form className={showPet ? 'reg-form-c show' : 'reg-form-c'} >
                <div>
                    <div className="pet-reg fixs">
                        <div className="pet-title"><h1>User Information </h1></div>
                        <div className='avatarHolder'>
                        <input style={{display: 'none'}} type='file'  ref={hiddenFileInput} onChange = {(e) => {onImgChange(e,setdpImg, setuserIMGUp)}} />
                        <img src={dpImg} alt='Profile' onClick={(e) => {hiddenFileInput.current.click();}}  />
                        </div>

                        <input className='reg_in' type="text" name="txt-Fnme" placeholder='First Name:' ref={fnameRef} id="txtFname" onChange={ 
                           (e) =>{checker(e, setFName, setFirstName)}} />
                        <div className={errFName ? 'valida sh' : 'valida'}>
                            <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle></div>
                        <input  className='reg_in' type="text" name="txt-Lnme" placeholder='Last Name:' ref={lnameRef} id="txtLname" onChange={ 
                            (e) =>{checker(e, setLName, setLastName)}} />
                        <div className={errLName ? 'valida sh' : 'valida'}>
                            <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle></div>
                        <input  className='reg_in' type="text" name="txt-Emai" placeholder='Email Address:' ref={regEmRef} id="txtEmails" onChange={ 
                            (e) =>{checkEma(e, setRegEm, setEmail)}} /> 
                        <div className={errRegEm ? 'valida sh' : 'valida'}>
                            <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle></div>
                        <input  className='reg_in' type="text" name="txt-Addr" placeholder='Address:' ref={regAdRef}  id="txtAddr" onChange={ 
                            (e) =>{checker(e, setRegAd, setAddr)}} />
                        <div className={errRegAd ? 'valida sh' : 'valida'}>
                            <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle></div> 


                            <div className='reg_in' id="txtPword" >
                        <input  className='reg_pa'  type={visiPas ? 'text' : 'password'}  name="txt-Pwor" placeholder='Password:' ref={regPaRef} onChange={ 
                            (e) =>{chekPass(e, setRegPa, setPWord)}}/>
                            <faIcons.FaEye onClick={showPasword} className={visiPas ? 'eyey hida' : 'eyey'} title='Show Password' />
                            <faIcons.FaEyeSlash onClick={showPasword} className={visiPas ? 'eyey' : 'eyey hida'} title='Hide Password' />
                            </div>
                        <div className={errRegPa ? 'valida sh' : 'valida'}>
                            <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle></div>


                        <input className='reg_in'  type="number" name="txt-Cnum" placeholder='Contact #: (09**-***-****)' ref={conRef} id="txtCnum" onChange={ 
                            (e) =>{chekCon(e, setCon, setContact)}} />
                        <div className={errCon ? 'valida sh' : 'valida'}>
                            <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle></div>
                        <input className='reg_in'  type={userBdate ? 'date' : 'text'} name="txt-Bdate" placeholder='Birth Date:' ref={bdateRef} id="txtBdate" onFocus={() => {setuserBdate(true)}} onBlur={() => {setuserBdate(false)}}  onChange={ 
                            (e) =>{checker(e, setBday, setBDate); }} />
                        <div className={errBday ? 'valida sh' : 'valida'}>
                            <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle></div>
                        <select className='reg_in'  name="txt-Gend" onChange={cGend} id="txtGend" ref={genRef} defaultValue={''} >
                            <option value="" disabled>Gender:</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="custome">Custom</option>
                        </select>
                        <div className={errGen ? 'valida sh' : 'valida'}>
                            <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle></div>
                        <input  className={cgend ? 'reg_in' : 'reg_in gid'} type="text" name="txt-Gcus" ref={cusGRef} id="txtGcus" placeholder='Please specify:' onChange={ 
                            (e) =>{checker(e, setCGen, setGender)}} />
                        <div className={errCGen ? 'valida sh' : 'valida'}>
                            <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle></div>
                    </div>
                </div>
                <div className="reg-footer">
                    <button className='btn btn-sub' type='button' onClick={showError} >Next</button>
                </div>
            </form>
            <form className={showPet ? 'reg-form-c' : 'reg-form-c show'} >
                <div className='flow-comn'>
                    <div className="pet-reg borderfix">
                        <div className="pet-title"><h1>Pet Information </h1></div>
                        <div className='avatarHolder'>
                        <input style={{display: 'none'}} type='file' onChange = {(e) => {onImgChange(e,setpetImg, setpetIMGUp)}} ref={hiddenFileInput2}/>
                        <img src={petImg} alt='Profile' onClick={(e) => {hiddenFileInput2.current.click();}} />
                        </div>

                        <input className='reg_in' type="text" name="txt-Anme" placeholder='Name:'  ref={petNameRef} id="txtAnme" onChange={ 
                            (e) =>{checker(e, setPName, setPetName)}}  />
                        <div  className={errPName ? 'valida sh' : 'valida'}>
                            <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle></div>
                            <input className='reg_in' type={vin1Type ? 'date' : 'text'} name="txt-PDate" placeholder='Birth Date:' ref={petDateRef} id="txtPBdate"  onFocus={() => {setvin1Type(true)}} onBlur={(e) => {
                                setvin1Type(false);
                                checker(e, setPDate, setPBdate);
                                setpetAge(Math.ceil(dateDiff(e)))
                                if(e.target.value < 6){
                                    setbreeding(false)
                                    alert('Your Pet is not Eligible for Breeding')
                                    }
                            }} />
                            <div className={errPDate ? 'valida sh' : 'valida'}>
                                <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle></div>
                            <select className='reg_in'  name="txt-Gend" id="txtPGend" ref={petGenderRef}  defaultValue={''} onChange={ 
                                (e) =>{checker(e, setPGend, setPetGend)}} >
                                <option className='placeH' value=""  disabled>Gender:</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <div className={errPGend ? 'valida sh' : 'valida'}>
                                <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle></div>
                        <select className='reg_in' name="txt-Spec" id="txtSpec" ref={petSpeciRef}  defaultValue={''} onChange={
                            (e) =>{ 
                                setDateBreed(e);
                                checker(e, setPSpec, setPetSpec);
                                // if(e.target.value === 'Cat' && petAge < 6){
                                //     setbreeding(false)
                                //     alert('Your pet is too young for Breeding')
                                // }else if(e.target.value === 'Dog' && petAge < 6 && PetGend === 'Male'){
                                //     setbreeding(false)
                                //     alert('Your pet is too young for Breeding')
                                // }else if(e.target.value === 'Dog' && petAge < 18 & PetGend === 'Female'){
                                //     setbreeding(false)
                                //     alert('Your pet is too young for Breeding')
                                // }else{
                                //     setbreeding(true)
                                // }
                            }} >
                            <option value=""  disabled>Species:</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                        </select>
                        <div className={errPSpec ? 'valida sh' : 'valida'}>
                            <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle>
                        </div>
                    <select className='reg_in' name="txt-Bred" id="txtBred" ref={petBreedRef} defaultValue={''} onChange={ 
                        (e) =>{checker(e, setPBred, setPetBreed)}} >
                    {breedData.map((item, index) => {
                        return (
                            <option key={index} value={item.value}>{item.text}</option>
                        )
                    })}
                    </select>
                    <div className={errPBred ? 'valida sh' : 'valida'}>
                        <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle>
                    </div>
                        <input className='reg_in' type="number" name="txt-Weig" placeholder='Weight:(g)'  ref={petWeightRef} id="txtWeig" onChange={ 
                            (e) =>{checker(e, setPWeight, setPetsWeight)}} />
                        <div  className={errPWeight ? 'valida sh' : 'valida'}> 
                            <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle></div>
                        <input className='reg_in' type="number" name="txt-Heig" placeholder='Height:(cm)'  ref={petHeightRef} id="txtHeig" onChange={ 
                            (e) =>{checker(e, setPHeight, setPetsHeight)}} />
                        <div  className={errPHeight ? 'valida sh' : 'valida'}>
                            <faIcons.FaExclamationCircle></faIcons.FaExclamationCircle></div>
                            <div className='petDetails reghis'>
                            <h3 className='petdettitle'>Health History: </h3>
                            <div className=' petdeta' ><span className='infoLabel '>Deworming:  </span><input onChange={(e) => {checkerda(e, setDeworming)}}  type='date'  placeholder='No Records' className='infoVal ediet '/></div>
                            <div className=' petdeta' ><span className='infoLabel '>5-in-1:  </span><input onChange={(e) => {checkerda(e, setVinI)}}  type='date'  placeholder="MM/DdaD/YYYY" className='infoVal ediet' /></div>
                            <div className=' petdeta' ><span className='infoLabel '>6-in-1:  </span><input onChange={(e) => {checkerda(e, setVIinI)}}  type='date' placeholder='No Records'  className='infoVal ediet' /></div>
                            <div className=' petdeta' ><span className='infoLabel '>Anti-Rabies:</span><input  onChange={(e) => {checkerda(e, setAntiRabies)}} type='date' placeholder='No Records'  className='infoVal ediet'/></div>
                            <div className=' petdeta' ><span className='infoLabel '>CheckUp: </span><input  onChange={(e) => {checkerda(e, setCheckUp)}}  type='date' placeholder='No Records'  className='infoVal ediet' /></div>
                            <div className=' petdeta' ><span className='infoLabel '>Vitamins:  </span>
                                <Select classNamePrefix='Ediet' id='tagSelect' options={PetVitamins} onChange={(e) => {DdlHandler(e)}}  isMulti isSearchable />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reg-footer petf">
                    <div>
                        <button className='btn btn-sub'  type='button' onClick={petSHow} >Back</button>
                        <button className='btn btn-sub' type='button' onClick={(e) => signUp(e)} >Sign Up</button>
                    </div>
                    <div className="termscon">Terms and Conditions</div>
                </div>
            </form>
            <LoadSc Stat={loadVisi} />

        </>
    )
}

export default RegUserForm