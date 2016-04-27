'use strict'

var chai = require('chai'),
    expect = chai.expect;

chai.should();

function isEven(num) {
  return num % 2 === 0;
}

describe('isEven', function(){
  it('should return true when number is even', function(){
    isEven(4).should.be.true
  })

  it('should return false when the number is odd', function(){
    expect(isEven(5)).to.be.false
  })
})

function add (num1, num2) {
  return num1 + num2;
}

describe('add without setup/teardown', () => {
  var num;

  beforeEach( () => {
    num = 5;
  });

  // afterEach( () => {

  // });

  xit('should be ten when adding 5+5', () => {
    num = add(num, 5);
    num.should.equal(10);
  });

  it.skip('should be twelve when adding 7+5', () => {
    add(num, 7).should.equal(12);
  });

});
