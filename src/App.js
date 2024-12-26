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

  //Age points
  const valueMappingAge = {
    option1: 52,
    option2: 27,
    option3: 0,
  };

  //STAT score points
  const valueMappingStat = {
    option1: 0,
    option2: 33,
    option3: 53,
    option4: 65,
    option5: 96,
    option6: 87,
  }; 

  //STAT score points .. these are not linear and the input values jump at the end of the range
  let valueMappingVIS = {
    "0": 0,
    "1": 11,
    "2": 22,
    "3": 33,
    "4": 44,
    "5": 55,
    "6": 65,
    "7": 74,
    "8": 81,
    "9": 87,
    "10": 92,
    "11": 95,
    "12": 97,
    "13": 99,
    "14": 100,
    "15": 100,
    "20": 99,
    "25": 98,
    "30": 97,
  };

  //treat values in above mapping between 16 and 19 as 15
  for (let i = 16; i < 20; i++) {
    valueMappingVIS[i] = valueMappingVIS["15"];
  }
  //and treat values in above mapping between 21 and 24 as 20
  for (let i = 21; i < 25; i++) {
    valueMappingVIS[i] = valueMappingVIS["20"];
  }
  //and treat values in above mapping between 26 and 29 as 25
  for (let i = 26; i < 30; i++) {
    valueMappingVIS[i] = valueMappingVIS["25"];
  }


  //Fluid balance points
  let valueMappingFluidBal = {
    "0": 0,
    "5": 0,
    "10": 1,
    "15": 2,
    "20": 4,
    "25": 5,
    "30": 7,
    "35": 9,
    "40": 11,
    "45": 13,
    "50": 15,
    "55": 17,
    "65": 21,
    "75": 26,
  }

  //treat values in above mapping between 1 and 4 as 0
  for (let i = 1; i < 5; i++) {
    valueMappingFluidBal[i] = valueMappingFluidBal["0"];
  }
  //and treat values in above mapping between 6 and 9 as 5
  for (let i = 6; i < 10; i++) {
    valueMappingFluidBal[i] = valueMappingFluidBal["5"];
  }
  //and treat values in above mapping between 11 and 14 as 10
  for (let i = 11; i < 15; i++) { 
    valueMappingFluidBal[i] = valueMappingFluidBal["10"];
  }
  //and treat values in above mapping between 16 and 19 as 15
  for (let i = 16; i < 20; i++) {
    valueMappingFluidBal[i] = valueMappingFluidBal["15"];
  }
  //and treat values in above mapping between 21 and 24 as 20
  for (let i = 21; i < 25; i++) {
    valueMappingFluidBal[i] = valueMappingFluidBal["20"];
  }
  //and treat values in above mapping between 26 and 29 as 25
  for (let i = 26; i < 30; i++) {
    valueMappingFluidBal[i] = valueMappingFluidBal["25"];
  }
  //and treat values in above mapping between 31 and 34 as 30
  for (let i = 31; i < 35; i++) {
    valueMappingFluidBal[i] = valueMappingFluidBal["30"];
  }
  //and treat values in above mapping between 36 and 39 as 35
  for (let i = 36; i < 40; i++) {
    valueMappingFluidBal[i] = valueMappingFluidBal["35"];
  }
  //and treat values in above mapping between 41 and 44 as 40
  for (let i = 41; i < 45; i++) {
    valueMappingFluidBal[i] = valueMappingFluidBal["40"];
  }
  //and treat values in above mapping between 46 and 49 as 45
  for (let i = 46; i < 50; i++) {
    valueMappingFluidBal[i] = valueMappingFluidBal["45"];
  }
  //and treat values in above mapping between 51 and 54 as 50
  for (let i = 51; i < 55; i++) {
    valueMappingFluidBal[i] = valueMappingFluidBal["50"];
  }
  //and treat values in above mapping between 56 and 64 as 55
  for (let i = 56; i < 65; i++) {
    valueMappingFluidBal[i] = valueMappingFluidBal["55"];
  }
  //and treat values in above mapping between 66 and 75 as 65
  for (let i = 66; i < 75; i++) {
    valueMappingFluidBal[i] = valueMappingFluidBal["65"];
  }

  //CBP duration points
  const valueMappingCBP = {
    option1: 0,
    option2: 24,
    option3: 58,
  };


  // results table
  const pointsTable = {
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


  const handleSubmit = (e) => {
    e.preventDefault();

    const mappedValueAge = valueMappingAge[Age] || 0;
    const mappedValueStat = valueMappingStat[Stat] || 0;
    const intVIS8 = valueMappingVIS[parseInt(VIS8Hr, 10)] || 0;
    const intFluidBal = valueMappingFluidBal[parseInt(FluidBal, 10)] || 0;
    const mappedValueCBP = valueMappingCBP[CBP] || 0;

    const calculationResult = mappedValueAge + mappedValueStat + intVIS8 + intFluidBal + mappedValueCBP;
    setResult(calculationResult);
  };

  return (
    <div>
       <h1 className="text-center mb-4">Cardiac RAI</h1>
       <div className="p-4 border rounded shadow-sm bg-light">
  
      <form  onSubmit={handleSubmit}>
        <h3>Nomogram Variables</h3>
      
        <label className="form-label">
          Age:
          <select className="form-select" value={Age} onChange={(e) => setAge(e.target.value)}>
            <option value="">Select an option</option>
            <option value="option1"> Less than 3 months</option>
            <option value="option2">3-24 months</option>
            <option value="option3"> More than 24 months</option>
          </select>
        </label>
        <br />
    
        <label className="form-label">
          STAT Score:
          <select className="form-select" value={Stat} onChange={(e) => setStat(e.target.value)}>
            <option value="">Select an option</option>
            <option value="option6">Unknown</option>
            <option value="option1">1</option>
            <option value="option2">2</option>
            <option value="option3">3</option>
            <option value="option4">4</option>
            <option value="option5">5</option>
          </select>
        </label>
        <br />

        <label className="form-label">
          VIS at 8 hours (from 0 to 30):
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
        Fluid balance on POD 0, mL/kg (from 0 to 75):
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
          CBP Duration:
          <select className="form-select" value={CBP} onChange={(e) => setCBP(e.target.value)}>
            <option value="">Select an option</option>
            <option value="option1"> Less than 180 minutes</option>
            <option value="option2">More than 180 minutes</option>
            <option value="option3"> Unknown</option>
          </select>
        </label>
        <br />

        <button className="btn btn-primary w-100" type="submit"> Calculate</button>
      </form>
      
      {result !== null && <h3>Points: {result}</h3>}
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

    </div>



  );
};

export default Calculator;
