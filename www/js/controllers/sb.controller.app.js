/**
 *
 */
;(function(){
	"use strict";

	window.SB.controller("AppController", ["$scope", "$data", function($scope, $data) {

		$.extend({
			"init": function($data, $scope){
				this.animate();
				this.bind();
			},

			"bind": function(){
				$scope.$on("resize", function(){
					$scope.profile = (window.innerWidth < 600) ? "small" : "large";
					$scope.$apply();
				});

				$scope.$on("gotEventData", function(e, data){
					$data.events = data.events;
				});
			}
		}, $scope, {
			"styles": $data.styles,
			"profile": window.innerWidth < 600 ? "small" : "large",
			"profiles": {
				"large": {
					"calendar": {
						"width": "60%"
					},
					"infobox": {
						"width": "40%"
					}
				},
				"small": {
					"calendar": {
						"width": "100%"
					},
					"infobox": {
						"width": "100%",
					}
				}
			}
		}, {
			"animate": function(time){
				requestAnimationFrame( $scope.animate );
				TWEEN.update( time );
			}
		}).init($data, $scope);
	}]);
})();