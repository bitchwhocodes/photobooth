

var AppRouter = Backbone.Router.extend({
        routes: {
            "*actions": "defaultRoute" // matches http://example.com/#anything-here

        }
    });
    // Initiate the router
    var app_router = new AppRouter;

    app_router.on('route:defaultRoute', function(actions) {
       
    })

  
    Backbone.history.start();

var EmailView  = Backbone.View.extend({

	el:".pt-page-9",
	events: {
		'click button':'handleEmailButton'
			
	},

	initialize:function(obj){
		// MARIA YOU MIGHT HAVE TO FIX THESE 
		this.inputField = $('.email').find('input');
		this.img = $(this.el).find('.showimage');
		console.log("Email Initialize : img"+this.img)
	},

	handleEmailButton:function(obj)
	{

		//console.log("handle email button");
		// get the value from the input
		var email = this.inputField.val();
		var image= this.img.attr('src');
		var data={};
		data.image = image;
		data.email = email;

		console.log("EmailView: Submit data",data);

		$.ajax({
		  url: '/email',
		  data: data,
		  success: _.bind(this.onEmailSubmitted,this),
		  
		});


	},

	onEmailSubmitted:function(data){
		//console.log(data);
		this.inputField.val('');
		this.model.set({
			'currentpage': '.pt-page-9',
			'nextpage':'.pt-page-5',
			'nexttransition':'pt-page-moveFromBottom',
			'currtransition':'pt-page-moveToTop'
		});



	}
})

var ReviewView  = Backbone.View.extend({

	el:".pt-page-4",
	events: {
		'click .review-yes':'handleYesKeep',
		'click .review-no':'handleNoTrash'
			
	},

	initialize:function(obj){
		// MARIA YOU MIGHT HAVE TO FIX THESE 
		this.inputField = $('.email').find('input');
		this.img = $('.showimage');
	},

	handleYesKeep:function(){
		this.model.set({
			'currentpage': '.pt-page-4',
			'nextpage':'.pt-page-11',
			'nexttransition':'pt-page-moveFromBottom',
			'currtransition':'pt-page-moveToTop'
		});

	},
	handleNoTrash:function(){

			this.model.set({
			'currentpage': '.pt-page-4',
			'nextpage':'.pt-page-2',
			'nexttransition':'pt-page-moveFromLeft',
			'currtransition':'pt-page-moveToRight'
		});
	}
})


var SendView  = Backbone.View.extend({

	el:".pt-page-11",
	events: {
		'click .email-button':'handleEmail',
		'click .txt-button':'handleSMS'
			
	},

	initialize:function(obj){
		// MARIA YOU MIGHT HAVE TO FIX THESE 
		this.inputField = $('.email').find('input');
		this.img = $('.showimage');
	},

	handleEmail:function(){
		this.model.set({
			'currentpage': '.pt-page-11',
			'nextpage':'.pt-page-9',
			'nexttransition':'pt-page-moveFromRight',
			'currtransition':'pt-page-moveToLeft'
		});

	},
	handleSMS:function(){

			this.model.set({
			'currentpage': '.pt-page-11',
			'nextpage':'.pt-page-10',
			'nexttransition':'pt-page-moveFromRight',
			'currtransition':'pt-page-moveToLeft'
		});
	}
})

var SMSView  = Backbone.View.extend({

	el:".pt-page-10",
	events: {
		'click button':'handleSMS',
			
	},

	initialize:function(obj){
		// MARIA YOU MIGHT HAVE TO FIX THESE 
		this.inputField = $(this.el).find('input');
		this.img = $('.showimage');
	},

	handleSMS:function(obj)
	{

		var cell = this.inputField.val();
		var image = this.img.attr('src');
		var data={};

		this.inputField.val('');
		
		data.cell = cell;
		//console.log(data.cell);
		data.image=image;

		$.ajax({
		  url: '/sms',
		  data: data,
		  success: _.bind(this.onSMSSubmitted,this),
		  
		});
	},

	onSMSSubmitted:function(){

			//console.log("onSMSSubmitted")
			this.model.set({
			'currentpage': '.pt-page-10',
			'nextpage':'.pt-page-5',
			'nexttransition':'pt-page-moveFromRight',
			'currtransition':'pt-page-moveToLeft'
		});
	}
})



