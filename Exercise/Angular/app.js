angular
    .module("my-invoice", [])
    .controller("InvoiceController", function ($scope, CurrencyService) {
        $scope.quantity;
        $scope.cost;
        $scope.currencies = CurrencyService.getCurrencies();
        $scope.inCurrency = 2;

        $scope.total = function total(outCurrency) {
            return $scope.convertCurrency($scope.quantity  * $scope.cost, $scope.getCurrencyById($scope.inCurrency), outCurrency);
        };
        
        $scope.convertCurrency = function convertCurrency(amount, inCurr, outCurr) {
            var result = amount * outCurr.rate / inCurr.rate;
            return result;
        };
        
        $scope.simpleTotal = function(){
            return CurrencyService.getSimpleTotal($scope.quantity, $scope.cost);
        };
        
        $scope.getCurrencyById = function(id){
            return $scope.currencies.filter(c => c.id == id)[0];
        };
        
        $scope.pay = function pay() {
            window.alert("Thanks!");
        };
    }); 
