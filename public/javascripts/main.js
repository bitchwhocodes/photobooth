

var CountDownView = Backbone.View.extend({

	el:".countdown-container",
	initialize:function(obj)
	{
		this.counter = 3;
		this.counterItem = $(this.el).find('.countdown');
		this.number = $(this.el).find('.number');
		this.doAnimation();
		
	},

	doAnimation:function(){


		$(this.counterItem).addClass('animated zoomIn');
		$(this.counterItem).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',_.bind(this.onAnimationComplete, this));
		
	},
	onAnimationComplete:function(){


	    
	    	if(this.counter> -1){
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
		}else{
			$('.countdown').addClass('animated fadeOut');
		}

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
