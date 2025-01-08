import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';

const Calculator = () => {
  //input variables
  const [Age, setAge] = useState('');
  const [Stat, setStat] = useState('');
  const [VIS8Hr, setVIS8] = useState('');
  const [FluidBal, setFluidBal] = useState('');
  const [CBP, setCBP] = useState('');

  //result of the calculation
  const [result, setResult] = useState(null); //the cumulative points
 // const [risk, setRisk] = useState(null); //the estimated risk
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const calculationResult = calculateRisk(
      Age, 
      Stat,
      VIS8Hr, 
      FluidBal, 
      CBP) 
    setResult(calculationResult);
  };

  return (
    <div>
       <h1 className="text-center mb-4">Cardiac RAI</h1>
       <div className="p-4 border rounded shadow-sm bg-light">
  
      <form  onSubmit={handleSubmit}>
        <h2>Nomogram Variables</h2>
        <p>Enter the values to calculate total points. Reference tables for overall risk score and points system appear below.</p>
      
        <label className="form-label">
          Age
          <select className="form-select" value={Age} onChange={(e) => setAge(e.target.value)}>
            <option value="">Select an option</option>
            <option value="Less than 3 months"> Less than 3 months</option>
            <option value="3-24 months">3-24 months</option>
            <option value="More than 24 months"> More than 24 months</option>
          </select>
        </label>
        <br />
    
        <label className="form-label">
          STAT Score
          <select className="form-select" value={Stat} onChange={(e) => setStat(e.target.value)}>
            <option value="">Select an option</option>
            <option value="Unknown">Unknown</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <br />

        <label className="form-label">
          VIS at 8 hours (from 0 to 30)
          <input className="form-control"
            type="number"
            value={VIS8Hr}
            onChange={(e) => setVIS8(e.target.value)}
            max="30"
            min="0"
          />
        </label>
        <br />
        
        <label className="form-label">
        Fluid balance on POD 0, mL/kg (from 0 to 75)
          <input className="form-control"
            type="number"
            value={FluidBal}
            onChange={(e) => setFluidBal(e.target.value)}
            max="75"
            min="0"
          />
        </label>
        <br />

        <label className="form-label">
          CBP Duration
          <select className="form-select" value={CBP} onChange={(e) => setCBP(e.target.value)}>
            <option value="">Select an option</option>
            <option value="Less than 180 minutes"> Less than 180 minutes</option>
            <option value="More than 180 minutes">More than 180 minutes</option>
            <option value="Unknown"> Unknown</option>
          </select>
        </label>
        <br />

        <button className="btn btn-primary w-100" type="submit"> Calculate</button>
      </form>
      
      {result !== null && <h3>Total points: {result}</h3>}
    </div>

    <div className="p-4 border rounded shadow-sm bg-light">
    <h3>Reference Risk Table</h3>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Total Points</th>
          <th>Predicted Risk of Outcomes</th>
        </tr>
      </thead>     

      <tbody>
        {Object.entries(pointsTable).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

    <div className="p-4 border rounded shadow-sm bg-light">
      <h2>Reference for points</h2>
      
      <div>
        <h3>Points for Age</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Age</th>
              <th>Points</th>
            </tr>
          </thead>     

          <tbody>
            {Object.entries(valueMappingAge).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Points for STAT Score</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>STAT Score</th>
              <th>Points</th>
            </tr>
          </thead>     

          <tbody>
            {Object.entries(valueMappingStat).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div>
        <h3>Points for VIS at 8 hours</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>VIS at 8 hours</th>
              <th>Points</th>
            </tr>
          </thead>     

          <tbody>
            {Object.entries(valueMappingVIS).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Points for Fluid Balance on POD 0, mL/kg</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Fluid Balance</th>
              <th>Points</th>
            </tr>
          </thead>     

          <tbody>
            {Object.entries(valueMappingFluidBal).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Points for CBP Duration</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>CBP Duration</th>
              <th>Points</th>
            </tr>
          </thead>     

          <tbody>
            {Object.entries(valueMappingCBP).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>    

    </div>



  );
};

export default Calculator;

 //parse input values and calculate the total points
 export const calculateRisk = (
  Age, 
  Stat,
  VIS8Hr, 
  FluidBal, 
  CBP
) => {

  const mappedValueAge = valueMappingAge[Age] || 0;
    const mappedValueStat = valueMappingStat[Stat] || 0;
    
    const parsedKeyVIS8 = parseInt(VIS8Hr, 10);  

    //if parsedkey is not in the keys for valuemappingVIS8, find the largest key that is less than parsedkey
    let intVIS8 = 0;
    for (let key in valueMappingVIS) {
      if (parsedKeyVIS8 >= key) {
        intVIS8 = valueMappingVIS[key];
      }
    }  

    //do the same for fluid balance
    const parsedKeyFBal = parseInt(FluidBal, 10);  
    let intFluidBal = 0;
    for (let key in valueMappingFluidBal) {
      if (parsedKeyFBal >= key) {
        intFluidBal = valueMappingFluidBal[key];
      }
    }

    const mappedValueCBP = valueMappingCBP[CBP] || 0;

    return mappedValueAge + mappedValueStat + intVIS8 + intFluidBal + mappedValueCBP;
}

  //Age points
  export const valueMappingAge = {
    "Less than 3 months": 52,
    "3-24 months": 27,
    "More than 24 months": 0,
  };

  //STAT score points
  export const valueMappingStat = {
    "1": 0,
    "2": 33,
    "3": 53,
    "4": 65,
    "5": 96,
    "Unknown": 87,
  }; 

  //STAT score points .. these are not linear and the input values jump at the end of the range
  export const valueMappingVIS = {
    0: 0,
    1: 11,
    2: 22,
    3: 33,
    4: 44,
    5: 55,
    6: 65,
    7: 74,
    8: 81,
    9: 87,
    10: 92,
    11: 95,
    12: 97,
    13: 99,
    14: 100,
    15: 100,
    20: 99,
    25: 98,
    30: 97,
  };

  //Fluid balance points
  export const valueMappingFluidBal = {
    0: 0,
    5: 0,
    10: 1,
    15: 2,
    20: 4,
    25: 5,
    30: 7,
    35: 9,
    40: 11,
    45: 13,
    50: 15,
    55: 17,
    65: 21,
    75: 26,
  }


  //CBP duration points
  export const valueMappingCBP = {
    "Less than 180 minutes": 0,
    "More than 180 minutes": 24,
    "Unknown": 58,
  };

  // results table
  export const pointsTable = {
    0: 0,
    50: 0.01,
    109: 0.05,
    136: 0.1,
    165: 0.2,
    201: 0.4,
    230: 0.6,
    265: 0.8,
    294: 0.9,
    321: 0.95,
  }

