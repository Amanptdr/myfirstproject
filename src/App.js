import logo from './logo.svg';
import './App.css';

function App() {
  const data = [{"name":"shivam","age":20,"class":"12th"},
                {"name":"Arpit Patidar","age":28,"class":"10th"},
                {"name":"Ajay Patidar","age":22,"class":"11th"}];
  const functioncall =()=>{
    console.log("shmghlfdblgnfbj");
  }
  return (
    <div className="App">
      TESTING
      {data.map((item)=>
      <div>{item.name}</div>      
      )}
      <button onClick={(e)=>functioncall(e)}>function</button>
     </div>
  )

}
export default App;