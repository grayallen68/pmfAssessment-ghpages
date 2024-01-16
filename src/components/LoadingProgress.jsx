export function LoadingProgress(props) {
  //animated component to be displayed while the data is being retrieved from the api
  return(<>
    <div className='loadingComponent'>
      <h2>Retrieving Data...</h2>
      <div className="loader" ></div>
    </div>
  </>)
}
