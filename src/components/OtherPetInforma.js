
import React, { useEffect, useState } from 'react'
import db from '../firebase/firebase'


function OtherPetInforma(props) {

    const [Pets, setPets] = useState([])
   
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
                </div>
                ))}
            </>
        )
}

export default OtherPetInforma