class ValidateSystem {
	constructor() {
		this.searchTerm = $(".srchtext");
		this.events();
	}
	
	events() {
		this.searchTerm.keyup(this.valText);
	}
	
	valText(theEvent) {
		this.txt = $(".srchtext").val();
		this.srchbtn = $(".btn-search");
		this.check = this.txt.match(/\S+/);
				
		if (this.check != null && this.check.length > 0) {
			if ((this.srchbtn).hasClass("disabled")) {
				this.srchbtn.removeClass("disabled");
			}
			console.log("validation called on " + this.txt + " true" );
			if (theEvent.keyCode == 13) {
				console.log("ya Return pressed");
				this.srchbtn.trigger("click");
		    }
		} else {
			if (!(this.srchbtn).hasClass("disabled")) {
				this.srchbtn.addClass("disabled");
			}
			console.log("validation called on " + this.txt + " false" );
		}
		
	}
}

export default ValidateSystem;