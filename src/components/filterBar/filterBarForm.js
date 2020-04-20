import React from 'react'

export default function FilterBarForm(props) {

    const {categories,colors, conditions, prices, filterHandler} = props
    console.log("in filterform", categories)
    return (
        <div className="container">
        <form  noValidate="novalidate" onSubmit={filterHandler}>
          <div className="row ">
          <div className="col-lg-3 col-md-3 col-sm-12 p-2">
              <select className="form-control search-slt" name="category">
                {categories?categories.map((key,index)=><option value={key.id}>{key.value}</option>):null}
              </select>

            </div>
          <div className="col-lg-2 col-md-2 col-sm-12 p-2">
              <select className="form-control search-slt" name="color">
                {colors?colors.map((key,index)=><option value={key.id}>{key.value}</option>):null}
              </select>

            </div>
          <div className="col-lg-2 col-md-2 col-sm-12 p-2">
              <select className="form-control search-slt" name="condition">
                {conditions?conditions.map((key,index)=><option value={key.id}>{key.value}</option>):null}
              </select>

            </div>
            
            <div className="col-lg-2 col-md-2 col-sm-12 p-2">
              <select className="form-control search-slt" name="price">
                {prices?prices.map((key,index)=><option value={key.id}>{key.value}</option>):null}
              </select>

            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 p-2">
              <button type="submit" className="btn btn-primary wrn-btn">Apply Filters</button>
            </div>
          </div>

        </form>
</div>
    )
}
