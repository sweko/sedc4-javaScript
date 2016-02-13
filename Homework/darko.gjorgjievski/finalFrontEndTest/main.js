Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

var helper = {};
(function(h) {
    h.getMaxRecipeIngredients =function (ingredients, maxNumber) {
        var firstX = ingredients.slice(0, maxNumber).reduce(function (total, obj) {
            var name = obj.name;
            var quantity = obj.quantity;
            return total + name + ',' + quantity + ','
        }, '').slice(0, -1);

        if (ingredients.length > maxNumber) {
            return firstX + '...';
        } else {
            return firstX;
        }
    }

    h.getMaxWordsTillCharLimit = function (str, charLimit) {
        var allWords = str.split(" ");
        var result = allWords[0]; // I'm assuming the char limit is big enough so the first word fits
        var tempResult = '';

        for (var i = 1; i < allWords.length; i++) {
            tempResult = result + ' ' + allWords[i];
            if (tempResult.length > charLimit) {
                return result + '...';
            } else if (tempResult.length < charLimit) {
                result = tempResult;
                tempResult = '';
            } else {
                if (i === allWords.length - 1) {
                    return tempResult;
                } else {
                    return tempResult + '...';
                }
            }
        }
        return result;
    }

    h.getIndexById = function(id) {
        return recipes.map(
            function(x) {
                return x.id;
            })
            .indexOf(id);
    }

    h.getPreparationTimeInHours = function (inputMinutes) {
        var hours = Math.floor(inputMinutes / 60);
        var minutes = inputMinutes % 60;

        if (minutes === 0) {
            return hours + ' час(а)';
        } else {
            return hours + ' час(а) ' + minutes + ' минути';
        }
    }

})(helper);

var ingredients = ['Брашно', 'Млеко', 'Масло', 'Сол', 'Шеќер', 'Јајца', 'Патлиџани', 'Пиперки', 'Сирење', 'Кашкавал', 'Компир', 'Месо'];

var recipes = [];

var IngredientsInput = React.createClass({
    getInitialState: function() {
        return { selectId: Math.random() } // a hack to reset the select after you've added the ingredient
    },

    renderIngredientOptions: function() {
        var availableIngredients = ingredients.diff(this.props.currentIngredients.map(function(i) { return i.name; }));
        return (
            availableIngredients.map(function (ing, index) {
                return <option value={ing} key={index}>{ing}</option>
            })
        )
    },

    handleAddIngredient: function() {
        this.props.onAddIngredientButtonClick();
    },

    handleAddIngredientButtonClick: function() {
        this.props.onAddIngredientButtonClick();
        this.setState({selectId: Math.random()});

    },

    render: function () {
        return (
            <div key={this.state.selectId}>
                <label>Состојка: </label>
                <select onChange={this.props.onIngredientNameChange} >
                    <option selected disabled>Одбери состојка</option>
                    {this.renderIngredientOptions()}
                </select>
                <label>Квантитет: </label><input type="number" onChange={this.props.onIngredientQuantityChange} /><br />
                <button type="button" onClick={this.handleAddIngredientButtonClick}>Додади</button>
            </div>
        )
    }
});