var ShareView = Backbone.View.extend({

	el:".pt-page-5",
	events: {
		'click .yes-button':'handleYesShare',
		'click .no-button':'handleNoShare',
		'click a':'handlePrivacyPolicy'
			
	},

	initialize:function(obj){
		// MARIA YOU MIGHT HAVE TO FIX THESE 
		this.inputField = $('.email').find('input');
		this.img = $('.showimage');
	},

	handlePrivacyPolicy:function(obj){
		obj.stopPropagation()
		this.model.set({
			'currentpage':'.pt-page-5',
			'nextpage':'.pt-page-8',
			'nexttransition':'pt-page-moveFromRight',
			'currtransition':'pt-page-moveToLeft'
		})

	},

	handleNoShare:function(obj)
	{
		//console.log("handle no share")
		this.model.set({
			'currentpage':'.pt-page-5',
			'nextpage':'.pt-page-7',
			'nexttransition':'pt-page-moveFromBottom',
			'currtransition':'pt-page-moveToTop'
		})
	},
	handleYesShare:function(obj)
	{

		console.log("Share View:sharing");
		var img = this.img.attr('src');
		var data={};
		data.img = img;
		data.email = 'mary.'

		$.ajax({
		  url: '/email',
		  data: data,
		  success: _.bind(this.onEmailSubmitted,this),
		  
		});


	},

	onEmailSubmitted:function(data){
		//console.log(data);
		this.model.set({
			'currentpage': '.pt-page-5',
			'nextpage':'.pt-page-5',
			'nexttransition':'pt-page-moveFromTop',
			'currtransition':'pt-page-moveToBottom'
		});

	}
})

var PrivacyView = Backbone.View.extend({
		el:".pt-page-8",
	events: {
		'click button':'handleDone'		
	},

	initialize:function(obj){
	
	},

	handleDone:function(obj)
	{
		//console.log("handle no share")
		this.model.set({
			'currentpage':'.pt-page-8',
			'nextpage':'.pt-page-5',
			'nexttransition':'pt-page-moveFromLeft',
			'currtransition':'pt-page-moveToRight'
		})
	},
	
	
})

var NoShareView = Backbone.View.extend({
		el:".pt-page-7",
	events: {
		'click .yes-button':'handleYesPhoto',
		'click .no-button':'handleYesPhoto'
			
	},

	initialize:function(obj){
		// MARIA YOU MIGHT HAVE TO FIX THESE 
		this.inputField = $('.email').find('input');
		this.img = $('.showimage');
	},

	handleYesPhoto:function(obj)
	{
		//console.log("handle no share")
		this.model.set({
			'currentpage':'.pt-page-7',
			'nextpage':'.pt-page-2',
			'nexttransition':'pt-page-moveFromTop',
			'currtransition':'pt-page-moveToBottom'
		})
	},
	
	
})

var YeshareView = Backbone.View.extend({
		el:".pt-page-6",
	events: {
		'click .yes-button':'handleYesPhoto',
		'click .no-button':'handleYesPhoto'
			
	},

	initialize:function(obj){
		// MARIA YOU MIGHT HAVE TO FIX THESE 
		this.inputField = $('.email').find('input');
		this.img = $('.showimage');
	},

	handleYesPhoto:function(obj)
	{
		//console.log("handle no share")
		this.model.set({
			'currentpage':'.pt-page-6',
			'nextpage':'.pt-page-2',
			'nexttransition':'pt-page-moveFromTop',
			'currtransition':'pt-page-moveToBottom'
		})
	},
	
})




var TakePhotoView = Backbone.View.extend({

	el:".pt-page-2",
	initialize:function(){},
	events:{
		'click .take-photo':'handleStartPhoto'
	},

	handleStartPhoto:function(){
		this.model.set({
			'currentpage': '.pt-page-2',
			'nextpage':'.pt-page-3',
			'currtransition':'pt-page-moveToLeft',
			'nexttransition':'pt-page-moveFromRight'
		});

	},


	
	
})

