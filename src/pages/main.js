import React,{useEffect,useState,useRef} from "react";
import DrawerComponent from '../components/DrawerComponent'
import SegmentForm from '../components/segment';
// var functions={};
const renderHeader=(closedrawer)=>{
	return(
		<div><button onClick={()=>closedrawer.current.backdropclick(closedrawer.current.props)}>{`<`}</button><h5 className="m-0 p-0">Saving Segment</h5></div>
		)
}
const renderFooter=(closedrawer,submitschema)=>{
	return(
		<div><button onClick={()=>submitschema()} className="save">Save the segment</button><button onClick={()=>closedrawer.current.backdropclick(closedrawer.current.props)} className="cancel">Cancel</button></div>
		)
}
const Main=()=>{
	const [drawervisible,setdrawervisible]=useState(false);
	const [schemalist,setschemalist]=useState([]);
	const [filterlist,setfilterlist]=useState([]);
	const [schemaname,setschemaname]=useState("");
	const drawerref=useRef();
	const clearschemalist=()=>{
		setdrawervisible(false);
		setschemalist([]);
		setfilterlist([]);
		setschemaname("");
	}
	const submitschema=()=>{
		let finaschemalist=schemalist.filter((obj)=>obj.selected.value!="");
		finaschemalist=finaschemalist.length>0?finaschemalist.map((obj)=>{
			let newobj={};
			newobj[obj.selected.value]=obj.selected.label;
			return newobj;
		}):[];
		if(!schemaname.match(/[a-bA-Z0-9]/g)){
			alert("please enter your segment name....");
			return;
		}else if(finaschemalist.length==0){
			alert("please add atleast one schema....");
			return;
		}
		let apiobject={
    		"segment_name": schemaname,
    		"schema": finaschemalist   
		};
		// console.log("finalschemelist",apiobject);
		fetch(`https://webhook.site/3b7a1bdb-d4b7-49e9-a94f-500a005ae031`,{method:"post",body:JSON.stringify(apiobject)})
		.then((response)=>response.json())
		.then((respjson)=>{
			if(respjson.status==1){
				alert("data processed successfully...")
				drawerref.current.backdropclick(drawerref.current.props)
			}else{
				alert("problem with the request...");
			}
		})
	}
	return(
		<div className="main_div">
		<button onClick={()=>setdrawervisible(!drawervisible)} className="save_segment">Save Segment</button>
		<DrawerComponent  drawerref={drawerref}  header={()=>renderHeader(drawerref)} footer={()=>renderFooter(drawerref,submitschema)} backdropclick={()=>clearschemalist()} visible={drawervisible}>
		<SegmentForm setschemaname={setschemaname} updatefilterlist={(data)=>setfilterlist(data)} filterlist={filterlist} schemalist={schemalist} updateschemalist={(data)=>setschemalist(data)}/>
		</DrawerComponent>
		</div>
		)
}
export default Main;