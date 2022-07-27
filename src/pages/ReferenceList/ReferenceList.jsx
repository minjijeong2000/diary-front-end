import styles from './ReferenceList.module.css'
import ReferenceCard from '../../components/ReferenceCard/ReferenceCard'

const ReferenceList = (props) => {

  return (
    <>
      <h1>Things to Reference</h1>
      <div className={styles.container}>
        {props.references.map(reference =>
          <ReferenceCard 
            reference={reference} 
            key={reference._id} 
            handleDeleteReference={props.handleDeleteReference}
            user={props.user}
          />
        )}
      </div>
    </>
  );
}

export default ReferenceList;