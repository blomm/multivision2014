angular.module('mvApp').controller('mvMainCtrl', ['$scope',function($scope){
  $scope.courses=[
    {name:'beginners math', featured: true, published: new Date('2014', '10', '28')},
    {name:'advanced science', featured: false, published: new Date('2014', '11', '22')},
    {name:'beginners gym', featured: true, published: new Date('2014', '12', '26')},
    {name:'advanced physics', featured: false, published: new Date('2014', '9', '20')},
    {name:'intermediate math', featured: true, published: new Date('2014', '3', '19')},
    {name:'beginners biology', featured: true, published: new Date('2014', '7', '21')},
    {name:'intermediate art', featured: false, published: new Date('2014', '12', '8')},
    {name:'beginners art', featured: false, published: new Date('2014', '11', '18')},
    {name:'advanced math', featured: false, published: new Date('2014', '10', '24')},
    {name:'beginners calculus', featured: false, published: new Date('2014', '1', '8')}
  ];
}])