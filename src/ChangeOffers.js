import React, { useEffect, useReducer, useState } from 'react';
import {Formik, Field} from 'formik';
import Accordion from './Accordion';



const ChangeOffers = () => {
    const [ponuda, setPonuda] = useState();
    const [ready, setReady] = useState(false);

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
                })
            }
            
        })
        fetchedOffers.forEach(offer => {
            offers[offer.day][offer.type].push(offer.name);
        });
        
        console.log(offers);
        setTimeout(() => {
            if(!fetchedOffers.length) {
                setPonuda({
                    monday: {
                        main: [],
                        aperitiv: [],
                        salata: []
                    },
                    tuesday: {
                        main: [],
                        aperitiv: [],
                        salata: []
                    },
                    wendsday: {
                        main: [],
                        aperitiv: [],
                        salata: []
                    }
                    ,thursday: {
                        main: [],
                        aperitiv: [],
                        salata: []
                    },friday: {
                        main: [],
                        aperitiv: [],
                        salata: []
                    }
                });
            }else {
                setPonuda(offers);
            }
            
            setReady(true);
        }, 2000)
    }, [])


    const initializeFormValues = () => {
        return ponuda;
    }

    const validateAddNewMealForm = (values) => {
        const errors = {}

        if(!values.name.length) {
            errors.name = "Please enter some text";
        }

        return errors;
    }


    const renderOffers = (setFieldValue, ponuda) => {
        const offersElements = [];
        for(let day in ponuda) {
            const inputsElements = [];
            for(let type in ponuda[day]) {
                const mealInputs = [];
                ponuda[day][type].forEach((el, i) => {
                    const inputValue = day + "." + type + `[${i}]`
                    mealInputs.push((
                       <div className="form-group">
                           <Field type="text" className="form-control" name={inputValue || ""} />
                       </div>
                    ))
                })
                inputsElements.push((
                    <div>
                        <h3 className="mb-3">{type}</h3>
                        {mealInputs}
                        <hr class="my-4"></hr>
                        <Formik
                            enableReinitialize
                            validate={validateAddNewMealForm}
                            initialValues={{
                                name: "",
                            }}
                            onSubmit={ (values, actions) => {
                                const inputName = day + "." + type;
                                const inputValue = ponuda[day][type];
                                inputValue.push(values.name);
                                setFieldValue(inputName, inputValue);
                                actions.resetForm();
                            }}
                        >
                            {({values ,errors, touched, handleSubmit}) => (
                                <div>
                                    <Field type="text" className="form-control" name="name" />
                                    {errors.name && touched.name ? (
                                        <div class="alert alert-danger">{errors.name}</div>
                                      ) : null}
                                    <button onClick={handleSubmit} type="submit" className="btn mt-2 mb-3 btn-primary" >Add</button>
                                </div>
                            )}
                        </Formik>
                    </div>
                ))
            }
            offersElements.push(<Accordion title={day}>
                <div className="p-4">
                    {inputsElements}
                </div>
            </Accordion>)
        }
        return offersElements
    }

    const initializeForm = () => {
        return (
            <Formik
                enableReinitialize
                initialValues={initializeFormValues()}
                onSubmit={(values) => {
                    console.log(values);
                  }}
            >
                {({values, handleSubmit, setFieldValue}) => (
                    <form onSubmit={handleSubmit}>
                        <div className="accordion" id="accordionExample">
                            
                            {renderOffers(setFieldValue, values)}
                            </div>
                            <div className="text-center">
                            <button type="submit" className='btn btn-danger mt-5'>Save</button>
                            <button type="submit" className='btn ml-2 btn-outline-danger mt-5'>Reset</button>
                            </div>
                    </form>
                )}
            </Formik>
        )
    }


    return (
        <div  className="p-3 " style={{maxWidth:"600px", margin: "0 auto" }}>
            <h1 className="mb-5 text-center">Change offers</h1>
            {ready ? initializeForm(): null}
            
        </div>
    )
}

export default ChangeOffers
