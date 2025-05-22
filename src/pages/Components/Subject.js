import { Link } from 'react-router-dom';
//import { Data } from '../core/data/Subjects';
export default function Subject({id,name}){
    return (<div className="subject"> 
    <Link to={"/Subject/" + name}><h5 className='subjectName'>{name}</h5></Link>
    </div>
    )
  }