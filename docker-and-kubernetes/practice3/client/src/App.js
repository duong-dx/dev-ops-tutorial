import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  
  const [dataState, setDataState] = useState({
     seenIndexes: [],
     values: {},
     index: ''
  });

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current');

    setDataState({
      ...dataState,
      values: values.data
    })
  }

  const fetchIndexes = async () => {
    const values = await axios.get('/api/values/all');

    setDataState({
      ...dataState,
      seenIndexes: values.data
    })
  }

  const onChange = (event) => { 
    event.preventDefault(); 

    setDataState({...dataState, index: event.target.value})
  }

  const renderSeenIndexes = () => {
    return dataState.seenIndexes.map((index) => index).join(', ');
  }

  const renderValues = () => {
    const entries = [];

    for (let key in dataState.values) {
      entries.push(
        <div key={key}>
           for index {key} calculated {dataState.values[key]}
        </div>
      )
    }

    return entries;
  }

  const handleSubmit = async () => {
    await axios.post('/api/values', {
      index: dataState.index
    });

    setDataState({
      ...dataState,
      index: ''
    })
  }

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  return (
    <div className="App">
      <input placeholder='enter your index' value={dataState.index} onChange={onChange}/>
      <button onClick={handleSubmit}>Submit</button>

      <h3>Indexs i have seeen: </h3>
      {renderSeenIndexes()}

      <h3>calculate value:</h3>
      {renderValues()}
    </div>
  );
}

export default App;
