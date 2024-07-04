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

    if (selected.find(meal => meal.id === mealId) === undefined) {
      let newSelection = { "id": mealId, "counter": 1};
      getSelected.push(newSelection)
    } else {
      const currentMeal = selected.find(meal => meal.id === mealId);
      currentMeal.counter = currentMeal.counter + 1
    }
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
                                        <div onClick={() => {handleSelect(meal.id)}} key={meal.id} className='cat-card'>
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
                                    <div className='cart-listing--item'>
                                    <div> 
                                      <div className='counter'>
                                        <button>-</button>
                                        <span>{list.counter}</span>
                                        <button>+</button>
                                        <span>article name</span>
                                      </div>
                                    </div>
                                    <div className='price'>0</div>
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
