import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search:string,
  suggestions: string[]; 
  setSuggestions: React.Dispatch<React.SetStateAction<string[]>>;
}

const Navbar = (props: Props) => {
  useEffect(()=>{
    if(props.suggestions.includes(props.search)){
      props.setSuggestions([])
    }
  },[props.suggestions])
  return (
   <nav className='navbar'>
    <Link to="/" style={{display:"flex"}} className='logo'><img className='logo-img' src='data:image/jpeg;base64,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' /> <h2 style={{margin:"3px"}}>Weather Go</h2></Link>
    <input type='checkbox' id='toggle' />
    <label htmlFor="toggle"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-list-ul" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
</svg></label>
    <div className='menu'>
      <ul className='list'>
        <li><Link to="/">Home</Link></li>
        <li><Link onClick={()=>window.open("https://public.opendatasoft.com/explore/","_blank")}  to="/">Docs</Link></li>
        <li><Link to="/about">About</Link></li>
        <li>
       
        <input className="form-control me-2" value={props.search} onChange={(e)=>props.setSearch(e.target.value)}  type="search" placeholder="Search" aria-label="Search"/>
      { props.suggestions.length >0 && <div className='suggests'>
     {   props.suggestions.map((item)=>(
          <b key={item} className='suggest' onClick={()=>{props.setSearch(item); return 0}} >{item}</b> 
))}
        
         </div>  }
</li>
      </ul>
    </div>
   </nav>
  )
}
export default Navbar