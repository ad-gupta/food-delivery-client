import React from 'react'
import Carousel from 'react-material-ui-carousel'

const data = [
    "Hungry", "Cooking gone wrong", "Unexpected guests", "Movie Marathon", "Game Night", "Late night at office"
]

const Banner = () => {
  return (
    <div style={{width: '50vw', textAlign: 'center'}}>
        <Carousel 
        className='carasousel'
        autoPlay= {true}
        animation ='slide'
        indicators= {false}
        navButtonsAlwaysVisible= {false}
        cycleNavigation= {true}
        navButtonsProps= {{
            style:{
                color: "black",
                borderRadius: 0
            }
        }}
    >
    {
        data.map((item, i)=> (
            <div className="slides" key={i}>
              {`${item} ?`}
            </div>
        ))
    }
      
    </Carousel>
    </div>
  )
}

export default Banner
