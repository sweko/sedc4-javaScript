angular
    .module("test", [])
    .controller("PersonController", function ($scope) {
        $scope.nameInput = 'Stojancho';
        $scope.emailInput = 'stole@gmail.com';
        $scope.mobileInput = '078123123';
        $scope.active = undefined;
        $scope.showDetails = false;
        $scope.idClickedRow = -1;
        var id = 0;
        $scope.personContainer = [];
        $scope.insert = function() {
            $scope.personContainer.push({
                id: id++,
                name: $scope.nameInput,
                mobile: $scope.mobileInput,
                email: $scope.emailInput,
                edit: false
            });
        };

        $scope.read = function read(person) {
            $scope.active = person;
            $scope.showDetails = true;
        };
        
        $scope.edit = function edit(person) {
            person.edit = true;
        };
        
        $scope.update = function update(person) {
            person.edit = false;
        };
        
        $scope.delete = function (person) {
            var indexForDelete = $scope.personContainer.indexOf(person);
            $scope.personContainer.splice(indexForDelete, 1);
        };
        
        $scope.closeDetails = function () {
            $scope.showDetails = false;
        };
        
        $scope.setSelected = function (id) {
            $scope.idClickedRow = id;
        };
        
    }); 
