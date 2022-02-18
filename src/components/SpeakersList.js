import Speaker from './Speaker';
import useRequestDelay, {REQUEST_STATUS} from './hooks/useRequestDelay';
import ReactPlaceholder from 'react-placeholder';
import { data } from '../../SpeakerData';

function SpeakerList({showSessions}){

  const {data: speakerData, requestStatus, error, updateRecord} = useRequestDelay(2000, data); // custom hook
  
  if(requestStatus ===REQUEST_STATUS.FAILURE){
    return (
      <div className='text-danger'>
        ERROR: <b>loading Speaker Data failed {error} </b>
      </div>
    )
  }


  //if(isLoading === true) return <div>Loading....</div>
    return (
    <div className="container speakers-list">
      <ReactPlaceholder
      type='media'
      rows={15}
      className = "speakerlist-placeholder"
      ready={requestStatus === REQUEST_STATUS.SUCCESS}>
      <div className="row">
        {speakerData.map(function (speaker) {
          return (
            <Speaker 
            key={speaker.id} 
            speaker={speaker}
            showSessions={showSessions}
            onFavoriteToggle={(doneCallback)=>{
              updateRecord({
                ...speaker,
                favorite: !speaker.favorite,
              }, doneCallback)
            }} />
          );
        })}
      </div>
      </ReactPlaceholder>
    </div>
    )
}
export default SpeakerList;