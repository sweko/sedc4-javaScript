angular
    .module("my-invoice", [])
    .controller("InvoiceController", function ($scope, $http) {
        $scope.quantity;
        $scope.cost;
        $scope.currencies = [
            { id:1, name: "USD", rate: 1, symbol: "$"},
            { id:2, name: "EUR", rate: 0.74, symbol: "$"},
            { id:3, name: "CNY", rate: 6.09, symbol: "$"},
            { id:4, name: "MKD", rate: 56.7, symbol: "MKD "},
            { id:5, name: "AUD", rate: 0.65, symbol: "A$ "},
            { id:6, name: "GBP", rate: 1.85, symbol: "$"},
        ];
        $scope.inCurrency = 2;

        $scope.total = function total(outCurrency) {
            return $scope.convertCurrency($scope.quantity  * $scope.cost, $scope.getCurrencyById($scope.inCurrency), outCurrency);
        };
        
        $scope.convertCurrency = function convertCurrency(amount, inCurr, outCurr) {
            var result = amount * outCurr.rate / inCurr.rate;
            return result;
        };
        
        $scope.simpleTotal = function(){
            return $scope.quantity  * $scope.cost;
        };
        
        $scope.getCurrencyById = function(id){
            return $scope.currencies.filter(c => c.id == id)[0];
        };
        
        $scope.pay = function pay() {
            window.alert("Thanks!");
        };
    }); 
