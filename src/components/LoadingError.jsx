import CancelIcon from '@mui/icons-material/Cancel';

export function LoadingError(props){
  //component that get displayed if fetching from the api endpoint results in an error
  return(<>
    <div className='loadingComponent err'>
      <h2>Error Retrieving Data.</h2>
      <CancelIcon style={{fontSize: "4rem"}}/>
    </div>
  </>)
}