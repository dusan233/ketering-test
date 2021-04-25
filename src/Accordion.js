import React, { useEffect, useRef, useState } from 'react';


const Accordion = (props) => {
    const [show, setShow] = useState(false);
    const contentElRef = useRef(null);
    useEffect(() => {
        contentElRef.current.height = contentElRef.current.scrollHeight;
    }, [props.children])
    return (
        <div className="mb-2 border rounded ">
            <div onClick={() => setShow(prevState => !prevState)} className="pl-3 pr-3 pt-2 pb-2 bg-warning text-light" id="headingOne">
              <div className="mb-0">
                <h2 className="text-light " >
                  {props.title[0].toUpperCase() + props.title.slice(1, props.title.length)}
                </h2>
              </div>
            </div>
        
            <div ref={contentElRef} style={{height: show ? contentElRef.current.scrollHeight : "0px", transition: "0.5s"}} className="collapse overflow-hidden show" >
            {props.children}
            </div>
          </div>
    )
}

export default Accordion
