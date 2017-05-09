import React, { Component } from 'react'
import { connect } from 'react-redux'
import { OrdersList } from 'components'
import Immutable from 'immutable'
import api from 'services/api'
import {Well, Row,Col,Table} from 'react-bootstrap';

class OrdersContainer extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            msg : Immutable.List(),
            showChildren : [],
        }
    }

    componentDidMount () {
        var orders = api.get('/Orders')
        .then((result)=>{
            var list = Immutable.fromJS(result);
            list = list.sort((a,b)=>a.get('tidpunkt')>b.get('tidpunkt')?-1:(a.get('tidpunkt')<b.get('tidpunkt')?1:0))
            this.setState({msg: list})
        })
        .catch((error)=>{
            console.log(error)
        })

    }

    render () {
        return !this.state.msg.size?<div></div>:<Table responsive>
            <thead>
            <tr>
                <th>Tid</th>
                <th>Ordernummer</th>
                <th>Kund</th>
            </tr>
            </thead>
            <tbody>
                {this.state.msg.map((e,i)=>{
                    
                    return [<tr key={'first'} onClick={()=>{
                        var temp = this.state.showChildren
                        temp[i] = !temp[i]
                        this.setState({showChildren:temp})
                    }}>            
                        <td>{formatDate(new Date(e.get('tidpunkt')), '%Y-%M-%d %H:%m:%s')}</td>
                        <td>{e.get('ordernummer')}</td>
                        <td>{e.get('kund')}</td>
                    </tr>,         
                    <tr key={'second'}>
                                   
                        <td colSpan={3} className="children">
                            {this.state.showChildren[i]? 
                            [<Row key={'first'}>                                        
                                            <Col xs={3}><b>Artikel</b></Col>
                                            <Col xs={3}><b>Antal</b></Col>
                                            <Col xs={3}><b>Styckpris</b></Col>                                            
                                            <Col xs={3}><b>Radtotalpris</b></Col>
                            </Row>,
                            e.get('rows').map((el,j)=>{
                            return <Row key={j} className="child">
                                        <Col xs={3}>{el.get('artikel')}</Col>
                                        <Col xs={3}>{el.get('antal')}</Col>
                                        <Col xs={3}>{Math.round(el.get('styckpris')*10000)/10000}</Col>
                                        <Col xs={3}>{
                                            Math.round(el.get('antal')*el.get('styckpris') *10000)/10000                                                
                                            }</Col>
                                </Row>
                                })
                            ,
                            <Row>     
                                <Col xs={9}></Col>                                            
                                <Col xs={3}><b>Order Total: { Math.round(100*e.get('rows').reduce((r,el)=>r+(el.get('antal')*el.get('styckpris')),0))/100}</b></Col>
                            </Row> 
                            ]:''}
                        </td>
                    </tr>,
                    ]  
                })}
                {
                    <tr>                                    
                        <td>
                            <h3>
                                Total:  
                                {Math.round(100* this.state.msg.reduce(
                                            (r,order)=>r+order.get('rows').reduce(
                                                    (rr,row)=>rr+(row.get('antal')*row.get('styckpris'))
                                                    ,0
                                                )
                                            ,0
                                        )
                                    )/100
                                }
                            </h3>                            
                        </td>
                    </tr>
                }      
            </tbody>
        </Table>

    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch, { limit }) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer)


//https://stackoverflow.com/questions/2315408/how-do-i-format-a-timestamp-in-javascript-to-display-it-in-graphs-utc-is-fine#2315590
function formatDate(date, fmt) {
    function pad(value) {
        return (value.toString().length < 2) ? '0' + value : value;
    }
    return fmt.replace(/%([a-zA-Z])/g, function (_, fmtCode) {
        switch (fmtCode) {
        case 'Y':
            return date.getUTCFullYear();
        case 'M':
            return pad(date.getUTCMonth() + 1);
        case 'd':
            return pad(date.getUTCDate());
        case 'H':
            return pad(date.getUTCHours());
        case 'm':
            return pad(date.getUTCMinutes());
        case 's':
            return pad(date.getUTCSeconds());
        default:
            throw new Error('Unsupported format code: ' + fmtCode);
        }
    });
}