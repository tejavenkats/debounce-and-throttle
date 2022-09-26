import './App.css';
import { useCallback, useEffect, useState } from 'react';
import Box from './components/Box';

// 1. Create a textbox and a submit button., the textbox specifies the number of boxes to be added on screen. The boxes should appear besides each other, 100px x 100px, grey in color, margin 5px, and should wrap to the next line when more are added.
// 2. Now boxes should be added whenever screen is resized.
// 3. addition of elements such that every 3 seconds only one element is added
// 4. addition of elements such that element is only added when resize stops for 3s

function App() {

  const [items, setItems] = useState(0);
  const [boxesToAdd, setBoxesToAdd] = useState('');
  const [currentConcept, setCurrentConcept] = useState('debounce');

  const handleAddBoxes = (explicitNumber) => {
    console.log(explicitNumber);
    setItems((prevItems) => !!explicitNumber ?  Number(prevItems) + Number(explicitNumber) :  Number(prevItems) + Number(boxesToAdd));
  };

  const handleOnChange = (e) => {
    if(e) setBoxesToAdd(Number(e.target.value));
  }

  let isThrottled;
  let timeout;

  const resizeEventListener = (e) => {
    if(currentConcept === 'debounce')
    {
      if(timeout) clearTimeout(timeout);
      timeout = setTimeout(() => handleAddBoxes(1), 3000);
    }else{
      if(!isThrottled){
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false
          handleAddBoxes(1)
        }, 3000);
      }
    }
  }

  useEffect(() => {
    if(window){
      window.addEventListener('resize', resizeEventListener);
    }
    return () => {
      window.removeEventListener('resize', resizeEventListener);
    }
  }, [currentConcept])

  const handleRadioOnChange = (e) => {
    console.log(e.target.value);
    setCurrentConcept(() => e.target.value);
  }

  return (
    <>
    <input type='radio' checked={currentConcept === 'debounce'} value='debounce' onChange={handleRadioOnChange} />
    <label >debounce</label>
    <input type='radio' checked={currentConcept === 'throttle'} value='throttle' onChange={handleRadioOnChange} />
    <label >throttle</label>
    <input value={boxesToAdd} onChange={handleOnChange} type='number' />
    <button onClick={() => handleAddBoxes()} >Add boxes</button>
    <div className='box-container'>
      {
      items > 0 && Array(items).fill(<Box />)
      }
    </div>
    </>
  );
}

export default App;
