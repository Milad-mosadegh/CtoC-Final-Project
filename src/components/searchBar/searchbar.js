import React, { Component } from 'react';
import "./searchbar.css";
import Categories from "../lib/categories"

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.items = [
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
    this.state = {
      suggestions: [],
      text: "",
      searchText: "",
      searchCategory: ""

    }
  }
  onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      let length = value.length;
      suggestions = (this.items.sort().filter(v => v.slice(0, length).includes(value, 0))).slice(0, 10)
    }
    this.setState({ suggestions, text: value })
  }

  renderSuggestion = () => {

    const { suggestions } = this.state;
    if (suggestions.length < 1) return null

    return (
      <ul>
        {suggestions
          .map((item, index) =>
            <li key={index}
              onClick={() => this.suggestionSelector(item)} >
              {item}</li>)}
      </ul>
    )

  }

  suggestionSelector = (value) => {
    this.setState(() => ({
      text: value,
      suggestions: []
    }))
  }
  searchHandler = (e) => {
    e.preventDefault();
    if (e.target.searchText.value === "") return console.log("no search selecte")
    this.setState({
      searchText: e.target.searchText.value,
      searchCategory: e.target.searchCategory.value
    })
    console.log(this.state)

  }


  render() {
    return (




      <div className="container">
        <form onSubmit={this.searchHandler} noValidate="novalidate">
          <div className="row ">
            <div className=" AutoComplete col-lg-5 col-md-4 col-sm-12 p-2">
              <input autoComplete="off" type="text" name="searchText" className="form-control"
                value={this.state.text} placeholder="Type your Search here !"
                onChange={this.onTextChanged} />
              {this.renderSuggestion()}
            </div>
            
            <div className="col-lg-4 col-md-3 col-sm-12 p-2">
              <select className="form-control search-slt" name="searchCategory">
                {Categories.map((key,index)=><option value={key.id}>{key.value}</option>)}
              </select>

            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 p-2">
              <button type="submit" className="btn btn-primary wrn-btn">Search</button>
            </div>
          </div>

        </form>

      </div>

    )
  }
}

export default SearchBar;
