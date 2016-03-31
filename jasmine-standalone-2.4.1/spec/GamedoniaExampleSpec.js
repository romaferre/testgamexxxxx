/**
 * 
 */

describe("GamedoniaExample", function() {
    beforeAll(function(done) {
    	val testGame = GamedoniaTest.createTestGame();
        done();
      }, 1000);	
    beforeEach(function(done) {
        done();
      }, 1000);
    
    
	  it("should be able to invoke a script", function(done) {
		  
		  

			GamedoniaScript.run('hello',{},{
				success:function(data){
					expect(data.message).toEqual("Hello world!!");
					console.log('Script success!');
					done();
				},
				error:function(status,response){
					fail();
					console.log('Script failed!');
					done();
				}
			});
	  });
	
});