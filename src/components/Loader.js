import React from "react";
import "../assets/styles/components/uiElements/loader.scss";

export default function Loader(props) {
    return <div className={'loader-wrapper'}>
        <section className={'loader-box'}>
            <div className={'for-back'}/>
            <div className={'loader'}>
                <svg id="triangle" width="100px" height="100px" viewBox="-3 -4 39 39">
                    <polygon fill="none" stroke="#fff" strokeWidth="1" points="16,0 32,32 0,32"></polygon>
                </svg>
            </div>
        </section>
    </div>


    // return <div className={'loader-wrapper'}>
    //     <section className={'loader-box'}>
    //         <div className={'for-back'}/>
    //         <div className={'loader'}>
    //             <div>
    //                 <div className="circle">
    //                     <div className="circle-small"/>
    //                 </div>
    //             </div>
    //         </div>
    //     </section>
    // </div>

}
