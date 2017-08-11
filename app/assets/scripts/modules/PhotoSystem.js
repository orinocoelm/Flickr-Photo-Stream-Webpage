class PhotoSystem {
     
    constructor() {
	    this.searchBtn = $(".btn-search");
	    this.events();
	  }
	
	  events() {
	    this.searchBtn.click(this.getPhotos.bind(this));
	  }
	  
	  getPhotos() {
		this.tags = $(".srchtext").val();
		this.pageNum = $(".pages-input").val();
		console.log("getPhotos called" + $(".srchtext").val());
		if (this.searchBtn.hasClass("disabled")) {
				return;
			}
		if (!(this.pageNum.valueOf() > 0 && this.pageNum.valueOf() < 1000)) {
			this.pageNum = '1';
		}
		this.tags = this.tags.match(/\S+/g).join(', ');
		$.ajax({
		    url: 'https://api.flickr.com/services/rest/',
			//jsonp: 'jsonp',
		    //dataType: 'jsonp',
		    data: {
			    method: 'flickr.photos.search',
			    api_key: '2a546f205c0733cc736e88c9799d9059',
				per_page: '9',
				page: this.pageNum,
				extras: 'url_o',
				tags: this.tags,
				safe_search: '1',
			    format: 'json'
		    },
  		    success: function(response) {
			  var res = JSON.parse(response.slice(14, response.length - 1));
			  console.log("the response was " + response);
			  if (res.photos.total > 8) {
				  $(".key-image").each(function(cnt) {
					$(this).attr('src', "https://farm" + res.photos.photo[cnt].farm + ".staticflickr.com/" + res.photos.photo[cnt].server + "/" + res.photos.photo[cnt].id + "_" + res.photos.photo[cnt].secret + "_n.jpg" );
					$(this).next().text(res.photos.photo[cnt].title);
				  });
				  $(".res-info").text("");
				  console.log("https://farm" + res.photos.photo[0].farm + ".staticflickr.com/" + res.photos.photo[0].server + "/" + res.photos.photo[0].id + "_" + res.photos.photo[0].secret + ".jpg");
			  } else {
				  console.log("not enough photos returned to populate grid");
				  $(".res-info").text("Sorry, No results found.");
			  }
            },
			error: function (jqXHR, exception) {
              console.log('error: status ' + jqXHR.status + ' response ' + exception);
            }
		});
		  
	  }
	  
	  
	  
	
}
  
//  var quoteSystem = new QuoteSystem();

export default PhotoSystem;