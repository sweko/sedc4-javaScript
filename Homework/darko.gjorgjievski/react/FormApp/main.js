var EditableRow = React.createClass({
    saveChanges: function(e, name, email, phone, index) {
          this.props.onUpdate(this._name.value, this._email.value, this._phone.value, this.props.id);
    },

    render: function() {
        return (
            <tr>
                <td><input type="text" ref={function(e) {this._name = e}.bind(this)} defaultValue={this.props.name} /></td>
                <td><input type="text" ref={function(e) {this._email = e}.bind(this)} defaultValue={this.props.email} /></td>
                <td><input type="text" ref={function(e) {this._phone = e}.bind(this)} defaultValue={this.props.phone} /></td>
                <td>
                    <button onClick={this.saveChanges}>Save</button>
                </td>
            </tr>
        );
    }
});

var DisplayableTableRow = React.createClass({
    editRow: function (index) {
        this.props.onEdit(index);
    },

    deleteRow: function (index) {
        this.props.onDelete(index);
    },

    showRow: function (index) {
        this.props.onShow(index)
    },

    render: function() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.email}</td>
                <td>{this.props.phone}</td>
                <td>
                    <button onClick={this.showRow.bind(this, this.props.id)}>Read</button>
                    <button onClick={this.editRow.bind(this, this.props.id)}>Update</button>
                    <button onClick={this.deleteRow.bind(this, this.props.id)}>Delete</button>
                </td>
            </tr>
        );
    }
});

var Table = React.createClass({
    render: function() {
        var peopleRowsWithoutNull = this.props.peopleDetailsToRender.filter(function(n) { return n!== null });

        var peopleRows = peopleRowsWithoutNull.map(function(details) {
            if (details.editable) {
                return <EditableRow key={details.id} name={details.name} email={details.email} phone={details.phone} onUpdate={this.props.onUpdate} id={details.id}/>;
            } else {
                return <DisplayableTableRow key={details.id} name={details.name} email={details.email} phone={details.phone} id={details.id} onEdit={this.props.onEdit} onDelete={this.props.onDelete} onShow={this.props.onShow} />;
            }
        }, this);

        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {peopleRows}
                </tbody>
            </table>
        );
    }
});

var Form = React.createClass({
    addNewPersonDetails: function (e) {
        e.preventDefault();
        this.props.onclick(this._name.value, this._email.value, this._phone.value);
    },

    render: function() {
        return (
            <form onSubmit={this.addNewPersonDetails}>
                <label>Name </label><input type="text" ref={function(e) {this._name = e}.bind(this)}/><br />
                <label>Email </label><input type="text" ref={function(e) {this._email = e}.bind(this)}/><br />
                <label>Phone </label><input type="text" ref={function(e) {this._phone = e}.bind(this)}/><br />
                <input type="submit" value="Add to table"/>
            </form>
        );
    }
});

var ShowPeopleDetails = React.createClass({
    render: function() {
        if (this.props.shownDetails === null) {
            return false;
        } else {
            var details = this.props.shownDetails;
            return (
                <div>
                    <p>Name: {details.name}</p>
                    <p>Email: {details.email}</p>
                    <p>Phone: {details.phone}</p>
                </div>
            );
        }

    }
});

var PeopleDetails = React.createClass({
    getInitialState: function () {
        return {
            peopleDetails: [],
            howManyPeople: 0,
            shownDetails: null
        }
    },

    addNewPersonDetails: function (nameInput, emailInput, phoneInput) {
        this.setState({
            peopleDetails: this.state.peopleDetails.concat({
              id: this.state.howManyPeople, name: nameInput, email: emailInput, phone: phoneInput, editable: false
            }),
            howManyPeople: this.state.howManyPeople + 1,
        });
    },

    toggleEditablePersonDetails: function (index) {
        var details = this.state.peopleDetails[index];
        details.editable = !details.editable;
        this.setState({peopleDetails: this.state.peopleDetails.slice(0, index).concat(details).concat(this.state.peopleDetails.slice(index+1))});
    },

    updatePersonDetails: function (name, email, phone, index) {
        var newDetails = {name: name, email: email, phone: phone, id:index};
        this.setState({peopleDetails: this.state.peopleDetails.slice(0, index).concat(newDetails).concat(this.state.peopleDetails.slice(index+1))});
    },

    showPersonDetails: function (index) {
        this.setState({shownDetails: this.state.peopleDetails[index]});
    },

    deletePersonDetails: function (index) {
        this.setState({peopleDetails: this.state.peopleDetails.slice(0, index).concat(null).concat(this.state.peopleDetails.slice(index+1))});
    },

    render: function() {
        return (
            <div>
                <Form onclick={this.addNewPersonDetails} />
                <Table peopleDetailsToRender={this.state.peopleDetails} onEdit={this.toggleEditablePersonDetails} onDelete={this.deletePersonDetails} onShow={this.showPersonDetails} onUpdate={this.updatePersonDetails} />
                <ShowPeopleDetails shownDetails={this.state.shownDetails}/>
            </div>
        );
    }
});

ReactDOM.render(<PeopleDetails />, document.getElementById('container'));