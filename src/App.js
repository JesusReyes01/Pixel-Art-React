import './App.css';
import React from 'react';


function App() {

  const [state, setState] = React.useState({
    height: 20,
    width: 20,
    color: "#3C96B4",
    gridTable: null
  })

  React.useEffect(() => {
    setState({...state, gridTable: document.getElementById('pixelCanvas')})
  },[])

  //Function handles input from input elements
  let handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.value})
  }

  //Function to create grid
  let makeGrid = (event) => {
    event.preventDefault()

    // Deletes grid if it exists
    if(state.gridTable.rows){
      while(state.gridTable.rows.length > 0){
        state.gridTable.deleteRow(0);
      }
    }
    //Creates table
    for (let i=0; i < state.height; i++){
      const row = state.gridTable.insertRow(i);

      for (let j=0; j < state.width; j++){
        const cell = row.insertCell(j);
      }
    }
  }

  let down = false;

  //Added Event Listener to change cell background color when mousedown action on window
  window.addEventListener('mousedown', e => {
    if (e.target.tagName === 'TD') {
      down = true

      window.addEventListener('mouseup', () => {
        down = false
      });

      window.addEventListener('mouseleave', () => {
        down = false
      });

      window.addEventListener('mouseover', e => {
        if (down) {
          if (e.target.tagName === 'TD') {
            e.target.style.backgroundColor = state.color;
          }
        }
      });
      
      if (e.target.tagName === 'TD') {
        e.target.style.backgroundColor = state.color;
      }
    }
  });

  //Event listener for Double Click. If double click on table changes color to NULL
  window.addEventListener('dblclick', e => {
    if(e.target.tagName === 'TD'){
        e.target.style.backgroundColor = null;
    }
  });

  //Function for erase button
  let eraseMode = e => {
    e.preventDefault()
    window.addEventListener('mousedown', e => {
      down = true;
    
      window.addEventListener('mouseup', () => {
        down = false;
      });
    
      window.addEventListener('mouseleave', () => {
        down = false;
      });

      window.addEventListener('mouseover', e => {
        if (down) {
          if (e.target.tagName === 'TD') {
            e.target.style.backgroundColor = null;
          }
        }
      });
    });

    window.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'TD') {
        e.target.style.backgroundColor = null;
      }
    });
  };

  let drawMode = e => {
    e.preventDefault()

    window.addEventListener('mousedown', e => {
      down = true;

      window.addEventListener('mouseup', () => {
        down = false;
      });

      window.addEventListener('mouseleave', () => {
        down = false;
      });

      window.addEventListener('mouseover', e => {
        if (down) {
          if (e.target.tagName === 'TD') {
            e.target.style.backgroundColor = state.color;
          }
        }
      });
    });

    window.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'TD') {
        e.target.style.backgroundColor = state.color;
      }
    });
  };

  let fill = () => {
    state.gridTable.querySelectorAll('td').forEach( e => e.style.backgroundColor = state.color);
  };

  return (
    <div>
      <h1>Pixel Art Maker</h1>
      <div className = "inputs">
          <div className = "column">
              <h4>Choose Grid Size</h4>

              <form id="sizePicker" onSubmit={makeGrid}>

                <div className="grid-input">
                  <span>Grid Height:</span>
                  <input 
                      type="number" 
                      id="inputHeight" 
                      name="height" 
                      min="1" 
                      max="50" 
                      value={state.height}
                      onChange={handleChange}/>
                </div>

                <div className="grid-input">
                  <span>Grid Width:</span>
                  <input 
                      type="number" 
                        id="inputWidth" 
                        name="width" 
                        min="1" 
                        max="50" 
                        value={state.width}
                        onChange={handleChange}/>
                </div>

                <input 
                    id="submitButton" 
                    type="submit" 
                    value="SUBMIT" 
                    onClick={makeGrid}
                    />
              </form>
          </div>

          <div className = "column">
              <h4>Pick A Color</h4>
              <input 
                type="color" 
                id="colorPicker" 
                name="color"
                value={state.color}
                onChange={handleChange}
                />
              <input 
                type="button" 
                className="fill-button" 
                value="FILL"
                onClick={fill}/>
          </div>

          <div className="column">
              <h4>Mode</h4>
              <input 
              type="button" 
              className="erase-mode" 
              value="ERASE"
              onClick={eraseMode}/>
              <p><em>or double-click to erase</em></p>
              <input 
              type="button" 
              className="draw-mode" 
              value="DRAW"
              onClick={drawMode}/>
          </div>
      </div>

      <h2>Design Canvas</h2>
      <table className='pixel-canvas' id="pixelCanvas"></table>
    </div>
  );
}

export default App;
