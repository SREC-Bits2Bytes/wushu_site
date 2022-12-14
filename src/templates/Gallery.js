import {React,useState,useEffect,useRef} from 'react';
import { getDocument } from '../firebase/fireStore';
import Popup from '../components/popup/Popup';
import Modal from './Modal';

export default function Gallery() {
    const [data,setData] = useState([]);
    const[render,setRender] = useState(true);
    const renderState = useRef(true);
    const [popupIndex, setPopupIndex] = useState(-1);
    const [popup, setPopup] = useState(false);
    var delayInMilliseconds = 400; //1 second
    useEffect( ()=>{
        if(render){
            const d=  getDocument("gallery").then(data =>{
                setData(data.Data);
                console.log(data);
            });
            
            setRender(false)
        }
    },[render])
    return (
        <div className="Gallery ">
            <div className="row">

            {data.length==0?'Gallery is Empty':data.map((value,index)=>{
                    return (<div className="col-md-3" key={index}>
                    <div className="card mb-2" data-toggle="modal" data-target="#exampleModal">
                        <img onClick={()=>{setPopupIndex(index);setPopup(true)}} src={value.ImageUrl} className="card-img-top img-fluid" alt="..." />
                        <div className="card-body">
                            <p className="card-text text-center">{value.Title}</p>
                        </div>
                        
                    </div>
                </div>)
                })}
            </div>
            {popup?<Popup
                        reRender={true}
                        trigger={popup}
                        event={data}
                        index={popupIndex}
                        setPopup={setPopup}
                    />:<></>}
        </div>
    );
}

