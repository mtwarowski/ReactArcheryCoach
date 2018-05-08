import React, { Component } from 'react';
import axios from 'axios';
import HttpHelpers from '../Auth/HttpHelpers';
import Config from '../Config'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { RaisedButton } from 'material-ui';

export default class AddIntensityPlanForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            weeklyIntensities: []            
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewWeeklyIntensity = this.addNewWeeklyIntensity.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

    }

    addNewWeeklyIntensity(){
        this.state.weeklyIntensities.push({
        });
        this.setState({weeklyIntensities: this.state.weeklyIntensities});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Card>
                    <CardText>
                        <RaisedButton onClick={this.addNewWeeklyIntensity}>Add week</RaisedButton>
                    </CardText>
                    <CardText>
                    <Table selectable={false}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Mo</TableHeaderColumn>
                                <TableHeaderColumn>Tu</TableHeaderColumn>
                                <TableHeaderColumn>We</TableHeaderColumn>
                                <TableHeaderColumn>Th</TableHeaderColumn>
                                <TableHeaderColumn>Fi</TableHeaderColumn>
                                <TableHeaderColumn>Sa</TableHeaderColumn>
                                <TableHeaderColumn>Su</TableHeaderColumn>
                                <TableHeaderColumn>Microcycle</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.state.weeklyIntensities.map((weeklyIntensity, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn><TextField value={weeklyIntensity.monday} /></TableRowColumn>
                                    <TableRowColumn><TextField value={weeklyIntensity.tuesday} /></TableRowColumn>
                                    <TableRowColumn><TextField value={weeklyIntensity.wednesday} /></TableRowColumn>
                                    <TableRowColumn><TextField value={weeklyIntensity.thursday} /></TableRowColumn>
                                    <TableRowColumn><TextField value={weeklyIntensity.friday} /></TableRowColumn>
                                    <TableRowColumn><TextField value={weeklyIntensity.saturday} /></TableRowColumn>
                                    <TableRowColumn><TextField value={weeklyIntensity.sunday} onChange={(event) => this.setState({ name: event.target.value })}/></TableRowColumn>
                                    <TableRowColumn><TextField value={weeklyIntensity.microcycle} onChange={(event) => this.setState({ name: event.target.value })}/></TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </CardText>
                </Card>
            </form>
        );
    }
}