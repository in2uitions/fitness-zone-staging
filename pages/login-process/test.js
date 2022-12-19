
import React, { useState, useEffect } from "react";

export default function App() {
    const btn = document.getElementById("btn");
    // console.log(input)
    const testFunc = function (event) {
        var input = JSON.stringify({
            "Input": event.target.myInput?.value
        });
        // let inputValue = input.value;
        const apiData = {
            url: "https://pokeapi.co/api/v2/",
            type: "pokemon",
            id: input,
        };

        const { url, type, id } = apiData;
        const apiUrl = `${url}${type}/${id}`;

        fetch(apiUrl)
            .then((data) => {
                if (data.ok) {
                    return data.json();
                }
                throw new Error("Response not ok.");
            })
            .then((pokemon) => generateHtml(pokemon))
            .catch((error) => console.error("Error:", error));

        const generateHtml = (data) => {
            //console.log(data) <-- Slows down the result
            const html = `
            <div class="name">${data.name}</div>
            <img src=${data.sprites.front_default}>
            <div class="details">
                <span>Height: ${data.height}</span>
                <span>Weight: ${data.weight}</span>
            </div>
        `;
            const pokemonDiv = document.querySelector(".pokemon");
            pokemonDiv.innerHTML = html;
        };
    };
    return (
        <>
            <div className="pokemon"></div>
            <button id="btn" onClick={testFunc()}>
                SUBMIT
            </button>
            <input type="text" value="25" id="myInput" />
        </>
    );
}





