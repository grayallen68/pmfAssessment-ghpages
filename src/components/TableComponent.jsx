import { useEffect, useState } from 'react'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

//create a table component that takes a list of objects and converts it into a table

export function Table(props) {
    //constuct a 2 column table base on the passed in props
    //split the data array into data segments of a given size
    function segmentData(dataArray) {
      const segmentSize = 15;
      const segments = [];
      const segmentCount = Math.ceil(dataArray.length / segmentSize);
  
      //determine the number of required segments and create an array of arrrays of that size
      
      for (let i = 0; i < segmentCount; i++) {
        const seg = [];
        //fill the segment with appropriate data
        for (let j = (i * segmentSize); j < (i * segmentSize + segmentSize); j++) {
          if (j < dataArray.length) {
            seg.push(dataArray[j]);
          } else {
            //push blank placeholders to fill out the table
            seg.push({ id: " - ", item: " - " });
          }
        }
        
        //add the segment to the array of segments
        segments.push(seg);
      }
  
      return segments;
  
    }
  
    function filterData(str, dataList) {
      //use the passed in string to match items in the data array
      //recreate a new data list based on what matches the string
      //set the new data list as the state's dataList
      const newList = [];
  
      //iterate through each item in props.data and add what matched to newlist
      for (let i in dataList) {
        if (dataList[i].item.toLowerCase().includes(str.toLowerCase())) {
          newList.push(dataList[i]);
        }
      }
  
      return newList;
    }
  
    function createRows(data) {
      //creates <tr> elements based on the passed in data array
      //one row for "id" value and one row for "item" value
      //return list of jsx components
  
      const tableRows = [];
  
      for (let i in data) {
        const id = data[i].id;
        const item = data[i].item;
  
        tableRows.push(
          <tr key={"tr" + i}>
            <td style={{ width: "8em" }}>{id}</td>
            <td style={{ width: "24em" }}>{item}</td>
          </tr>
        );
      }
  
      return tableRows;
    }
  
    //state variables
    //need to keep a record of all the available data in a single list -- this state variable should respond to search filtering
    //keep a variable that stores the segment of data to be rendered in the table
  
    const [dataList, setDataList] = useState([...props.data]); //change this state varriable for search filtering
    const segmentedData = segmentData(dataList);
    
    const [renderedData, setRenderedData] = useState(segmentedData[0]);
    const [segmentIndex, setSegmentIndex] = useState(0); //index of the nested list to be rendered in the table
    //state variable for search input
    const [searchInput, setSearchInput] = useState("");
  
  
  
    return (<>
      <div className='tableContainer'>
        <h2>{props.title}</h2>
        <div className='tableNav'>
  
          <div className='buttons'>
            <button onClick={() => {
              //change the segmentIndex -- keep it within the bounds of the segments array
              let newIndex = segmentIndex - 1;
              if (newIndex >= 0) {
                //if the calculated index value is valid, change the state's index as well as the data to display
                setSegmentIndex(newIndex);
                setRenderedData(segmentedData[newIndex]);
              }
  
            }}> <KeyboardArrowLeftIcon fontSize='large' /> </button>
  
            {/* adding pagination label for better ux */}
            <div className='pageLabel'> {segmentIndex + 1} / {segmentData(dataList).length} </div>
  
            <button onClick={() => {
              //change the segmentIndex -- keep it within the bounds of the segments array
              let newIndex = segmentIndex + 1;
              if (newIndex < segmentedData.length) {
                //if the calculated index value is valid, change the state's index as well as the data to display
                setSegmentIndex(newIndex);
                setRenderedData(segmentedData[newIndex]);
              }
  
            }}> <KeyboardArrowRightIcon fontSize='large'/> </button>
  
          </div>
          <div className='searchFilter'>
            <input type='search' placeholder='search' value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                //filter the data and update the state
                let newData = filterData(e.target.value, props.data);
                setDataList(newData);
                let newSegmentedData = segmentData(newData);
                setSegmentIndex(0);
                setRenderedData(newSegmentedData[0]);
              }} />
          </div>
  
        </div>
        <table>
          {/* establish columns */}
          <thead>
            <tr>
              <th>id</th><th>item</th>
            </tr>
          </thead>
  
          <tbody>
            {createRows(renderedData)}
          </tbody>
        </table>
      </div>
  
    </>);
  }