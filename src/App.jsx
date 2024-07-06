import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import logo from "./assets/logo.svg"

function App() {

  const [data, setData] = useState();
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelect = (mealId) => {
    const getSelected = [...selected]
    const cat = data.categories

    let allMeals = []
    for (let i=0; i < cat.length; i++) {
      let meals = cat[i].meals
      if(meals.find(meal => meal.id === mealId)) {
         allMeals.push(meals.find(meal => meal.id === mealId))
         break
      }   
    }

    if (selected.find(meal => meal.id === mealId) === undefined) {
      let newSelection = { 
        "id": mealId, 
        "counter": 1, 
        "name":  allMeals[0].title, 
        "total": allMeals[0].price, 
        "price":  allMeals[0].price 
      };
      getSelected.push(newSelection)
    } else {
      const currentMeal = selected.find(meal => meal.id === mealId);
      console.log(currentMeal)
      let priceInit = (parseFloat(currentMeal.price))
      let totalPrice = (parseFloat(currentMeal.total))
      currentMeal.counter = currentMeal.counter + 1
      currentMeal.total = totalPrice + priceInit
    }
    setSelected(getSelected)
  }

  const handleMinus = (id) => {
    const getSelected = [...selected]
    const currentMeal = selected.find(meal => meal.id === id);

    if(currentMeal.counter === 1){
      getSelected.splice(currentMeal, 1)
    } else {
    let priceInit = (parseFloat(currentMeal.price))
    let totalPrice = (parseFloat(currentMeal.total))
    currentMeal.counter = currentMeal.counter - 1
    currentMeal.total = totalPrice - priceInit    
    }
    setSelected(getSelected)
  }

  const handlePlus = (id) => {
    const getSelected = [...selected]
    
    const currentMeal = selected.find(meal => meal.id === id);
    let priceInit = (parseFloat(currentMeal.price))
    let totalPrice = (parseFloat(currentMeal.total))
    currentMeal.counter = currentMeal.counter + 1
    currentMeal.total = totalPrice + priceInit    

    setSelected(getSelected)
  }

  useEffect(()=> {
    const fetchData = async ()=> {
      try {
        const response = await axios.get("https://site--backend-deliveroo--z96jrv9g2mbz.code.run/")
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); 
      }
    }
    fetchData();
  }, [])


  return isLoading ? (
    <span>En cours de chargement...</span> 
    ) : (
    <>
      <div>
        <header>
          <div className='container'>
            <img src={logo} alt="Deliveroo - app"/>
          </div>
        </header>
        <main>
          <section className='hero'>
            <div className='container'>
              <div className='hero-wrapper'>
                  <div>
                    <h1>{data.restaurant.name}</h1>
                    <p>{data.restaurant.description}</p>
                  </div>
                  <div className='image'><img src={data.restaurant.picture} /></div>
              </div>
            </div>
          </section>
          <section className='content'>
            <div className='container'>
              <div className='content-wrapper'>
                    <div className='content-left'>

                        {data.categories.map((categorie, index) => {
                            return categorie.meals.length > 1 
                              ? ( <div key={categorie.name} className='cat-wrapper'>
                                <h2>{categorie.name}</h2>
                                <div className='cat-content'>
                                     {categorie.meals.map((meal, index) => {
                                       return (
                                        <div  key={meal.id} onClick={() => {handleSelect(meal.id)}} className='cat-card'>
                                            <div> 
                                              <h4>{meal.title}</h4>
                                              {meal.description 
                                              ? <p>
                                                  {meal.description.length > 80 ?
                                                    `${meal.description.substring(0, 80)}...` : meal.description
                                                  }                                            
                                                </p>
                                              : null
                                              } 
                                              <span>{meal.price}€</span>
                                            </div>
                                            {meal.picture
                                              ? <img src={meal.picture} /> 
                                              : null
                                            }                                     
                                        </div>
                                      )
                                    })}
                                </div>
                              </div>
                            ) 
                            : null
                          })
                        }
                    </div>
                    <div className='content-right cart'>
                        <div className='cart-content'>
                           <button className='submit'>Valider mon panier</button>
                           <div className='cart-listing'> 
                              {selected.map((list, index) => {
                                  return (
                                    <div key={list.id} className='cart-listing--item'>
                                    <div> 
                                      <div className='counter'>
                                        <button onClick={()=>{handleMinus(list.id)}}>-</button>
                                        <span className='counter-nb'>{list.counter}</span>
                                        <button onClick={()=>{handlePlus(list.id)}}>+</button>
                                        <span>{list.name}</span> 
                                      </div>
                                    </div>
                                    <div className='price'>{list.total}€</div>
                                  </div>
                                  )
                              })}
                           </div>
                        </div>
                    </div>
              </div>
            </div>
          </section>
        </main>
        <footer>

        </footer>

      </div>
    
    </>
  )
}

export default App
