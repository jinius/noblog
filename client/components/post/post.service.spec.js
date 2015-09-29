'use strict';

describe('Service: Post', function () {

	var service, $httpBackend;

	// load the controller's module
	beforeEach(module('noblogApp'));

	// Initialize the controller and a mock scope
	beforeEach(inject(function(Post, _$httpBackend_) {
		service = Post;
		$httpBackend = _$httpBackend_;
	}));

	it('should get posts', function() {
		$httpBackend.expect('GET', '/api/posts')
		.respond([{ title: 'post test', content: 'post test content' }]);

		service.index()
		.then(function(data) {
			expect(data.length).toEqual(1);
			expect(data[0].title).toEqual('post test');
			expect(data[0].content).toEqual('post test content');
		});

		$httpBackend.flush();
	});

	it('should get a post', function() {
		$httpBackend.expect('GET', '/api/posts/1')
		.respond({ title: 'post test', content: 'post test content' });

		service.get(1)
		.then(function(data) {
			expect(data.title).toEqual('post test');
			expect(data.content).toEqual('post test content');
		});

		$httpBackend.flush();
	});

	it('should create a post', function() {
		$httpBackend.expect('POST', '/api/posts',
			{ title: 'post test', content: 'post test content' })
		.respond(201, '');

		service.create({ title: 'post test', content: 'post test content' });

		$httpBackend.flush();
	});

	it('should remove a post', function() {
		$httpBackend.expect('DELETE', '/api/posts/1')
		.respond(200, '');

		service.remove({ _id: 1 });

		$httpBackend.flush();
	});
});
