import React from 'react';
import classes from './burgeringredient.css';

const BurgerIngredient = (props) => {
    let ingredient = null;

    switch(props.type) {
        case ('BreadTop'):
            ingredient = <div className={classes.BreadTop}>
                            <div className={classes.Seeds1}></div>
                            <div className={classes.Seeds2}></div>
                         </div>
            break;

        case ('meat'):
            ingredient = <div className={classes.Meat}> </div>
            break;

        case ('cheese'):
            ingredient = <div className={classes.Cheese}> </div>
            break;   

        case ('salad'):
            ingredient = <div className={classes.Salad}> </div>
            break;   
        
        case ('bacon'):
            ingredient = <div className={classes.Bacon}> </div>
            break;

        case ('BreadBottom'):
            ingredient = <div className={classes.BreadBottom}> </div>
            break;      
        
        default:
            ingredient = null;    
    }

    return ingredient;
}

export default BurgerIngredient;