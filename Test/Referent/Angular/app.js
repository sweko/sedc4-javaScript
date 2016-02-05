angular
    .module("contact-manager", [])
    .controller("ContactController", function ($scope) {
        $scope.name = undefined;
        $scope.phone = undefined;
        $scope.email = undefined;
        
        $scope.current;

        $scope.contacts = [{
            id: 1,
            name: "Wekoslav Stefannovski",
            email: "swekster@gmail.com",
            phone: "38978499695",
            edit: false,
            view: true,
        }, {
                id: 2,
                name: "Orce Petreski",
                email: "orce@example.com",
                phone: "12345",
                edit: true,
                view: false,
            }];

        $scope.save = function () {
            $scope.error = "";
            if (!$scope.email.match(/.*@.*/)){
                $scope.error = "NEMET MAJMUN";
                return;
            }
            
            var id = Math.max.apply(null, $scope.contacts.map(function (c) { return c.id; })) + 1;
            $scope.contacts.push({
                id: id,
                name: $scope.name,
                email: $scope.email,
                phone: $scope.phone,
                edit: false,
                view: true,
            });
        };

        $scope.read = function (contact) {
            $scope.display = contact;
        };

        $scope.edit = function (contact) {
            contact.edit = true;
            contact.view = false;
        };

        $scope.update = function (contact) {
            contact.edit = false;
            contact.view = true;
        };

        $scope.delete = function (contact) {
            var index = $scope.contacts.indexOf(contact);
            $scope.contacts.splice(index, 1);
        };

        $scope.display = null;

        $scope.closeDisplay = function () {
            $scope.display = null;
        };

        $scope.getClass = function (contact) {
            if (contact === $scope.current){
                return "red";
            } else if (contact===$scope.display){
                return "green";
            } 
            return "yellow";
        };
        
        $scope.setCurrent = function(contact){
            $scope.current = contact;
        }

    });