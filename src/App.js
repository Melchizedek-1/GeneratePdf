import './App.css';
import { useEffect, useState } from 'react';
import { getOffences } from './api/OffencesApiRoute';
import LineGraph from './components/LineChart';

function App() {
    const [data, setData] = useState([]);

    const getAllOffences = async () => {
        await getOffences().then((response) => {
            console.log(response);
            setData(response)
        });
    };


    useEffect(() => {
        getAllOffences()
    }, [])

  return (
    <div className="App">
      <LineGraph data={data} />
    </div>
  );
}

export default App;
