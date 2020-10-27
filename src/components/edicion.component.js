import Axios from 'axios';
import React, { Component } from 'react';
// import Client7 from 'es7';
// import elasticsearch from 'es7';

import elasticsearch from "elasticsearch";

let client = new elasticsearch.Client({
    host: "localhost:9200"
    // ,
    // log: "trace"
});

class ViewComponent extends Component {
    list = [
        {
            title: "Test1",
            description: "Descripion t1"
        }, {
            title: "Tes1",
            description: "Descripion t2"
        }
    ];
    value = "as";
    constructor() {
        super();
        this.state = {
            items: this.list
        }
    }

    change(event) {
        const headers = { 'Content-Type': 'application/json' };
        // this.setState({ txtAreaValue: event.target.value });
        client
            .search({
                index: "datos2",
                body: {
                    query: {
                        bool: {
                            should: [
                                {
                                    term: {
                                        title: event.target.value
                                    }
                                },
                                {
                                    term: {
                                        description: event.target.value
                                    }
                                }
                            ]
                        }
                    }
                }
            })
            .then(
                result => {
                    if (result && result.hits && result.hits.hits)
                        // result.hits.hits.map(hit => hit._source)
                        this.setState({ items: result.hits.hits.map(hit => hit._source) });
                    console.log(result.hits.hits.map(hit => hit._source))
                }
                ,
                error =>
                    console.trace(error)

            );

        // this.setState({items: });
    }

    render() {
        return (
            <div>
                <textarea onChange={(e) => this.change(e)} ></textarea>
                <ul>
                    {
                        this.state.items.map((item, index) => (
                            <li key={index}>
                                <label>{item.title}</label>
                                <p>{item.description}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>);
    }
}

export default ViewComponent;