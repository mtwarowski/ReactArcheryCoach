import React from 'react';

const CardForm = (props) => {
    let { handleSubmitPressed, submitIcon, title } = props;

    return (
        <form onSubmit={this.handleSubmit}>
            <Card>
                <CardTitle title={title || ""} />
                <CardText>
                    {children}
                </CardText>
                <CardActions>
                    <FlatButton type="submit" value="Submit" label="Submit" />
                </CardActions>
            </Card>
        </form>
    );
};

export default LeftDrawer;