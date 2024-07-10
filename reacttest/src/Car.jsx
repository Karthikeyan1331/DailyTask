import React, { Component } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import CounterComp from './Counter';
class Car extends Component {
    state = {
        tags: ["First", "Second", "Third", "Available"],
        counters: [{ id: 0, val: 0 }, { id: 1, val: 0 }, { id: 2, val: 0 }, { id: 3, val: 0 }]
    }
    componentDidUpdate() {
        console.log("hello")
    }
    componentWillUnmount(){
        console.log("Component unmount")
    }
    conditionRender() {
        return (this.state.tags.length === 0) ? <p>There is no item in the list</p> : <ListGroup >
            {this.state.tags.map((key, index) => <li key={index}>{key}</li>)}
        </ListGroup>
    }
    handleOnClickDelete = (id) => {
        console.log("User Clicked the delete", id);
        this.setState((prevState) => ({
            counters: prevState.counters.filter((counter) => counter.id !== id)
        }));
    }
    handleOnClickReset = (id) => {
        console.log("Reset button")
        this.setState((prevState) => ({
            counters: prevState.counters.map((key) => ({
                ...key, val: 0
            }))
        }))
    }
    handleOnIncrement=(count)=>{
        const counters =[...this.state.counters]
        const updateCounter = counters.map((cnt)=>{
            if(cnt.id===count.id){
                cnt.val++
            }
            return cnt
        })
        this.setState({updateCounter})
    }
    render() {
        return (
            <div>
                <h2>Hi, I am a Car!</h2><br />
                <button className='btn btn-dark mb-3' onClick={() => this.handleOnClickReset()}>Reset</button>
                {this.state.counters.map((key, index) => <CounterComp key={key.id} id={key.id} value={key.val} counters={key} onIncrement={this.handleOnIncrement} onDelete={this.handleOnClickDelete}></CounterComp>)}
                {this.conditionRender()}
            </div>
        );
    }
}

export default Car;