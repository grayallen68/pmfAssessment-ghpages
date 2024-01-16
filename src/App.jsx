import { useEffect, useState } from 'react'
import './App.css'

import { Table } from './components/TableComponent';
import { LoadingProgress } from './components/LoadingProgress';
import { LoadingError } from './components/LoadingError';


async function fetchData() {
  try {
    let res = await fetch('https://auto-pay-api-sgiognjnfa-uc.a.run.app/auto-pay/get-ui-params');
    if (res.ok) {
      let data = await res.json();
      return data;

      //DATA FORMAT
      // {
      //   "employers": [
      //       {
      //         "id": 5423,
      //         "item": " Casa Churro" 
      //       },
      //     ],
      //   "jobTitles": [
      //       {
      //         "id": 571,
      //         "item": "Accountant" 
      //        }
      //     ]
      // }

    }
  } catch (e) {
    console.error(e);
    return null;
  }

};



function App() {
  
  //define fetch states to represent the status of data loading
  const fetchStates = {
    init: "INIT", loading: "LOADING", 
    success: "SUCCESSS", error: "ERROR"
  }

  const [fetchStatus, setFetchStatus] = useState(fetchStates.init);
  const [dat, setData] = useState({});

  useEffect(() => {
    //fetch the employer and job description data from the api
    //https://auto-pay-api-sgiognjnfa-uc.a.run.app/auto-pay/get-ui-params
    //immediately set fetchstatus to indicate the loading has started
    setFetchStatus(fetchStates.loading);

    async function getJobData() {
      let d = await fetchData();
      if (!d) {
        //if fetching the data fails set the state of the component to reflect it
        setFetchStatus(fetchStates.error);
        return;
      }
      setFetchStatus(fetchStates.success);
      setData(d);
    }

    getJobData();
  
  }, []);

  return (
    <>
      <div className='mainContainer'>
        <div className='container1'>
          {/* {fetchSuccessful? "success" : "failure"} */}
          {/* only render the table components if loading the data from the api was successful */}
          {fetchStatus == fetchStates.success ?
            <Table title="Job Titles"
              data={dat.jobTitles} />
            : null}
          {fetchStatus == fetchStates.success ?
            <Table title="Employers"
              data={dat.employers} />
            : null}

          {fetchStatus == fetchStates.loading ?
            <LoadingProgress /> : null
          }

          {fetchStatus == fetchStates.error ?
            <LoadingError /> : null
          }

        </div>
      </div>
    </>
  )
}

export default App