var InputForm = React.createClass({
    getInitialState: function () {
        return ({
            name: '', source: '', ingredients: [], preparationTime: undefined, instructions: '',
            currentlySelectedIngredientName: '', currentSelectedIngredientQuantity: 0, counter: this.determineFromWhereToCount()
        });
    },


    componentWillReceiveProps: function () {
        this.setState({counter: this.determineFromWhereToCount()});
    },

    determineFromWhereToCount: function() {
        if (recipes.length === 0) {
            return 0;
        } else {
            return Math.max.apply(null, recipes.map(function(n) { return n.id })) + 1;
        }
    },

    // text forms handlers

    handleNameChange: function(e) {
        this.setState({name: e.target.value});
    },

    handleSourceChange: function(e) {
        this.setState({source: e.target.value});
    },

    handlePreparationMinsChange: function(e) {
        this.setState({preparationTime: parseInt(e.target.value)});
    },

    handleInstructionsChange: function(e) {
        this.setState({instructions: e.target.value});
    },

    // ingredient handlers
    handleIngredientNameChange: function(e) {
        this.setState({currentlySelectedIngredientName: e.target.value});
    },

    handleIngredientQuantityChange: function(e) {
        this.setState({currentSelectedIngredientQuantity: Number(e.target.value)});
    },

    isIngredientValueValid: function() {
        var errors = [];
        var quantity = this.state.currentSelectedIngredientQuantity;
        if (quantity === 0) return 'Нема поента да додаваш 0 од некоја состојка. Логика!'
        switch (this.state.currentlySelectedIngredientName) {
            case 'Јајца':
                if (parseInt(quantity) !== quantity) return 'Јајца мора да е целобројна вредност';
                break;
            case 'Сол': // if any of the below are true
                if (isNaN(quantity) || quantity > 10 || quantity < 0) return 'Сол мора да е број меѓу 1 и 10'
                break;
        }
        return true;
    },

    handleAddIngredientButtonClick: function(e) {
        var valid = this.isIngredientValueValid();

        if (valid === true) {
            this.setState({
                ingredients: this.state.ingredients.concat({
                    name: this.state.currentlySelectedIngredientName,
                    quantity: this.state.currentSelectedIngredientQuantity
                }),
                currentlySelectedIngredientName: '',
                currentSelectedIngredientQuantity: 0
            });
        } else {
            alert(valid); // ima i bolje nacini, ali raboti zasega ok...
        }

    },


    //form handler
    checkNameAtLeast1IngredientAndInstructions: function () {
        if (this.state.name === '' || this.state.instructions === '' || this.state.ingredients.length === 0) {
            return false;
        } else {
            return true;
        }
    },

    resetForm: function () {
        ReactDOM.findDOMNode(this.refs.submitForm).reset();
        this.replaceState(this.getInitialState());
    },

    handleFormSubmit: function(e) {
        e.preventDefault();
        var s = this.state;

        // todo: enable validation, disabled for debugging
        if (this.checkNameAtLeast1IngredientAndInstructions() === true) {
            recipes.push({
                id: this.state.counter, name: s.name, source: s.source, ingredients: s.ingredients, preparationTime: s.preparationTime, instructions: s.instructions
            });
            updateDOM();
            this.setState({counter: this.state.counter + 1});
            this.resetForm();
            this.props.onAdd();
        } else {
            alert('Your recipe should have a name, at least 1 ingredient and instructions');
        }

        //recipes.push({
        //    id: this.state.counter, name: s.name, source: s.source, ingredients: s.ingredients, preparationMins: s.preparationTime, instructions: s.instructions
        //});
        //updateDOM();
        //this.setState({counter: this.state.counter + 1});
        //this.resetForm();
        //this.props.onAdd();

    },

    handleIngredientRemoval: function (e) {
        var name = e.target.id;
        this.setState({ingredients: this.state.ingredients.filter(function(obj) { return obj.name !== name })}); // remove it after added
    },

    renderAddedIngredients: function() {
        return this.state.ingredients.map(function (i, index) {
            return (
                <ul  key={index}>
                    <li>{i.name} {i.quantity} <button id={i.name} type="button" onClick={this.handleIngredientRemoval}>Отстрани состојка</button></li>
                </ul>
            )
        }, this)
    },

    render: function () {
        if (this.props.shouldDisplay === false) {
            return false;
        } else {
            return (
                <ReactBootstrap.Modal show={this.props.shouldDisplay}>
                    <form ref="submitForm">
                        <h2>Додади Рецепт</h2>
                        <label>Име: </label><input type="text" onChange={this.handleNameChange} /><br />
                        <label>Од кај го зема: </label><input type="text" onChange={this.handleSourceChange}/><br />
                        <h3>Состојки: </h3>
                        <IngredientsInput ingredients={this.state.ingredients}
                                          onIngredientNameChange=    {this.handleIngredientNameChange}
                                          onIngredientQuantityChange={this.handleIngredientQuantityChange}
                                          onAddIngredientButtonClick={this.handleAddIngredientButtonClick}
                                          currentIngredients={this.state.ingredients}
                        /><br />
                        {this.renderAddedIngredients()}
                        <label>Минути за подготовка: </label><input type="text" onChange={this.handlePreparationMinsChange}/><br />
                        <label>Инструкции: </label><textarea onChange={this.handleInstructionsChange}></textarea><br /><br />
                        <button type="submit" onClick={this.handleFormSubmit}>Додади рецепт</button>
                    </form>
                </ReactBootstrap.Modal>

            )
        }

    }
});

var RecipesTable = React.createClass({
    getInitialState: function () {
        return {shouldShowConfirm: false, currentElementId: null };
    },

    renderRecipeRows: function() {
        var recipesWithoutNull = recipes.filter(function (r) {
            return r !== null
        });

        return recipesWithoutNull.map(function (e, index) {
            return (
                <tr key={index}>
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.source}</td>
                    <td>{e.ingredients.length}</td>
                    <td>{helper.getMaxRecipeIngredients(e.ingredients, 3)}</td>
                    <td>{helper.getMaxWordsTillCharLimit(e.instructions, 50)}</td>
                    <td>{helper.getPreparationTimeInHours(e.preparationTime)}</td>
                    <td>
                        <button type="button" id={e.id} onClick={this.props.onRead}>Прикажи рецепт</button>
                    </td>
                    <td>
                        <button id={e.id} type="button" onClick={this.showConfirmDialog}>Избриши рецепт</button>
                    </td>
                </tr>
            )
        }, this);
    },

    showConfirmDialog: function (e) {
        this.setState({shouldShowConfirm: true, currentElementId: e.target.id});
    },

    hideConfirmDialog: function () {
        this.setState({shouldShowConfirm: false});
    },

    handleItemDelete: function (index) {
        this.setState({shouldShowConfirm: false});
        this.props.onDelete(this.state.currentElementId);

    },


    render: function () {

        return (
            <div>
                <ConfirmDeleteDialog shouldDisplay={this.state.shouldShowConfirm} onClose={this.hideConfirmDialog} onDelete={this.handleItemDelete} />
                <ReactBootstrap.Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <td>Реден број</td>
                        <td>Име</td>
                        <td>Извор</td>
                        <td>Број на состојки</td>
                        <td>Први три состојки</td>
                        <td>Начин на подготовка</td>
                        <td>Време за подготовка</td>
                        <td>Прикажи</td>
                        <td>Избриши</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderRecipeRows()}
                    </tbody>
                </ReactBootstrap.Table>
            </div>
        )
    }
});

