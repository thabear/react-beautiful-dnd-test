import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { doDnD } from './actions/dndActions';

//move store and provider to index

const grid = 8;

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
}

class App extends Component {
    //constructor(props) {
    //    super(props);
    //
    //    this.state = {
    //        row1: createList(5),
    //        row2: createList(3, 5)
    //    }
    //}

    getList = id => this.props[id];

    onDragEnd = result => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const result = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            //let state = {row1: result};

            if (source.droppableId === 'row2') {
                //state = {row2: result};
                this.props.doDnD(this.props.row1, result);
            }
            else {
                this.props.doDnD(result, this.props.row2);
            }

            //this.setState(state);
        }
        else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            //this.setState({
            //    row1: result.row1,
            //    row2: result.row2
            //});

            this.props.doDnD(result.row1, result.row2);
        }
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">React-Beautiul-DnD Demo</h1>
                </header>
                <div id='dndContainer'>
                    <DragDropContext
                        onDragEnd={this.onDragEnd}
                    >

                        <div id='drop1'>
                            <Droppable droppableId='row1' type='thing'>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                    >
                                        <h3>MyBills</h3>
                                        {this.props.row1.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                    >
                                                        Bill {item.content}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <div id='drop2'>
                            <Droppable droppableId='row2' type='thing'>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                    >
                                        <h3>Hidden Bills</h3>
                                        {this.props.row2.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                    >
                                                        Bill {item.content}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </DragDropContext>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    doDnD: PropTypes.func.isRequired,
    row1: PropTypes.array.isRequired,
    row2: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    row1: state.stuff.row1,
    row2: state.stuff.row2
});

export default connect(mapStateToProps, { doDnD })(App);
