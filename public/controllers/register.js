function register ($scope) {
  $scope.firstName = ''
  $scope.lastName = ''
  $scope.email = ''
  $scope.password = ''
  $scope.text = 'password'
  $scope.see = function () {
    if ($scope.text == 'text') {
      $scope.text = 'password'
    } else {
      $scope.text = 'text'
    }
  }
}
