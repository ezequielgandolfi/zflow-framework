import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class NodeProperties extends Component {

    state = { modalShow: false, properties: [], data: {} };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.show !== prevState.modalShow) {
            this.setState({ modalShow: this.props.show, properties: this.props.properties, data: this.props.data });
        }
    }

    renderProperty(property,index) {
        return (
            <div className="row" key={index}>
                <div className="input-group mb-3 col-sm">
                    <span className="input-group-text" id={`prop-edit-${property.key}`}>{property.description}</span>
                    <input type="text" className="form-control" value={this.state.data[property.key]} onChange={(event) => console.log(event.target.value)}  />
                </div>
            </div>
        );
    }

    handleClose(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ modalShow: false, properties: [], data: {} });
    }

    handleSave(event) {
        if (this.props.onSave instanceof Function) {
            const data = { };
            this.state.properties.forEach(property => {
                data[property.key] = document.getElementById(`prop-edit-${property.key}`).value;
            });
            this.props.onSave(data);
        }
        this.handleClose(event);
    }

    render() { 
        return ( 
            <section>
                <Modal show={this.state.modalShow} onHide={this.handleClose.bind(this)}>
                    <Modal.Header>
                        <Modal.Title>Properties</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.properties.map((item, index) => this.renderProperty(item, index))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose.bind(this)}>Cancel</Button>
                        <Button variant="primary" onClick={this.handleSave.bind(this)}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </section>
        );
    }
}
 
export default NodeProperties;