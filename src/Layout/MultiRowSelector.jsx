import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';

export default class MultiRowSelector extends Component {
    constructor(props) {
        super(props);

        this.state = { rows: [] };
        this.handleAddNewRow = this.handleAddNewRow.bind(this);
        this.handleAddNewRow = this.handleAddNewRow.bind(this);
        this.handleLabelChange = this.handleLabelChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleAddNewRow() {
        let rows = this.state.rows;
        rows.push({ label: '', value: '' });
        this.setState({ rows: rows });
        this.handleRowsChanges(rows);
    }

    handleDeleteRow(event, index) {
        event.preventDefault();
        var row = this.state.rows[index];
        var rows = this.state.rows.filter((value) => value !== row);
        this.setState({ rows: rows });
        this.handleRowsChanges(rows);
    }

    handleLabelChange(event, index) {
        var rows = this.state.rows;
        rows[index].label = event.target.value;
        this.setState({ rows: rows });
        this.handleRowsChanges(rows);
    }

    handleValueChange(event, index) {
        var rows = this.state.rows;
        rows[index].value = event.target.value;
        this.setState({ rows: rows });
        this.handleRowsChanges(rows);
    }

    handleRowsChanges(rows){
        this.props.handleRowsChanges(rows);
    }

    render(){
        const props = this.props;
        return (
            <div>
            <FlatButton onClick={this.handleAddNewRow} fullWidth={true}>{props.buttonName}</FlatButton>
            {props.rows.map((row, index) => (
                <div key={index}>
                    <TextField placeholder={props.label} value={row.label} onChange={(event) => this.handleLabelChange(event, index)} />
                    <span> {props.separatorText} </span>
                    <TextField placeholder={props.value} type="number" value={row.value} onChange={(event) => this.handleValueChange(event, index)} />
                    <FlatButton onClick={(event) => this.handleDeleteRow(event, index)}>remove</FlatButton>
                    <hr />
                </div>))}
            </div>
        );
    }
}