var ConfirmDeleteDialog = React.createClass({
    render: function() {
        if (this.props.shouldDisplay === false) {
            return false;
        } else {
            return (
                <ReactBootstrap.Modal show={this.props.shouldDisplay}>
                    <p>Are you sure?</p>
                    <button onClick={this.props.onClose}>No</button>
                    <button onClick={this.props.onDelete}>Yes</button>
                </ReactBootstrap.Modal>
            );
        }

    }
});

var SingleRecipeDisplay = React.createClass({
    getInitialState: function () {
        return { confirmDialogDisplay: false }
    },

    renderIngredientsList: function (i) {
        return (
            i.map(function(ing, index) {
                return (
                    <ul key={index}>
                        <li>{ing.quantity} {ing.name}</li>
                    </ul>
                )
            })
        )
    },

    handleDelete: function () {
        this.props.onDelete(this.props.currentRecipe.id);
        this.hideConfirmDialog();

    },

    hideConfirmDialog: function () {
        this.setState({confirmDialogDisplay: false});
    },

    showConfirmDialog: function () {
        this.setState({confirmDialogDisplay: true});
    },

    render: function() {
        if (this.props.shouldDisplay === false) {
            return false; // don't display anything
        } else {
            var r = this.props.currentRecipe;
            return (
                <ReactBootstrap.Modal show={this.props.shouldDisplay}>
                    <p>Име на рецепт: {r.name}</p>
                    <p>Превземен од: {r.source}</p>
                    <p>Состојки:</p>
                    {this.renderIngredientsList(r.ingredients)}
                    <p>Начин на подготовка:</p>
                    <p>{r.instructions}</p>
                    <button onClick={this.props.onClose}>Затвори прозор</button>
                    <button onClick={this.showConfirmDialog}>Избриши рецепт</button>
                    <ConfirmDeleteDialog shouldDisplay={this.state.confirmDialogDisplay} onDelete={this.handleDelete} onClose={this.hideConfirmDialog} />
                </ReactBootstrap.Modal>
            )
        }
    }
});

var App = React.createClass({
    getInitialState: function () {
        return {
            singleRecipeDisplay: false,
            currentRecipe: {},
            addRecipeFormDisplay: false,
        }
    },

    componentWillMount: function() {
        $.get('https://test-api-sedc.azurewebsites.net/api/Recipes/sweko', function (result) {
            recipes = result;
            updateDOM();
        });
    },



    displaySingleRecipe: function (e) {
        var id = e.target.id; // which recipe to display?
        index = helper.getIndexById(Number(id));
        this.setState({singleRecipeDisplay: true, currentRecipe: recipes[index]}); // show the dialog, passing the current recipe
    },

    deleteRecipe: function (index, e) {
        var index = helper.getIndexById(Number(index));
        recipes.splice(index, 1);
        //recipes.splice(index, 1, null);
        this.hideSingleRecipe();
        updateDOM();
    },

    hideSingleRecipe: function () {
        this.setState({singleRecipeDisplay: false});
    },

    hideRecipeForm: function () {
        this.setState({addRecipeFormDisplay: false});
    },

    showRecipeForm: function () {
        this.setState({addRecipeFormDisplay: true});
    },

    render: function () {
        return (
            <div>
                <button type="button" onClick={this.showRecipeForm}>Add new recipe</button>
                <InputForm shouldDisplay={this.state.addRecipeFormDisplay} onAdd={this.hideRecipeForm} />
                <RecipesTable onRead={this.displaySingleRecipe} onDelete={this.deleteRecipe} />
                <SingleRecipeDisplay shouldDisplay={this.state.singleRecipeDisplay} currentRecipe={this.state.currentRecipe}
                                     onClose={this.hideSingleRecipe} onDelete={this.deleteRecipe} />
            </div>
        )
    }
});

ReactDOM.render(<App />, document.getElementById('container'))

function updateDOM() {
    ReactDOM.render(<App />, document.getElementById('container'));
}