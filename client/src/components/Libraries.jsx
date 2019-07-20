import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Libraries.css'

export default class Libraries extends Component {

    state = {
        libraries: [],
        isNewFormDisplayed: false,
        newLibrary: {
            name: "",
            address: "",
            city: "",
            zipcode: "",
            charter: "",
            description: ""
        }
    }

    componentDidMount() {
        this.getAllLibraries();
    }

    getAllLibraries = () => {
        axios.get('/api/libraries')
            .then((res) => {
                this.setState({ libraries: res.data })
            })
    }


    handleInputChange = (event) => {
        const newLibrary = { ...this.state.newLibrary }
        newLibrary[event.target.name] = event.target.value

        this.setState({ newLibrary: newLibrary })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`api/libraries`, this.state.newLibrary)
            .then(() => {
                this.setState({
                    isNewFormDisplayed: false
                })
                this.getAllLibraries()
            })
    }

    handleToggleNewForm = () => {
        this.setState((state) => {
            return { isNewFormDisplayed: !state.isNewFormDisplayed }
        })
    }


    render() {
        let librariesList = this.state.libraries.map((library) => {
            return (
                <div key={library._id} className="libraries">
                    <Link
                        to={`/${library._id}`}
                    >
                        {library.name}


                    </Link>
                    <p>{library.address}</p>
                    <p>{library.city}</p>
                    <p>{library.zipcode}</p>
                    <p>{library.charter}</p>
                    <p>{library.description}</p>
                </div>
            )
        })
        return (
            this.state.isNewFormDisplayed
                ? <form onSubmit={this.handleSubmit}>
                    <div id="name-form">
                        <label htmlFor="new-library-name">Name: </label>
                        <input
                            type="text"
                            id="new-library-name"
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.newLibrary.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="new-library-address">Address:</label>
                        <input
                            type="text"
                            id="new-library-address"
                            name="address"
                            onChange={this.handleInputChange}
                            value={this.state.newLibrary.address}
                        />
                    </div>
                    <div>
                        <label htmlFor="new-library-city">City:</label>
                        <input
                            type="text"
                            id="new-library-city"
                            name="city"
                            onChange={this.handleInputChange}
                            value={this.state.newLibrary.city}
                        />
                    </div>
                    <div id="zipcode-form">
                        <label htmlFor="new-library-zipCode">Zipcode:</label>
                        <input
                            type="text"
                            id="new-library-zipCode"
                            name="zipcode"
                            onChange={this.handleInputChange}
                            value={this.state.newLibrary.zipcode}
                        />
                    </div>
                    <div id="charter-form">
                        <label htmlFor="new-library-charter">Charter Number:</label>
                        <input
                            type="text"
                            id="new-library-charter"
                            name="charter"
                            onChange={this.handleInputChange}
                            value={this.state.newLibrary.charter}
                        />
                    </div>
                    <div id="description-form">
                        <label htmlFor="new-library-description">Description: </label>
                        <input
                            type="text"
                            id="new-library-description"
                            name="description"
                            onChange={this.handleInputChange}
                            value={this.state.newLibrary.description}
                        />
                    </div>
                    <div id="form-submit">
                        <input type="submit" value="Create Library" />
                    </div>
                </form>


                : <div>
                    <button onClick={this.handleToggleNewForm}>New Library</button>
                    <hr></hr>
                    {librariesList}
                </div>
        )
    }
}