var CountDownView = Backbone.View.extend({

	el:".countdown-container",

	initialize:function(obj)
	{
		this.counter = 3;
		this.hasStarted = false;
		this.classesToAdd =['pink','lime','orange','black','blue'];
		this.counterItem = $(this.el).find('.countdown');
		this.number = $(this.el).find('.number');
		this.myPage = '.pt-page-3';
		if(this.model){
			this.model.on('change:ready',this.handleReady,this);
		}
		
		this.prepare();
		//this.doAnimation();
	},

	handleReady:function(){

		var current = this.model.get('nextpage');
		var ready = this.model.get('ready')

		console.log(current+"STACEY YES HANDLE READY");
		//console.log(ready);
		if(current == this.myPage && ready =='1' && !this.hasStarted){

			this.doAnimation();
		}else{
			this.counter = 3;
			$(this.number).text(this.counter.toString());
			$('.click-text').addClass('hide');
		}
	},

	prepare:function(){

		$('.countdown img').removeClass("show hide").addClass('hide');
		$('.countdown p').removeClass("hide").addClass('show');
		
	},



	doAnimation:function(){

		//console.log("Countdown View : do aniamtion - start it");
		this.hasStarted = true;
		this.counter = 3;
		var sound = new Howl({
		 		 urls: ['/audio/beep.mp3']
		}).play();
		$(this.counterItem).addClass('animated zoomIn');
		$(this.counterItem).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',_.bind(this.onAnimationComplete, this));
		
		
	},
	onAnimationComplete:function(){

			//console.log("CounterView: onAnimationComplete");
            var newClass = this.classesToAdd[this.counter+1];
	    	$(this.el).removeClass('pink blue black orange ').addClass(newClass);
	    	console.log("CounterView : onAnimationComplete : counter var: "+this.counter);
	    	if(this.counter> -2){
	    		$(this.counterItem).removeClass('animated zoomIn');
				this.counter--;
				this.mySetID = setInterval(_.bind(this.onRestart, this), 100);
			}else{
			
			
		}
	},

	onRestart:function(){
		
		clearInterval(this.mySetID);
		//console.log("CountdownView : onRestart : counter var"+this.counter);
		var isLast = false;
		if(this.counter > -1){
			$('.countdown').addClass('animated zoomIn');
			$(this.number).text(this.counter.toString());
		}else if(this.counter==-1){
			
			$('.countdown img').removeClass("hide").addClass('show');
			$('.countdown p').addClass('hide').removeClass('animated zoomIn show');
			$('.countdown').addClass('animated zoomIn');
		} else if(this.counter==-2)
		{
			
			//console.log("CountdownView: onRestart : last Phase of -2");
			$(this.counterItem).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
			$('.click-text').removeClass('hide').addClass('show animated zoomIn');
			$('.click-text').removeClass('hide').addClass('show animated zoomIn');
			isLast = true;
			$('.click-text').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',_.bind(this.sendMessage, this));
			//$('.countdown').addClass('animated fadeOut');
		}

		if(isLast){
			var sound = new Howl({
		 		 urls: ['/audio/rocket.mp3']
		}).play();
		}else{
				var sound = new Howl({
		 		 urls: ['/audio/beep.mp3']
		}).play();


		}
	
	},

	sendMessage:function(){

		//console.log("stuff is going");
		this.hasStarted = false;
		$('.click-text').removeClass('animated zoomIn');
		console.log("CountdownView : sendMessage");
		$('.click-text').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
		
		$.ajax({
            url: '/takephoto',
            type: 'GET',
            dataType: 'json',
           
            contentType: 'application/json',

            complete: function() {
                console.log('CountdownView: complete : process complete');

            },
            success: _.bind(this.handleSuccess,this),
            error: function() {
                console.log('CountdownView: error: process error');
            }
        });
	
	},

	handleSuccess:function(data)
	{
		$('.showimage').attr('src',data.result);
			this.model.set({
			'currentpage': '.pt-page-3',
			'nextpage':'.pt-page-4',
			'currtransition':'pt-page-moveToLeft',
			'nexttransition':'pt-page-moveFromRight'
		});

	}
	,

	render:function()
	{
		//console.log("render");		
	},

	

	animateCounter:function(){


	}


});


var PageView = Backbone.View.extend({

	el:"body",
	initialize:function(){

		if (this.model) {
			this.model.on('change:nextpage', this.changePage, this);
		}
		this.isAnimating = false;

		this.pages = $( '.pt-page'),
		$(this.pages).each( function() {
			var $page = $( this );
			//console.log($page);
			$page.data( 'originalClassList', $page.attr( 'class' ) );
			//console.log($page.data('originalClassList' ))
		} );

		this.animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		this.animEndEventName = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		this.currentItem = 0,
		
		this.endCurrPage = false,
		this.endNextPage = false,

		this.pages =['pt-page-1','pt-page-2','pt-page-3','pt-page-4'];
		this.currentPage = this.pages[this.currentItem];

	},

	changePage:function(){

		if(this.isAnimating){return false;}
		this.model.set({
			'ready':'0'
		})
		this.isAnimating = true;
		this.currentPage = this.model.get('currentpage');
		this.nextPage = this.model.get('nextpage');
		$(this.nextPage).addClass('pt-page-current');

		//console.log(this.nextPage);

			var outClass = this.model.get('currtransition');
			var inClass = this.model.get('nexttransition');
		$(this.currentPage).addClass( outClass ).on( this.animEndEventName, _.bind(this.onEndCurrentPageTransition,this));
		$(this.nextPage).addClass( inClass ).on( this.animEndEventName, _.bind(this.onEndNextPageTransition,this));

	},

	onEndCurrentPageTransition:function(){
	
		$(this.currentPage).off( this.animEndEventName );
			this.endCurrPage = true;
			if( this.endNextPage ) {
				//console.log("end current has finished");
				//console.log(this.endNextPage)
				this.onEndAnimation( $(this.currentPage), $(this.nextPage ));
			}

	},
	onEndNextPageTransition:function(){
	
		$(this.nextPage).off( this.animEndEventName );
			
			this.endNextPage = true;
			//console.log("ON END NEXT");
			//console.log("current too? "+this.endCurrPage)
			if( this.endCurrPage ) {
				//console.log("end next page done");
				this.onEndAnimation( $(this.currentPage), $(this.nextPage ));
			}
	},


	onEndAnimation:function( outpage, inpage ) {
		this.endCurrPage = false;
		this.endNextPage = false;
		this.resetPage( outpage, inpage );
		this.isAnimating = false;

		this.model.set({
			'ready':'1'
		})
	},

	resetPage:function( outpage, inpage ) {
		//console.log("reset page")

		$(outpage).attr( 'class', $(outpage).data( 'originalClassList' ) );
		$(outpage).removeClass('pt-page-current');
		$(inpage).attr( 'class', $(inpage).data( 'originalClassList' ) + ' pt-page-current' );
	},

	render:function(){}


});





