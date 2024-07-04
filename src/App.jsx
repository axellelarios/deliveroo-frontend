import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"

function App() {

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
            logo
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
                            return (
                              <div key={categorie.name} className='cat-wrapper'>
                                <h2>{categorie.name}</h2>
                                <div className='cat-content'>
                                     {categorie.meals.map((meal, index) => {
                                       return (
                                        <div className='cat-card'>
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
                        })}
                    </div>
                    <div className='content-right cart'>
                        column right
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
