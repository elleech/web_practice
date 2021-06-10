import Moment from 'moment';
import React from 'react';
import { Image, Table } from 'react-bootstrap';
import CancelBuyBtn from './CancelBuyBtn';

function OrderTable({ orders }) {
    const renderOrderTable = () => {
        return (
            <Table hover>
                <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Purchase Time</th>
                        <th>Cancel?</th>
                        <th>Shipment</th>
                    </tr>
                </thead>
                <tbody>
                    { orders.detail.map((order, index) => {
                        return (
                            <tr key={ index }>
                                <td><Image src={ order.imageUrl } width='100' /></td>
                                <td>{ order.title }</td>
                                <td>${ order.price }</td>
                                <td>{ Moment(order.transaction).format('YYYY-MM-DD') }</td>
                                <td><CancelBuyBtn order={order} /></td>
                                <td>{ order.cancellation === true ? 'N/A' : order.completion === null ? 'In process' : Moment(order.completion).format('YYYY-MM-DD') }</td>
                            </tr>
                        );
                    }) }
                </tbody>
            </Table>
        );
    };

    return renderOrderTable();
};

export default OrderTable;
