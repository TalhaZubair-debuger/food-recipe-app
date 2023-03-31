import './App.css';
import Axios from 'axios';
import { useState } from 'react';
import RecipeTile from './RecipeTile';

function App() {
  const [calories, setCalories] = useState("");
  const [query, setquery] = useState("")
  const [recipes, setrecipes] = useState([])
  const [healthLabel, sethealthLabel] = useState("vegan")
  const [dietLabels, setdietLabels] = useState("balanced")

  const YOUR_APP_ID = "###";
  const YOUR_APP_KEY = "###";
  var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}&dietLabels=${dietLabels}&calories=${calories}&from=0&to=30`
  // curl "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"
  async function getRecipes() {
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  }
  return (
    <div className="app">
      <h1 >The Custom Food Recipe App🍔</h1>
      <form className="app__searchform" onSubmit={onSubmit}>
        <input type="text" className='app__input' placeholder="enter ingridient" value={query} onChange={(e) => setquery(e.target.value)} />
        <select className='app_healthlabels'>
          <option onClick={() => sethealthLabel("vegan")}>Vegan</option>
          <option onClick={() => sethealthLabel("vegitarian")}>Vegitarian</option>
          <option onClick={() => sethealthLabel("paleo")}>Paleo</option>
          <option onClick={() => sethealthLabel("dairy-free")}>Dairy-free</option>
          <option onClick={() => sethealthLabel("gluten-free")}>Gluten-free</option>
          <option onClick={() => sethealthLabel("wheat-free")}>Wheat-free</option>
          <option onClick={() => sethealthLabel("low-sugar")}>Low-sugar</option>
          <option onClick={() => sethealthLabel("egg-free")}>Egg-free</option>
          <option onClick={() => sethealthLabel("peanut-free")}>Peanut-free</option>
          <option onClick={() => sethealthLabel("tree-nut-free")}>Tree-nut-free</option>
          <option onClick={() => sethealthLabel("soy-free")}>Soy-free</option>
          <option onClick={() => sethealthLabel("fish-free")}>Fish-free</option>
          <option onClick={() => sethealthLabel("shellfish-free")}>Shellfish-free</option>
        </select>
        <select className='app_dietLabels'>
          <option onClick={() => setdietLabels("balanced")}>Balanced</option>
          <option onClick={() => setdietLabels("high-fiber")}>High-Fiber</option>
          <option onClick={() => setdietLabels("high-protein")}>High-Protein</option>
          <option onClick={() => setdietLabels("low-carb")}>Low-Carb</option>
          <option onClick={() => setdietLabels("low-fat")}>Low-Fat</option>
          <option onClick={() => setdietLabels("low-sodium")}>Low-Sodium</option>
        </select>

        <input type="text" className="app__calories"
          placeholder='Enter Calories'
          value={calories} onChange={(e) => setCalories(e.target.value)} />
        <input type="submit" className='app__submit' value="Search" />
      </form>


      <div className='app__recipes' >
        {recipes.map(recipe => {
          return <RecipeTile recipe={recipe} />;
        })}
      </div>

    </div>
  );
}

export default App;
