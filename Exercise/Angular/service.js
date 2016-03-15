angular
    .module("my-invoice")
    .factory("CurrencyService", function ($http) {
        var dataService = {};

        dataService.getCurrencies = function () {
            return [
                { id: 1, name: "USD", rate: 1, symbol: "$" },
                { id: 2, name: "EUR", rate: 0.74, symbol: "$" },
                { id: 3, name: "CNY", rate: 6.09, symbol: "$" },
                { id: 4, name: "MKD", rate: 56.7, symbol: "MKD " },
                { id: 5, name: "AUD", rate: 0.65, symbol: "A$ " },
                { id: 6, name: "GBP", rate: 1.85, symbol: "$" },
            ];
        };
        
        dataService.getSimpleTotal = function(quantity, cost){
            return quantity * cost;
        };
        
        return dataService;
    });

 