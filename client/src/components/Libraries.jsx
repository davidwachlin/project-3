import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class libraries extends Component {
    state = {
        libraries: []
    }

    componentDidMount() {
        this.getAllLibraries()
    }

    getAllLibraries = () => {
        axios.get('/api/libraries')
            .then((res) => {
                this.setState({ libraries: res.data })
            })
    }

    render() {
        let librariesList = this.state.creatures.map((library) => {
            return (
                <div className="libraries">
                    <Link
                        key={library._id}
                        to={`/${library._id}`}
                    >
                        {library._id}
                    </Link>
                </div>
            )
        })
        return (
            <div>
                {librariesList}
            </div>
        )
    }
}