var PageModel = Backbone.Model.extend({
    initialize: function () {
        
	},

	defaults: {
		nextpage:null,
		currentpage:'pt-page-2',
		currtransition:'pt-page-moveToLeft',
		nexttransition:'pt-page-moveFromRight',
		ready:'0'
	}
});





////////////////////////////////////////////////
// Initialize everything /////////////////////
var mod = new PageModel();
var countdown = new CountDownView({model:mod});
var pagemanager = new PageView({model:mod});
var emailview = new EmailView({model:mod});
var takephoto = new TakePhotoView({model:mod});
var shareview = new ShareView({model:mod});
var noshare = new NoShareView({model:mod});
var yesshare = new YeshareView({model:mod});
var reviewview = new ReviewView({model:mod});
var smsview = new SMSView({model:mod})
var privacyview = new PrivacyView({model:mod})


var sendview = new SendView({model:mod});

function StarField(canvas_id, width, height, num_stars) {
  var width = width ? width : 600,
      height = height ? height : 600,
      origin_x = width / 2,
      origin_y = height / 2,
      stars = [],
      num_stars = num_stars ? num_stars : 50,
      canvas_id = canvas_id;

  function create_star() {
    var star = {};
    star.x = Math.random() * width - origin_x;
    star.y = Math.random() * height - origin_y;
    star.z = star.max_depth = Math.max(width, height);

    var xcoeff = star.x > 0 ? 1 : -1;
    var ycoeff = star.y > 0 ? 1 : -1;

    if (Math.abs(star.x) > Math.abs(star.y)) {
      star.dx = 1.0;
      star.dy = Math.abs(star.y / star.x);
    } else {
      star.dx = Math.abs(star.x / star.y);
      star.dy = 1.0;
    }

    star.dx *= xcoeff;
    star.dy *= ycoeff;
    star.dz = -1;

    star.ddx = .1 * star.dx;
    star.ddy = .1 * star.dy;

    star.width = 2;
    return star;
  }

  function move(star) {
    star.x += star.dx;
    star.y += star.dy;
    star.z += star.dz;

    star.dx += star.ddx;
    star.dy += star.ddy;

    star.width = 2 + ((star.max_depth - star.z) * .1);
  }

  function update_stars(ctx) {
    ctx.fillStyle = '#fff';
    for (var i = 0; i < stars.length; i++) {
      move(stars[i]);
      if (stars[i].x < -origin_x || stars[i].x > origin_x ||
          stars[i].y < -origin_y || stars[i].y > origin_y) {
        // remove
        stars[i] = create_star();
      } else {
        ctx.fillRect(
          stars[i].x + origin_x,
          stars[i].y + origin_y,
          stars[i].width,
          stars[i].width
        );
      }
    }
  }

  // drawing routine
  this.draw = function() {

    // get reference to drawing area
    var canvas = document.getElementById(canvas_id);

    if (canvas.getContext){

      // create drawing context
      var ctx = canvas.getContext('2d');

      // fill black
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      update_stars(ctx);
    }

    // repeat
    t = setTimeout(_.bind(this.draw,this), 30);
  }

  for (var i=0; i < num_stars; i++) {
    stars.push(create_star());
  }

  return this;
}

var star = new StarField('stars', 1600,600, 50);
star.draw();