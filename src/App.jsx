import { useEffect, useState } from 'react'
import './App.css'

function App() {

  let [currList,setCurrList] = useState({});
  let [curr1,setCurr1] = useState("");
  let [curr2,setCurr2] = useState("");
  let [from,setFrom] = useState("inr");
  let [to,setTo] = useState("usd");
  let [load,setLoad] = useState(false);

  function swap(){
    setFrom(to);
    setTo(from);
  }

  function resultCurr(){
    load? setCurr2((curr1*currList[to])/currList[from]): "wait...";
  }

  useEffect(resultCurr,[curr1,from,to]);
  async function loadList(){
    let json = await import("./currency.json");
    setCurrList(json.default.inr);
    setLoad(true);
  }

  useEffect(()=>{loadList()},[]);

  const arrList = Object.keys(currList);

  return (
    <>
      <div className='upperContain font-effect-neon'>
        Currency Converter
      </div>
      <div className='outerContain'>
        <div className='innerContain negBotMar'>
          <div className='index'>
            <span>Currency</span>
            <span>From</span>
          </div>
          <div className='input'>
            <select name="" id="" value={from} onChange={(e)=>setFrom(e.target.value)}>
              {
                arrList.map(x=><option key={x} value={x}>{x}</option>)
              }
            </select>
            <input type="number" value={curr1} placeholder='0' onChange={(e)=>Number(setCurr1(e.target.value))}/>
          </div>
        </div>
        <button onClick={swap}>switch 💱</button>
        <div className='innerContain negTopMar'>
          <div className='index'>
            <span>Currencys</span>
            <span>To</span>
          </div>
          <div className='input'>
            <select value={to} onChange={(e)=>setTo(e.target.value)}>
              {
                arrList.map(x=><option key={x} value={x}>{x}</option>)
              }
            </select>
            <input type="number" value={curr2} placeholder='0' onChange={resultCurr} readOnly/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
