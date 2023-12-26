import React from "react";

function Body2(){
    const number = 1;

    if(number % 2 === 0){
        return (
            <div>
                <h1>Body2</h1>
                {number}은(는) 짝수다.
            </div>
        )
    } else{
        return (
        <div>
            <h1>Body2</h1>
            {number}은(는) 짝수다.
        </div>
        )
    }
};

export default Body2;