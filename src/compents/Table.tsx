import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';


type GeoData ={
    admin1_code: string;
    admin2_code: string;
    admin3_code: string | null;
    admin4_code: string | null;
    alternate_names: string[];
    ascii_name: string;
    coordinates: { lon: number; lat: number };
    cou_name_en: string;
    country_code: string;
    country_code_2: string | null;
    dem: number;
    elevation: number | null;
    feature_class: string;
    feature_code: string;
    geoname_id: string;
    label_en: string;
    modification_date: string;
    name: string;
    population: number;
    timezone: string;
}

type props= {
    search:string;
    suggestions: string[]; 
  setSuggestions: React.Dispatch<React.SetStateAction<string[]>>;
}
const Table = (props:props) => {
    const [data, setData] = useState<GeoData[]>([]);
    const [waiting, setWaiting] = useState(true);
    const [limit,setLimit]=useState(50);
    const [sort,setSort]=useState("name")
    const [staticData,setStaticData]=useState<GeoData[]>([])
    const [notFound,setNotFound]=useState(false)

    const fetchData = async () => {
        setWaiting(true);
        console.log("fet")
        let result;
        try {
            console.log(sort)
        const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&sort=${sort}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            result = await response.json();
            setData(result.results);
            setStaticData(result.results)
            setLimit(limit+10);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setWaiting(false);
        }
        console.log("feted")
    };

    

    useEffect(() => {
        setLimit(50)
        console.log("limit")
        fetchData();
    }, [sort]);
    useEffect(()=>{
    console.log("here length",data.length)
    window.addEventListener("scroll",()=>props.setSuggestions([]))
    },[data])

    useEffect(()=>{
        setTimeout(()=>{
            console.log("start time")
            setNotFound(false)
            console.log("staic",staticData)
            console.log(props.search)
            let data2=staticData;
            if(props.search.length >0 && !waiting){
                let sug=data2.filter((item)=>{
                   return item.name.toLowerCase().startsWith(props.search.toLowerCase())
                }).map((item)=>(item.name))
                let searchResult=data2.filter((item)=>{
                   return item.name.toLowerCase().startsWith(props.search.toLowerCase())
                })
                setData(searchResult)
                if(searchResult.length <=0){
                    setNotFound(true)
                }
           if(sug.length>5){
            sug.length=5;
           }
        props.setSuggestions(sug)
            }
            else{
                setData(staticData)
                props.setSuggestions([])
            }
            console.log("end time")
        },500)
      
    },[props.search,staticData])
    return (
        <div id="table" onScroll={()=>props.setSuggestions([])} className='table'>
         <select style={{background:"gray"}} onChange={(e)=>setSort(e.target.value)} className="form-select" aria-label="Default select example">
  <option value="name" selected>Sort By</option>
  <option  value="name">City</option>
  <option value="cou_name_en">Country</option>
  <option value="ascii_name">Asciname</option>
</select>
            {waiting ? (
               null
            ) : notFound ?<h1>No Result Found</h1> : (
               
                <div className='row'>
                    <div className='col'>
                        <b>City</b>
                    </div>
                    <div className='col'>
                        <b>Country</b>
                    </div>
                    <div className='col'>
                        <b>Timezone</b>
                    </div>
                    <div className='col'>
                        <b>Asciname</b>
                    </div>
                    <div className='col'>
                       <b>Country Code</b> 
                    </div>
                </div>
            )} 
           <InfiniteScroll
            dataLength={data.length} 
            next={fetchData}
            hasMore={data.length <=90 && props.search.length ===0}
            loader={ !notFound && <h4> <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div> Loading...</h4>}
         scrollableTarget="table"
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Only 100 Results Avalible For Free</b>
                </p>
            }
        >
            { data.map((item, index) => (
                <div className='row' key={index}>
                    <Link className='col' onContextMenu={()=>window.open(`weather/${item.coordinates.lon}/${item.coordinates.lat}`,"_blank")} to={`weather/${item.coordinates.lon}/${item.coordinates.lat}`} >{item.name}</Link>
                    <div className='col'>
                        {item.cou_name_en}
                    </div>
                    <div className='col'>
                        {item.timezone}
                    </div>
                    <div className='col'>
                        {item.ascii_name}
                    </div>
                    <div className='col'>
                        {item.country_code}
                    </div>
                </div>
            ))  }
           </InfiniteScroll>
          
        </div>
    );
};

export default Table;
