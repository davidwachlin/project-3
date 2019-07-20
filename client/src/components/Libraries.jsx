import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './libraries.css'

export default class Libraries extends Component {

    state = {
        libraries: [],
        isNewFormDisplayed: false,
        newCreature: {
            name: "",
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
        const newCreature = { ...this.state.newCreature }
        newCreature[event.target.name] = event.target.value

        this.setState({ newCreature: newCreature })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`api/libraries`, this.state.newCreature)
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
        let creaturesList = this.state.libraries.map((library) => {
            return (
                <div key={library._id} className="libraries">
                <Link
   
                    to={`/${library._id}`}
                >
                    {library.name}
                </Link>
                </div>
            )
        })
        return (
            this.state.isNewFormDisplayed
                ? <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-library-name">Create Name</label>
                    <input
                        type="text"
                        id="new-library-name"
                        name="name"
                        onChange={this.handleInputChange}
                        value={this.state.newCreature.name}
                    />
                    <label htmlFor="new-library-description">Create Description</label>
                    <input
                        type="text"
                        id="new-library-description"
                        name="description"
                        onChange={this.handleInputChange}
                        value={this.state.newCreature.description}
                    />
                    <input type="submit" value="Create Library" />
                </form>


                :<div>
                    <button onClick={this.handleToggleNewForm}>New Library</button>
                    <hr></hr>
                    {creaturesList}
                </div>
        )
    }
}