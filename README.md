# Flickr-Photo-Stream-Webpage
Flickr Photo Stream

Javascript and Twitter Bootstrap example of accessing the Flickr API.
JQuery.ajax call on the FLickr method of flickr.photos.search.

		$.ajax({
		    url: 'https://api.flickr.com/services/rest/',
  			//jsonp: 'jsonp',
		    //dataType: 'jsonp',
		    data: {
			    method: 'flickr.photos.search',
			    api_key: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
				per_page: '9',
				page: this.pageNum,
				extras: 'url_o',
				tags: this.tags,
				safe_search: '1',
			  format: 'json'
		    },
        
  		  success: function(response) {
			    var res = JSON.parse(response.slice(14, response.length - 1));

			    if (res.photos.total > 8) {
				    $(".key-image").each(function(cnt) {
					    $(this).attr('src', "https://farm" + res.photos.photo[cnt].farm + ".staticflickr.com/" + res.photos.photo[cnt].server + "/" + res.photos.photo[cnt].id + "_" + res.photos.photo[cnt].secret + "_n.jpg" );
					    $(this).next().text(res.photos.photo[cnt].title);
				    });
				    $(".res-info").text("");
			    } else {
				    $(".res-info").text("Sorry, No results found.");
			    }
        },
        
			  error: function (jqXHR, exception) {
          console.log('error: status ' + jqXHR.status + ' response ' + exception);
			    $(".res-info").text("Sorry, No results found.");
        }
		});
