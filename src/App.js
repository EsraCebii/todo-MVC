
import React,{ useState, useMemo}from 'react';
import './App.css';

const INITIAL_STATE = [
  { id: 1, baslik: "Learn React", tamamlandi: false },
  { id: 2, baslik: "Learn JS", tamamlandi: false }
];

function App() {
  const [liste, setListe] = useState(INITIAL_STATE); // todo elemanları
  const [yeniBaslik, setYeniBaslik]=useState("");
  const [filter, setFilter] = useState(null) // uygulamak istediğim filtreler null(all), active, completed
  console.log("YENİ BAŞLIK:", yeniBaslik);

  const click = (id) => {
    setListe(
      liste.map(el => el.id=== id ? {...el, tamamlandi: !el.tamamlandi} : el
      ))}

  const filteredData = useMemo(() => { 
    switch(filter){
      case "active":
        return liste.filter(item => !item.tamamlandi);
      case "completed":
        return liste.filter(item=> item.tamamlandi);
      default: 
        return liste;
    }
  },[liste,filter]);




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
              liste.map(el => !el.tamamlandi ? {...el, tamamlandi: !el.tamamlandi} : el
             
          ))}}>
			  Mark all as complete
		    </label>
		    <ul className="todo-list">
          {filteredData.map(item=>(
            <li className={item.tamamlandi ? 'completed' : ""} key={item.id}>
              <div className="view" >
                <input className="toggle" type="checkbox" onClick={()=> {click(item.id)}} />
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
          <button onClick={()=> setFilter(null)}> All </button>
        </li>
        <li>
          <button onClick={()=> setFilter("active")} > Active </button>
        </li>
        <li>
          <button onClick={()=> setFilter("completed")}> Completed </button>
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
