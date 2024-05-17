//Import hook and library
import React, {useState, useEffect} from 'react';
import './App.css';


function App() {

  //State Hook 
  const [newItem, setNewItem] = useState(""); // holds the value of the new item to be added 
  const [items, setItems] = useState([]); // holds the list of items
  const [showEdit, setShowEdit] = useState(-1);// holds the ID of the item being edited. -1 means no item is being edited
  const [updatedText, setUpdatedText] = useState(""); // holds the upated text for edited item 
  const [getDog, setGetDog] = useState([]);


  const fectchDogImage = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
       .then(response => response.json())
       .then(data => setGetDog(data.message));
  };




  //  async function meow(){
  //   console.log('Let get new Bird data...');
  //   try {
  //     const cat = await fetch('https://jsonplaceholder.typicode.com/todos', { method: 'GET' });
  //     console.log(await cat.json());
  //   } catch (error) {
  //     console.log('Oh no!!', error);
  //   }
  // }; 

  // useEffect(() => {meow()},[]);

  //Helper Function

  function addItem() {// adds a new item to the list 

    if (!newItem){
      alert("Enter an item.");
      return; 
    }

    const item = {
    id: Math.floor(Math.random() * 1000),// generate ID
    value: newItem
  };

  setItems(oldList => [...oldList, item]);
  setNewItem("");
}

  function deleteItem(id){// deletes an item from the list based on id 
    const newArray = items.filter(item => item.id !== id);// filter out the item with the specific ID and update the state.
    setItems(newArray);

  }

  function editItem(id, newText) {// edits an item in the list
    const currentItem = items.filter((item) => item.id === id);

    const newItem = {//create new item with the update text
       id: currentItem.id,
       value: newText,
  };

  deleteItem(id);// delete old item 
  setItems((oldList) => [...oldList, newItem]); // add the new items to the list 
  setUpdatedText("");// clear the input field
  setShowEdit(-1); //to close the edit input field
}

 return (
    <div className="App">
      
      <h1> My Todo List</h1>
      <input 
        type="text"
        placeholder="Add an item.."
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />

      <button onClick={() => addItem()}> Add </button>
      <div> 
      <button onClick={fectchDogImage}> Feel bored?</button>
      {getDog && <img src={getDog} style={{marginTop: '20px'}} />}
      </div>

      <ul>
        {items.map((item) => {
          return (
            <div>
              <li key={item.id} onClick={() => setShowEdit(item.id)}>
                {item.value}
                <button
                  className="delete-button"
                  onClick={() => deleteItem(item.id)}
                >
                  X
                </button>
              </li>

              {showEdit === item.id ? (
                <div>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <button onClick={() => editItem(item.id, updatedText)}>
                    Update
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
