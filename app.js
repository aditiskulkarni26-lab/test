var app = angular.module('userApp', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

// helper: normalize dates and integers before sending to API
function preparePayload(obj, dateFields, intFields) {
    var payload = angular.copy(obj) || {};
    dateFields = dateFields || [];
    intFields = intFields || [];

    dateFields.forEach(function(field){
        if (payload[field]) {
            var d = payload[field];
            if (Object.prototype.toString.call(d) === '[object Date]') {
                payload[field] = d.toISOString().slice(0,10);
            } else if (typeof d === 'string') {
                var dt = new Date(d);
                if (!isNaN(dt.getTime())) payload[field] = dt.toISOString().slice(0,10);
            }
        }
    });

    intFields.forEach(function(field){
        if (payload[field] !== undefined && payload[field] !== null && payload[field] !== '') {
            var v = parseInt(payload[field], 10);
            if (!isNaN(v)) payload[field] = v;
        }
    });

    return payload;
}

// helper: parse date string fields into Date objects for ng-model date inputs
function parseDates(obj, dateFields) {
    dateFields = dateFields || [];
    dateFields.forEach(function(field){
        if (obj && obj[field] && typeof obj[field] === 'string') {
            var dt = new Date(obj[field]);
            if (!isNaN(dt.getTime())) obj[field] = dt;
        }
    });
}

function logError(prefix, err) {
    console.error(prefix, err && err.data ? err.data : err);
}

app.controller('InvestmentCommodityCtrl', function ($scope, $http) {
    var API_URL = "http://127.0.0.1:8000/investment_commodity/";

    $scope.loadInvestmentCommodities = function () {
        $http.get(API_URL)
            .then(function (res) {
                $scope.investmentCommodities = res.data;
                console.log('Loaded investment_commodities:', res.data);
            }, function (err) {
                logError('Error loading investment_commodities:', err);
                $scope.investmentCommodities = [];
            });
    };

    $scope.saveInvestmentCommodity = function () {
        var payload = preparePayload($scope.investmentCommodity, ['purchased_date'], ['amount_invested','amount_earned']);
        if (payload && payload.id) {
            $http.put(API_URL + payload.id + "/", payload)
                .then(function () {
                    $scope.loadInvestmentCommodities();
                    $scope.investmentCommodity = {};
                }, function (err) {
                    logError('Error updating investment_commodity:', err);
                });
        } else {
            $http.post(API_URL, payload)
                .then(function () {
                    $scope.loadInvestmentCommodities();
                    $scope.investmentCommodity = {};
                }, function (err) {
                    logError('Error creating investment_commodity:', err);
                });
        }
    };

    $scope.editInvestmentCommodity = function (obj) {
        $scope.investmentCommodity = angular.copy(obj);
        parseDates($scope.investmentCommodity, ['purchased_date']);
    };

    $scope.deleteInvestmentCommodity = function (id) {
        $http.delete(API_URL + id + "/")
            .then(function () {
                $scope.loadInvestmentCommodities();
            }, function (err) {
                console.error('Error deleting investment_commodity:', err);
            });
    };

    $scope.loadInvestmentCommodities();
});

app.controller('InvestmentFdCtrl', function ($scope, $http) {
    var API_URL = "http://127.0.0.1:8000/investment_fd/";

    $scope.loadInvestmentFds = function () {
        $http.get(API_URL)
            .then(function (res) {
                $scope.investmentFds = res.data;
                console.log('Loaded investment_fds:', res.data);
            }, function (err) {
                console.error('Error loading investment_fds:', err);
                $scope.investmentFds = [];
            });
    };

    $scope.saveInvestmentFd = function () {
        var payload = preparePayload($scope.investmentFd, ['purchased_date','maturity_date'], ['amount_invested','amount_earned','interest_earned']);
        if (payload && payload.id) {
            $http.put(API_URL + payload.id + "/", payload)
                .then(function () {
                    $scope.loadInvestmentFds();
                    $scope.investmentFd = {};
                }, function (err) {
                    logError('Error updating investment_fd:', err);
                });
        } else {
            $http.post(API_URL, payload)
                .then(function () {
                    $scope.loadInvestmentFds();
                    $scope.investmentFd = {};
                }, function (err) {
                    logError('Error creating investment_fd:', err);
                });
        }
    };

    $scope.editInvestmentFd = function (obj) {
        $scope.investmentFd = angular.copy(obj);
        parseDates($scope.investmentFd, ['purchased_date','maturity_date']);
    };

    $scope.deleteInvestmentFd = function (id) {
        $http.delete(API_URL + id + "/")
            .then(function () {
                $scope.loadInvestmentFds();
            }, function (err) {
                console.error('Error deleting investment_fd:', err);
            });
    };

    $scope.loadInvestmentFds();
});

app.controller('InvestmentMutualFundCtrl', function ($scope, $http) {
    var API_URL = "http://127.0.0.1:8000/investment_mutual_fund/";

    $scope.loadInvestmentMutualFunds = function () {
        $http.get(API_URL)
            .then(function (res) {
                $scope.investmentMutualFunds = res.data;
                console.log('Loaded investment_mutual_funds:', res.data);
            }, function (err) {
                console.error('Error loading investment_mutual_funds:', err);
                $scope.investmentMutualFunds = [];
            });
    };

    $scope.saveInvestmentMutualFund = function () {
        var payload = preparePayload($scope.investmentMutualFund, ['purchased_date'], ['amount_invested','amount_earned','interest_earned']);
        if (payload && payload.id) {
            $http.put(API_URL + payload.id + "/", payload)
                .then(function () {
                    $scope.loadInvestmentMutualFunds();
                    $scope.investmentMutualFund = {};
                }, function (err) {
                    logError('Error updating investment_mutual_fund:', err);
                });
        } else {
            $http.post(API_URL, payload)
                .then(function () {
                    $scope.loadInvestmentMutualFunds();
                    $scope.investmentMutualFund = {};
                }, function (err) {
                    logError('Error creating investment_mutual_fund:', err);
                });
        }
    };

    $scope.editInvestmentMutualFund = function (obj) {
        $scope.investmentMutualFund = angular.copy(obj);
        parseDates($scope.investmentMutualFund, ['purchased_date']);
    };

    $scope.deleteInvestmentMutualFund = function (id) {
        $http.delete(API_URL + id + "/")
            .then(function () {
                $scope.loadInvestmentMutualFunds();
            }, function (err) {
                console.error('Error deleting investment_mutual_fund:', err);
            });
    };

    $scope.loadInvestmentMutualFunds();
});

app.controller('InvestmentStocksCtrl', function ($scope, $http) {
    var API_URL = "http://127.0.0.1:8000/investment_stocks/";

    $scope.loadInvestmentStocks = function () {
        $http.get(API_URL)
            .then(function (res) {
                $scope.investmentStocks = res.data;
                console.log('Loaded investment_stocks:', res.data);
            }, function (err) {
                console.error('Error loading investment_stocks:', err);
                $scope.investmentStocks = [];
            });
    };

    $scope.saveInvestmentStock = function () {
        var payload = preparePayload($scope.investmentStock, ['purchased_date'], ['stocks_qty','stocks_amount','amount_earned','interest_earned']);
        if (payload && payload.id) {
            $http.put(API_URL + payload.id + "/", payload)
                .then(function () {
                    $scope.loadInvestmentStocks();
                    $scope.investmentStock = {};
                }, function (err) {
                    logError('Error updating investment_stock:', err);
                });
        } else {
            $http.post(API_URL, payload)
                .then(function () {
                    $scope.loadInvestmentStocks();
                    $scope.investmentStock = {};
                }, function (err) {
                    logError('Error creating investment_stock:', err);
                });
        }
    };

    $scope.editInvestmentStock = function (obj) {
        $scope.investmentStock = angular.copy(obj);
        parseDates($scope.investmentStock, ['purchased_date']);
    };

    $scope.deleteInvestmentStock = function (id) {
        $http.delete(API_URL + id + "/")
            .then(function () {
                $scope.loadInvestmentStocks();
            }, function (err) {
                console.error('Error deleting investment_stock:', err);
            });
    };

    $scope.loadInvestmentStocks();
});

app.controller('InvestmentTableCtrl', function ($scope, $http) {
    var API_URL = "http://127.0.0.1:8000/investment_table/";

    $scope.loadInvestmentTables = function () {
        $http.get(API_URL)
            .then(function (res) {
                $scope.investmentTables = res.data;
                console.log('Loaded investment_tables:', res.data);
            }, function (err) {
                console.error('Error loading investment_tables:', err);
                $scope.investmentTables = [];
            });
    };

    $scope.saveInvestmentTable = function () {
        var payload = preparePayload($scope.investmentTable, ['purchased_date'], ['amount_invested','amount_earned']);
        if (payload && payload.id) {
            $http.put(API_URL + payload.id + "/", payload)
                .then(function () {
                    $scope.loadInvestmentTables();
                    $scope.investmentTable = {};
                }, function (err) {
                    logError('Error updating investment_table:', err);
                });
        } else {
            $http.post(API_URL, payload)
                .then(function () {
                    $scope.loadInvestmentTables();
                    $scope.investmentTable = {};
                }, function (err) {
                    logError('Error creating investment_table:', err);
                });
        }
    };

    $scope.editInvestmentTable = function (obj) {
        $scope.investmentTable = angular.copy(obj);
        parseDates($scope.investmentTable, ['purchased_date']);
    };

    $scope.deleteInvestmentTable = function (id) {
        $http.delete(API_URL + id + "/")
            .then(function () {
                $scope.loadInvestmentTables();
            }, function (err) {
                console.error('Error deleting investment_table:', err);
            });
    };

    $scope.loadInvestmentTables();
});

app.controller('UserCtrl', function ($scope, $http) {
    var API_URL = "http://127.0.0.1:8000/user/";

    $scope.loadUsers = function () {
        $http.get(API_URL)
            .then(function (res) {
                $scope.users = res.data;
                console.log('Loaded users:', res.data);
            }, function (err) {
                logError('Error loading users:', err);
                $scope.users = [];
            });
    };

    $scope.saveUser = function () {
        var payload = preparePayload($scope.user, [], []);
        if (payload && payload.id) {
            $http.put(API_URL + payload.id + "/", payload)
                .then(function () {
                    $scope.loadUsers();
                    $scope.user = {};
                }, function (err) {
                    logError('Error updating user:', err);
                });
        } else {
            $http.post(API_URL, payload)
                .then(function () {
                    $scope.loadUsers();
                    $scope.user = {};
                }, function (err) {
                    logError('Error creating user:', err);
                });
        }
    };

    $scope.editUser = function (u) {
        $scope.user = angular.copy(u);
    };

    $scope.deleteUser = function (id) {
        $http.delete(API_URL + id + "/")
            .then(function () {
                $scope.loadUsers();
            }, function (err) {
                console.error('Error deleting user:', err);
            });
    };

    $scope.loadUsers();
});

app.controller('CustomerCtrl', function ($scope, $http) {
    var API_URL = "http://127.0.0.1:8000/customer/";

    $scope.loadCustomers = function () {
        $http.get(API_URL)
            .then(function (res) {
                $scope.customers = res.data;
                console.log('Loaded customers:', res.data);
            }, function (err) {
                logError('Error loading customers:', err);
                $scope.customers = [];
            });
    };

    $scope.saveCustomer = function () {
        var payload = preparePayload($scope.customer, [], []);
        if (payload && payload.id) {
            $http.put(API_URL + payload.id + "/", payload)
                .then(function () {
                    $scope.loadCustomers();
                    $scope.customer = {};
                }, function (err) {
                    logError('Error updating customer:', err);
                });
        } else {
            $http.post(API_URL, payload)
                .then(function () {
                    $scope.loadCustomers();
                    $scope.customer = {};
                }, function (err) {
                    logError('Error creating customer:', err);
                });
        }
    };

    $scope.editCustomer = function (c) {
        $scope.customer = angular.copy(c);
    };

    $scope.deleteCustomer = function (id) {
        $http.delete(API_URL + id + "/")
            .then(function () {
                $scope.loadCustomers();
            }, function (err) {
                console.error('Error deleting customer:', err);
            });
    };

    $scope.loadCustomers();
});

app.controller('PlanCtrl', function ($scope, $http) {
    var API_URL = "http://127.0.0.1:8000/plan/";

    $scope.loadPlans = function () {
        $http.get(API_URL)
            .then(function (res) {
                $scope.plans = res.data;
                console.log('Loaded plans:', res.data);
            }, function (err) {
                logError('Error loading plans:', err);
                $scope.plans = [];
            });
    };

    $scope.savePlan = function () {
        var payload = preparePayload($scope.plan, ['purchased_date','validation_date'], []);
        if (payload && payload.id) {
            $http.put(API_URL + payload.id + "/", payload)
                .then(function () {
                    $scope.loadPlans();
                    $scope.plan = {};
                }, function (err) {
                    logError('Error updating plan:', err);
                });
        } else {
            $http.post(API_URL, payload)
                .then(function () {
                    $scope.loadPlans();
                    $scope.plan = {};
                }, function (err) {
                    logError('Error creating plan:', err);
                });
        }
    };

    $scope.editPlan = function (p) {
        $scope.plan = angular.copy(p);
        parseDates($scope.plan, ['purchased_date','validation_date']);
    };

    $scope.deletePlan = function (id) {
        $http.delete(API_URL + id + "/")
            .then(function () {
                $scope.loadPlans();
            }, function (err) {
                console.error('Error deleting plan:', err);
            });
    };

    $scope.loadPlans();
});