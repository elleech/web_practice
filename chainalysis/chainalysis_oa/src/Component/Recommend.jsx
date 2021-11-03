import React from 'react';

class Recommend extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            prices: []
        };
        this.getRecommend = this.getRecommend.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.prices !== state.prices) {
            return {
                prices: props.prices
            };
        }
    }

    getRecommend() {
        const prices = this.state.prices;
        if (prices.length > 0) {
            const minBidPrice = Math.min.apply(Math, prices.map((o) => o.bid));
            const minBid = prices.find((o) => o.bid === minBidPrice);

            const maxAskPrice = Math.max.apply(Math, prices.map((o) => o.ask));
            const maxAsk = prices.find((o) => o.ask === maxAskPrice);
            
            const recommend = [{
                transaction: 'bid',
                exchange: minBid.exchange,
                price: minBid.bid
            }, {
                transaction: 'ask',
                exchange: maxAsk.exchange,
                price: maxAsk.ask
            }];

            return recommend;
        }
    }

    render() {
        const recommend = this.getRecommend();
        
        if (recommend !== undefined) {
            return (
                <>
                    <p>
                        Recommend to bid/buy from: { recommend[0].exchange } at ${ recommend[0].price }
                        <br/>
                        Recommend to ask/sell from: { recommend[1].exchange } at ${ recommend[1].price }
                    </p>
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }
}

export default Recommend;