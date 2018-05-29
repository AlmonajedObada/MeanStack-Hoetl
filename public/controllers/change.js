function change($scope, $http) {
    $scope.email = "";
    $scope.password = "";
    $scope.text = "password";
    $scope.see = function () {
        if ($scope.text == "password") {
            $scope.text = "text";
        } else {
            $scope.text = "password";
        }
    }
}