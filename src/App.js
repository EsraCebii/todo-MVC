
import React,{ useState}from 'react';
import './App.css';

const INITIAL_STATE = [
  { id: 1, baslik: "Learn React", tamamlandi: false },
  { id: 2, baslik: "Learn JS", tamamlandi: false }
];

function App() {
  const [liste, setListe] = useState(INITIAL_STATE);
  const [yeniBaslik,setYeniBaslik]=useState("");
  console.log("YENİ BAŞLIK:", yeniBaslik);

  return (
    <section className="todoapp">
	    <header className="header">
		    <h1>todos</h1>
		    <form 
          onSubmit={(e)=> 
            
            {
              e.preventDefault();
              setListe([
                ...liste,
                {id:Date.now(), baslik:yeniBaslik, tamamlandi:false }
              ]);
              setYeniBaslik("");
            }

          }
        >
			    <input 
            className="new-todo" 
            value={yeniBaslik} 
            placeholder="What needs to be done?" autoFocus 
            onChange={(e)=>setYeniBaslik(e.target.value)} 
          />
		    </form>
    	</header>

	    <section className="main">
		    <input className="toggle-all" type="checkbox" />
		    <label htmlFor="toggle-all" onClick={()=>{
          setListe(
          liste.map(el => el.tamamlandi === false ? {...el, tamamlandi: !el.tamamlandi} : el
           ))}}>
			  Mark all as complete
		    </label>
		    <ul className="todo-list">
          {liste.map(item=>(
            <li className={item.tamamlandi ? 'completed' : ""} key={item.id}>
              <div className="view" >
                <input className="toggle" type="checkbox" onClick={()=>{
                  setListe(
                    liste.map(el => el.id=== item.id ? {...el, tamamlandi: !el.tamamlandi} : el
                    ))}
                  } />
					      <label>{item.baslik}</label>
					      <button className="destroy" onClick={(e)=> {
                  setListe(liste.filter(el=> el.id !==item.id ))} }/>
              </div>
            </li>
          ))}
		    </ul>
	    </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{liste.length} </strong>
          items left
        </span>

        <ul className="filters">
        <li>
          <button onClick={()=> liste}>All</button>
        </li>
        <li>
          <button onClick={()=> setListe(liste.filter(item=> !item.tamamlandi))}>Active</button>
        </li>
        <li>
          <button onClick={()=> setListe(liste.filter(item=> item.tamamlandi))}>Completed</button>
        </li>
        </ul>

        <button 
          className="clear-completed" 
          onClick={()=> setListe(liste.filter(item=> !item.tamamlandi))}
        >
        Clear completed
        </button>
      </footer>

    </section>

  );
}

export default App;
