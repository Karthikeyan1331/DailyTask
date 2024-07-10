import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
class CounterComp extends Component {
    state = {
        motor: 0,
    }
    displayFormat() {
        let { val: count } = this.props.counters
        console.log(count, "first")
        return <h1>{(count === 0) ? "Zero" : count}</h1>
    }
    componentDidUpdate() {
        console.log("hello")
    }
    componentDidMount() {
        this.setState(() => ({
            motor: this.props?.value
        }))
    }
    componentWillUnmount(){
        console.log("Component unmount")
    }

    render() {
        console.log(this.props, "here")
        let class1 = this.props.counters.val === 0 ? "info" : "primary"
        let class2 = this.props.counters.val === 0 ? "warning" : "secondary"
        return (<div>
            <Badge bg={class1}>{this.displayFormat()}</Badge>
            <Button variant={class2} onClick={() => this.props.onIncrement(this.props.counters)} >Increase Count</Button>
            <Button variant='danger' onClick={() => this.props.onDelete(this.props.counters.id)}>Delete</Button><br /><br /></div>
        );
    }
}

export default CounterComp;