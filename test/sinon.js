'use strict'

var chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect;

chai.should();

describe('sinon tests', () => {
  let student, schedule;

  beforeEach( () => {
    student = {
      dropClass: function(classId, callback) {
        //so stuff
        if(!!callback.dropClass) {
          callback.dropClass();
        } else {
          callback();
        }
      },
      addClass: function() {
        if(!schedule.classIsFull()) {
          return true;
        } else {
          return false;
        }
      }
    };
    schedule = {
      dropClass: function() {
        console.log("class dropped")
      },
      classIsFull: function() {
        return true;
      }
    }
  });

  //just checking if it was called

  describe('student.dropClass', () => {
    it('should call the callback', () => {
      var spy = sinon.spy();
      student.dropClass(1, spy);
      spy.called.should.be.true;
    })

  //checking that the callback function was called and checking the parameters
    it('should call the callback and log to the console', () => {
      function onClassDropped(){
        console.log('onClassDropped was called');
      }

      var spy = sinon.spy(onClassDropped);
      student.dropClass(1, spy);
      spy.called.should.be.true;
    })

  //spe wraps around the method function
    it('should call the callback even if it\'s a method of an object', () => {
      sinon.spy(schedule, 'dropClass');
      student.dropClass(1, schedule);
      schedule.dropClass.called.should.be.true;
    });

  });

  describe('student with stubs', () => {
    it('should call a stubbed method', () => {
      var stub = sinon.stub(schedule); //passing the whole object not just one method
      student.dropClass(1, stub);//calling the method on stub object instead of schedule object - doesn't run the insides of the functions
      stub.dropClass.called.should.be.true;
    });

    it('should return true when the class is not full', () => {
      var stub = sinon.stub(schedule);
      stub.classIsFull.returns(false); //modifies the return value so the that the test would pass
      var returnVal = student.addClass(stub);
      returnVal.should.be.true;
    });
  });

  //mock - you can set up so that the code runs with some expectations = for complicates issues
  describe('student with mocks', () => {
    it('mocks the schedule', () => {
      var mockObj = sinon.mock(schedule);
      var expectation = mockObj.expects('classIsFull').once(); //this function was called once

      student.addClass(schedule);
      expectation.verify();
    })
  })
});



//exoect to throw an exception  -  meaning that this specific function should "fail" under ceratin conditions, for example if we trying to unregister a student that wasn't ever registered
