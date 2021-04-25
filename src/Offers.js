import React, {useEffect, useReducer, useState} from 'react';
import { Formik, Field } from 'formik';
import Accordion from './Accordion';



const Offers = () => {
    const [da, setDa] = useState("");
    

    useEffect(() => {
        const fetchedOffers = [
            {day: "monday", name: "pasulj(kobasica)", type: "main"},
            {day: "monday", name: "corba", type: "aperitiv"},
            {day: "monday", name: "pljeskavica(pomfrit)", type: "main"},
            {day: "monday", name: "kupus", type: "salata"},
            {day: "tuesday", name: "corba", type: "aperitiv"},
            {day: "tuesday", name: "pasulj(kobasica)", type: "main"},
            {day: "tuesday", name: "vitaminska", type: "salata"},
        ]
        const uniqueDays = fetchedOffers.map(el => el.day).filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        const uniqueTypes = fetchedOffers.map(el => el.type).filter((value, index, self) => {
            return self.indexOf(value) === index;
        })
        console.log(uniqueDays, uniqueTypes);
        const offers = {}
        
        uniqueDays.forEach(el => {
            if(!offers[el]) {
                offers[el] = {}
                uniqueTypes.forEach(type => {
                    offers[el][type] = [];
                    offers[el][type].push("");
                })
            }
            
        })
        fetchedOffers.forEach(offer => {
            offers[offer.day][offer.type].push(offer.name);
            offers[offer.day][offer.type].push()
        })
        
        console.log(offers);
        setTimeout(() => {
            setPonuda(offers);
        }, 2000)
    }, [])

    const [ponuda, setPonuda] = useState({});

    const initializeFormValues = () => {
        const initialValues = {};
        for(let key in ponuda) {
            initialValues[key] = {}
            for(let secKey in ponuda[key]) {
                initialValues[key][secKey] = "";
            }
        }
        return initialValues;
    }

    
    const initializeForm = () => {
        return (
            <Formik
                enableReinitialize
                initialValues={initializeFormValues()}
                onSubmit={async (values) => {
                    console.log(values);
                  }}
            >
                {({values, handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <div className="accordion" id="accordionExample">
                            {renderOffers()}
                            
                            </div>
                            <button type="submit" className='btn btn-danger mt-5'>Save</button>
                            
                    </form>
                )}
            </Formik>
        )
    }

    const renderOffers = () => {
        const offerElements = [];
        for(let key in ponuda) {
            
            const renderMealOptions = () => {
                const optionElements = []
                for(let secKey in ponuda[key]){
                    
                    const renderAcctualOptions = () => {
                        const actualOptions = []
                         ponuda[key][secKey].forEach((el, i) => {
                             const inputName = key + "." + secKey;
                            actualOptions.push(<div key={i}>
                                
                                <label className="d-flex align-items-center" style={{fontSize: "18px"}} htmlFor=""><Field  className="das mr-3" type="radio" name={inputName} value={el} /> {el || "none"}</label>
                                
                            </div>) 
                        })
                        return actualOptions;
                    }
                    
                    
                    optionElements.push(<div key={secKey}>
                        <h4 className="mb-3">{secKey[0].toUpperCase() + secKey.slice(1, secKey.length)}</h4>
                         {renderAcctualOptions()}
                    </div>)
                }
                return optionElements
            }
            offerElements.push(<Accordion key={key} title={key}>
                <div className="p-4">
                {renderMealOptions()}
                </div>
            </Accordion>)
          
        }
        return offerElements;
    }

    return (
        <div className="p-3 " style={{maxWidth:"600px", margin: "0 auto" }}>
            {initializeForm()}
            
        </div>
    )
}

export default Offers
