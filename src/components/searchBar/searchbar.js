import React, { Component, useState } from 'react';
import "./searchbar.css";
import Categories from "../lib/categories"


export default function SearchBar(props) {

  let items = [];
  if (props.products) items = props.products.map(product => product.title)
  else items = [
    "ather",
    "ahmad",
    "shahid",
    "shah",
    "ali",
    "aaa",
    "ahm",
    "arshad",
    "mango",
    "banana",
    "kino",
    "black",
    "arm",
    "angle",
    "angel",
    "argument",
    "armans",
    "adha",
    "aram",
    "art"
  ]
  const [suggestions, setSuggestions] = useState("")
  const [text, setText] = useState("")
  const [searchText, setSearchText] = useState("")
  const [searchCategory, setSearchCategory] = useState("")

  const onTextChanged = (e) => {
    const value = e.target.value;
    let suggestionArray = [];
    if (value.length > 0) {
      let length = value.length;
      suggestionArray = (items.sort().filter(v => v.slice(0, length).includes(value, 0))).slice(0, 10)
      console.log(suggestionArray)
    }
    setSuggestions(suggestionArray)
    setText(value)
  }

  const suggestionSelector = (value) => {
    setText(value)
    setSuggestions("")
  }

  const searchHandler = (e) => {
    e.preventDefault();
    if (e.target.searchText.value === "") return

    setSearchText(e.target.searchText.value)
    setSearchCategory(e.target.searchCategory.value)
  }

  return (
    <div className="container">
      <form onSubmit={searchHandler} noValidate="novalidate">
        <div className="row ">
          <div className=" AutoComplete col-lg-5 col-md-4 col-sm-12 p-2">
            <input autoComplete="off" type="text" name="searchText" className="form-control"
              value={text} placeholder="Type your Search here !"
              onChange={onTextChanged} />
            <ul>
              {suggestions.length > 0 ?
                suggestions.map((item, index) => <li key={index} onClick={() => suggestionSelector(item)} >{item}</li>)
                : null}
            </ul>
          </div>

          <div className="col-lg-4 col-md-3 col-sm-12 p-2">
            <select className="form-control search-slt" name="searchCategory">
              {Categories.map((key, index) => <option value={key.id}>{key.value}</option>)}
            </select>

          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 p-2">
            <button type="submit" className="btn btn-block bigBlueButton">Search</button>
          </div>
        </div>

      </form>
    </div>

  )
}

