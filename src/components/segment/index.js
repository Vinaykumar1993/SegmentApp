import React from 'react';
const segmentdropdown=[{"label":"First Name","value":"first_name","color":"red"},{"label":"Last Name","value":"last_name","color":"green"},{"label":"Gender","value":"gender","color":"green"},{"label":"Age","value":"age","color":"red"},{"label":"Account Name","value":"account_name","color":"green"},{"label":"City","value":"city","color":"red"},{"label":"State","value":"state","color":"green"}];
const SegmentForm=({filterlist,schemalist,updatefilterlist,updateschemalist,setschemaname})=>{
	
	const addschema=()=>{
		let schemalist1=[...schemalist];
		schemalist1.push({selected:{value:"",label:""}});
		if(schemalist1.length>segmentdropdown.length)
		{
		 return;
		}
		updateschemalist(schemalist1);
	}
	const deletefilterdata=(previousvalue)=>{
		let findprevIndex=filterlist.findIndex((obj1)=>obj1==previousvalue);
		if(previousvalue&&findprevIndex!=-1){
			filterlist.splice(findprevIndex,1);
		}
		return filterlist;
	}
	const updateschema=(data,index,previousvalue)=>{
		let finddata=segmentdropdown.find((obj)=>obj.value==data);
		let schemalist1=[...schemalist];
		schemalist1[index].selected=finddata?finddata:{value:"",label:""};
		let filterlist=deletefilterdata(previousvalue);
		finddata&&filterlist.push(finddata.value);
		updatefilterlist(filterlist);
		setTimeout(()=>{//delaying schema list to update while updating the filter records
		updateschemalist(schemalist1);
		});
	}
	const deleteschema=(index,previousvalue)=>{
		let filterlist=deletefilterdata(previousvalue);
		updatefilterlist(filterlist);
		let schemalist1=[...schemalist];
		schemalist1.splice(index,1);
		setTimeout(()=>{//delaying schema list to update while updating the filter records
			updateschemalist(schemalist1);
		})
	}
	return(
		<div className="segment_wrapper">
			<div className="input_wrapper">
			<label>Enter the Name of the Segment</label>
			<input placeholder="Name of the segment" onChange={(e)=>setschemaname(e.target.value)}/>
			</div>
			<div className="schema_wrapper">
			<p className="note_schema">To save your segment, you need to add the schemas to build the query.</p>
			<ul className="selection_notes">
			<li><span className="green"></span> - User Traits</li>
			<li><span className="red"></span> - Group Traits</li>
			</ul>
			
			<div className="users_segment">
			<ul>
			{schemalist.length>0&&schemalist.map((schemalistobj,schemalistindex)=>{
				let checkfilterlist=(obj1)=>(schemalistobj.selected.value==obj1.value)?true:!filterlist.includes(obj1.value);
				return(
					<li className={`${!schemalistobj.selected.value?'empty':''}`}><span style={{background:schemalistobj.selected.value&&schemalistobj.selected.color}}></span><div className="select_block"><select value={schemalistobj.selected.value} onChange={(e)=>updateschema(e.target.value,schemalistindex,schemalistobj.selected.value)}>
			<option value="">Add schema to segment</option>
			{segmentdropdown.filter((obj)=>{return checkfilterlist(obj)}).map((obj,index)=>{
				return(
				<option key={`dropdown_index_${index}`} value={obj.value}>{obj.label}</option>
				)
			})}
			</select></div>
			<button onClick={()=>deleteschema(schemalistindex,schemalistobj.selected.value)}><span></span></button>
			</li>
					)
			})}
			
			</ul>

			</div>
			<a className="addschema" href="#" onClick={()=>addschema()}>+ <span>Add new schema</span></a>
			</div>
		</div>
		)
}
export default SegmentForm;