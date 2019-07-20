import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

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
                ? <form onSubmit={this.handleSubmit}>
                    <label htmlFor="library-name">Create Name</label>
                    <input 
                        type="text" 
                        id="library-name" 
                        name="name" 
                        onChange={this.handleInputChange}
                        value={this.state.library.name}
                    />
                    <label htmlFor="library-description">Create Name</label>
                    <input 
                        type="text" 
                        id="library-description" 
                        name="description" 
                        onChange={this.handleInputChange}
                        value={this.state.library.description}
                    />
                    <input type="submit" value="Update Library" />
                </form>
                : <div>
                    <button onClick={this.handleToggleEditForm}>Edit Library</button>
                    <button onClick={this.handleDeleteLibrary}>Delete Library</button>
                    <h2>{this.state.library.name}</h2>
                    <p>Description: {this.state.library.description}</p>
                    <p>{this.state.library.address}</p>
                    <p>{this.state.library.city}</p>
                    <p>{this.state.library.zipcode}</p>
                    <p>{this.state.library.charter}</p>
                </div>
                
                
            
        )
    }
}

