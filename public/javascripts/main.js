



var EmailView  = Backbone.View.extend({

	el:".email",
	events: {
		'click button':'handleEmailButton'
			
	},

	initialize:function(obj){
		// MARIA YOU MIGHT HAVE TO FIX THESE 
		this.inputField = $('.email').find('input');
		this.img = $('.showimage');
	},

	handleEmailButton:function(obj)
	{

		console.log("handle email button");
		// get the value from the input
		var email = this.inputField.val();
		var img = this.img.attr('src');
		var data={};
		data.img = img;
		data.email = email;

		$.ajax({
		  url: '/email',
		  data: data,
		  success: _.bind(this.onEmailSubmitted,this),
		  
		});


	},

	onEmailSubmitted:function(data){
		console.log(data);

	}
})

var CountDownView = Backbone.View.extend({

	el:".countdown-container",
	initialize:function(obj)
	{
		this.counter = 3;
		this.classesToAdd =['pink','lime','orange','black','blue'];
		this.counterItem = $(this.el).find('.countdown');
		this.number = $(this.el).find('.number');
		this.prepare();
		//this.doAnimation();
	},

	prepare:function(){

		$('.countdown img').removeClass("show hide").addClass('hide');
		$('.countdown p').removeClass("hide").addClass('show');
		
	},

	startAnimation:function(){

	},

	doAnimation:function(){

		$(this.counterItem).addClass('animated zoomIn');
		$(this.counterItem).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',_.bind(this.onAnimationComplete, this));
		
		
	},
	onAnimationComplete:function(){

            var newClass = this.classesToAdd[this.counter+1];
	    	$(this.el).removeClass('pink blue black orange ').addClass(newClass)
	    
	    	if(this.counter> -2){
	    	
				$(this.counterItem).removeClass('animated zoomIn');
				this.counter--;
				this.mySetID = setInterval(_.bind(this.onRestart, this), 100);
			}else{
			
			this.counter = 3;
		}
	},

	onRestart:function(){
		
		clearInterval(this.mySetID);
		if(this.counter > -1){
			$('.countdown').addClass('animated zoomIn');
			$(this.number).text(this.counter.toString());
		}else if(this.counter==-1){
			
			$('.countdown img').removeClass("hide").addClass('show');
			$('.countdown p').addClass('hide');
			$('.countdown').addClass('animated zoomIn');
		} else if(this.counter==-2)
		{
			$('.click-text').removeClass('hide').addClass('show animated zoomIn');
			$('.click-text').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',_.bind(this.sendMessage, this));
			//$('.countdown').addClass('animated fadeOut');
		}

	},

	sendMessage:function(){

		console.log("stuff is going");
		
		$.ajax({
            url: '/takephoto',
            type: 'GET',
            dataType: 'json',
           
            contentType: 'application/json',

            complete: function() {
                console.log('process complete');

            },
            success: function(data) {
                console.log(data);
               
                console.log('process success');
                $('.showimage').attr('src',data.result);
            },
            error: function() {
                console.log('process error');
            }
        });



	
	},


	render:function()
	{
		console.log("render");		
	},

	

	animateCounter:function(){


	}


})


////////////////////////////////////////////////
// Initialize everything /////////////////////

var countdown = new CountDownView();
var emailview = new EmailView();
