import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
const backdropclick=(props)=>{
	document.querySelector('.drawer_container_content').style['animation']="drawer-right-hide 0.8s";
	setTimeout(()=>{
		props.backdropclick&&props.backdropclick()
	},400)
}
const renderDrawer=(props)=>{
	props.drawerref.current={backdropclick:backdropclick};
	props.drawerref.current['props']=props;
let DomElem=<Fragment>
<div className="drawer_container_backdrop" onClick={()=>backdropclick(props)}>
</div>
<div className="drawer_container_content">
{props.header&&<div className="drawer_container_header">{props.header()}</div>}
<div className="drawer_container_body">
{props.children}
</div>
{props.footer&&<div className="drawer_container_footer">{props.footer()}</div>}
</div>
</Fragment>;
let drawerelem=document.createElement( 'div' );
drawerelem.classList.add('drawer_main_container');
if(props.visible){
ReactDOM.render(
  DomElem,
  !document.querySelector('.drawer_main_container')?document.body.appendChild(drawerelem):document.querySelector('.drawer_main_container'),
)
}else{
	if(document.querySelector('.drawer_main_container')){
		document.querySelector('.drawer_main_container').remove();
	}
}
}
const DrawerComponent =(props)=>{

return(
	<Fragment>
	{renderDrawer(props)}
	</Fragment>
	)

}
export default DrawerComponent;