var assert = chai.assert
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

describe('test setup', function() {
			it('should pass all of these', function(){
				assert.typeOf(foo, 'string'); // without optional message
				assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
				assert.equal(foo, 'bar', 'foo equal `bar`');
				assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
				assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
    });

});

var expect = chai.expect
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

describe('another test', function ()
{
	it('should pass all of these', function(){
		expect(foo).to.be.a('string');
		expect(foo).to.equal('bar');
		expect(foo).to.have.length(3);
		expect(beverages).to.have.property('tea').with.length(3);

		console.log("ran");
	});

});