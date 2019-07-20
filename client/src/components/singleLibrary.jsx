import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import Books from "./Books"



export default class SingleLibrary extends Component {
    
    state = {
        library: {},
        isEditFormDisplayed: false,
        redirectToHome: false
    }

    componentDidMount() {
        axios.get(`api/libraries/${this.props.match.params.libraryId}`)
            .then((res) => {
                this.setState({library: res.data})
            })
    }

    handleInputChange = (event) => {
        const copiedLibrary = {...this.state.library}
        copiedLibrary[event.target.name] = event.target.value

        this.setState({library: copiedLibrary})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.put(`api/libraries/${this.state.library._id}`, this.state.library)
            .then((res) => {
                this.setState({
                    library: res.data,
                    isEditFormDisplayed: false
                })
            })
    }

    handleToggleEditForm = ()  => {
        this.setState((state) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }

    handleDeleteLibrary = () => {
        axios.delete(`api/libraries/${this.state.library._id}`)
            .then(() => {
                this.setState({redirectToHome: true})
            })
    }

    render() {
        if (this.state.redirectToHome) {  
            return <Redirect to="/" />
        }
        return (
            
                this.state.isEditFormDisplayed
                ? 

                <form onSubmit={this.handleSubmit}>
                <div id="name-form">
                    <label htmlFor="library-name">Name: </label>
                    <input
                        type="text"
                        id="library-name"
                        name="name"
                        onChange={this.handleInputChange}
                        value={this.state.library.name}
                    />
                </div>
                <div>
                    <label htmlFor="library-address">Address:</label>
                    <input
                        type="text"
                        id="library-address"
                        name="address"
                        onChange={this.handleInputChange}
                        value={this.state.library.address}
                    />
                </div>
                <div>
                    <label htmlFor="library-city">City:</label>
                    <input
                        type="text"
                        id="library-city"
                        name="city"
                        onChange={this.handleInputChange}
                        value={this.state.library.city}
                    />
                </div>
                <div id="zipcode-form">
                    <label htmlFor="library-zipCode">Zipcode:</label>
                    <input
                        type="text"
                        id="library-zipCode"
                        name="zipcode"
                        onChange={this.handleInputChange}
                        value={this.state.library.zipcode}
                    />
                </div>
                <div id="charter-form">
                    <label htmlFor="library-charter">Charter Number:</label>
                    <input
                        type="text"
                        id="library-charter"
                        name="charter"
                        onChange={this.handleInputChange}
                        value={this.state.library.charter}
                    />
                </div>
                <div id="description-form">
                    <label htmlFor="library-description">Description:</label>
                    <input
                        type="text"
                        id="library-description"
                        name="description"
                        onChange={this.handleInputChange}
                        value={this.state.library.description}
                    />
                </div>
                <div id="form-submit">
                    <input type="submit" value="Save Changes" />
                </div>

                <button onClick={this.handleDeleteLibrary}>Delete Library</button>
            </form>
                : <div>
                    <button onClick={this.handleToggleEditForm}>Edit Library</button>

                    <h2>{this.state.library.name}</h2>
                    <p><strong>Description:</strong> {this.state.library.description}</p>
                    <p><strong>Address: </strong>{this.state.library.address}</p>
                    <p><strong>City: </strong>{this.state.library.city}</p>
                    <p><strong>Zipcode: </strong>{this.state.library.zipcode}</p>
                    <p><strong>Charter: </strong>{this.state.library.charter}</p>
                    <div>
                    <Link
                        to={`/${this.state.library._id}/books`}
                    >
                        Books
                    </Link>
                        
                    </div>

                </div>
                
                
            
        )
    }
}

