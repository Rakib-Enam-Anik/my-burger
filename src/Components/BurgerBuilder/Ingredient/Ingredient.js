import React from 'react';
import BreadTop from '../../../assets/top.png';
import BreadBottom from '../../../assets/bottom.png';
import Meat from '../../../assets/meat.png';
import Salad from '../../../assets/salad.png';
import Cheese from '../../../assets/cheese.png';

const Ingredient = props => {
    let ingredient = null;

    switch (props.type){
        case 'bread-bottom':
            break;
        default:
            ingredient = null;
    }
    return (
        <div>

        </div>
    )
}

export default Ingredient;