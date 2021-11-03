import React from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Recommend from "./Recommend";

class Price extends React.Component {
    constructor() {
        super();

        this.state = {
            success: false,
            description: '',
            bitcoin: [],
            ethereum: []
        };
    }

    async componentDidMount() {
        try {
            await axios.get('http://localhost:8000/api/').then((res) => {
                // console.log(res.data);
                const { success, detail } = res.data;
                this.setState({ success: success });

                if (success) {
                    const { btc, eth } = detail;

                    this.setState({ 
                        description: 'successfully retrieved data',
                        bitcoin: btc,
                        ethereum: eth
                    });
                    // console.log(this.state.bitcoin);
                    // console.log(this.state.ethereum);

                } else {
                    this.setState({ description: detail });
                }

            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { cryptocurrency } = this.props;
        const { success, description, bitcoin, ethereum } = this.state;
        
        if (success) {
            return (
                <>
                    <Table responsive hover size="sm" variant="dark">
                        <thead>
                            <tr>
                                <th>Exchange</th>
                                <th>Bid/Buy</th>
                                <th>Ask/Sell</th>
                            </tr>
                        </thead>
                        <tbody>
                            { cryptocurrency === 'bitcoin' ? bitcoin.map(({ exchange, ask, bid }) => {
                                return (
                                    <tr key={ exchange }>
                                        <td>{ exchange }</td>
                                        <td>$ { bid }</td>
                                        <td>$ { ask }</td>
                                    </tr>
                                )
                            }) : ethereum.map(({ exchange, ask, bid }) => {
                                return (
                                    <tr key={ exchange }>
                                        <td>{ exchange }</td>
                                        <td>$ { bid }</td>
                                        <td>$ { ask }</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    { cryptocurrency === 'bitcoin' ? <Recommend prices={ bitcoin } /> : <Recommend prices={ ethereum } /> }
                </>
            )
        } else {
            return (<p>{ description }</p>)
        }
    }
}

export default Price;