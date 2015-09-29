'use strict';

describe('Controller: PostCtrl', function () {

	// load the controller's module
	beforeEach(module('noblogApp'));
	beforeEach(module('Mockup'));

	var postMockup = {};

	angular.module('Mockup', [])
	.factory('Post', function($q) {
		return {
			index: function() {
				return $q.when(postMockup.index());
			},
			get: function() {
				return $q.when(postMockup.get());
			},
			create: function(post) {
				return $q.when(postMockup.create(post));
			},
			remove: function(post) {
				return $q.when(postMockup.remove(post));
			}
		};
	});

	var $controller,
		scope,
		root,
		post;

	beforeEach(inject(function (_$controller_, $rootScope, _Post_) {
		$controller = _$controller_;
		scope = $rootScope.$new();
		root = $rootScope;
		post = _Post_;
	}));

	describe('Controller: PostCtrl', function () {
		it('should get posts and put into scope', function() {
			var testPosts = [{ title: 'PostCtrl', content: 'PostCtrl test' }];

			postMockup.index = function() {
				return testPosts;
			};

			$controller('PostCtrl', {
				$scope: scope,
				Post: post,
			});

			root.$apply();
			expect(scope.posts).toEqual(testPosts);
		});
	});

	describe('Controller: PostNewCtrl', function () {
		it('should save a post and put into scope', function() {
			var location = { path: function() {} };
			var testPost = { title: 'PostNewCtrl', content: 'PostNewCtrl test' };
			var newPost;

			postMockup.create = function(post) {
				newPost = post;
			};

			$controller('PostNewCtrl', {
				$scope: scope,
				$location: location,
				Post: post
			});

			scope.post = testPost;
			scope.createPost();
			expect(newPost.title).toEqual(testPost.title);
			expect(newPost.content).toEqual(testPost.content);
		});
	});

	describe('Controller: PostViewCtrl', function () {
		it('should save a post and put into scope', function() {
			var location = { path: function() {} };
			var routeParams = { id: '1' };
			var testPost = { title: 'PostNewCtrl', content: 'PostNewCtrl test' };
			var delPost;

			postMockup.get = function() {
				return testPost;
			};

			postMockup.remove = function(post) {
				delPost = post;
			};

			$controller('PostViewCtrl', {
				$scope: scope,
				$location: location,
				$routeParams: routeParams,
				Post: post
			});

			root.$apply();
			scope.post = testPost;
			scope.removePost();
			expect(delPost).toEqual(testPost);
		});
	});
});
