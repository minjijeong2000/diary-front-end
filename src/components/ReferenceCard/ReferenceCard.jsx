import { Link } from 'react-router-dom'

const ReferenceCard = ({reference, handleDeleteReference, user}) => {
  return (
    <div className="reference-card">
      <img 
        src={
          reference.photo
        } 
        alt=""
        className="card-img-top"
        style={{width: "640px"}}
      />
      <div className="reference-card-body">
        <h2 className="reference-card-text">{reference.name}</h2>
      </div>
      {user?.profile === reference.owner?._id &&
        <div className="reference-card-footer">
          <Link
            to="/edit"
            className='btn btn-sm btn-warning'
            state={{reference}}
          >
            Edit
          </Link>
          <button 
            className="btn btn-sm btn-danger m-left"
            onClick={()=> handleDeleteReference(reference._id)}
          >
            Delete
          </button>
        </div>
      }
    </div>
  )
}

export default ReferenceCard;