import React from 'react'

const Add = () => {
    return (
        <div className="mb-4">
            <form action="">
                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="name" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="location" />
                    </div>
                    <div className="col">
                        <select className="form-control custom-select my-1 mr-sm-2">
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default Add
