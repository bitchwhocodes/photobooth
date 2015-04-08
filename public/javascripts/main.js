

var CountDownView = Backbone.View.extend({

	el:".countdown-container",
	initialize:function(obj)
	{
		this.counter = 3;
		this.classesToAdd =['pink','lime','orange','black','blue'];
		this.counterItem = $(this.el).find('.countdown');
		this.number = $(this.el).find('.number');
		this.prepare();
		this.doAnimation();
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
			console.log("hellow")
			$('.countdown img').removeClass("hide").addClass('show');
			$('.countdown p').addClass('hide');
			$('.countdown').addClass('animated zoomIn');
		} else if(this.counter==-2)
		{
			$('.click-text').removeClass('hide').addClass('show animated zoomIn');
			//$('.countdown').addClass('animated fadeOut');
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
