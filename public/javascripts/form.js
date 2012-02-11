$(function() {
    $("label").inFieldLabels().each(
      function() {
	var inFieldLabel = $(this).data('InFieldLabels');
	$.extend(this, {setOpacity: function(opacity) { inFieldLabel.setOpacity(opacity); }});
	// monkey-patch in-field labels to go away when a field is invalid
	$.extend(inFieldLabel,
		 {
		   origCheckForEmpty: inFieldLabel.checkForEmpty,
		   checkForEmpty: function(blur) {
		     if (inFieldLabel.$field.hasClass('error')) {
		       this.setOpacity(0.0);
		     } else {
		       this.origCheckForEmpty(blur);
		     }
		   }
		 });
      });
    $('#proposal-form').validate(
      {
	focusCleanup: true,
	focusInvalid: false,
	rules: {
	  name: {
	    required: true,
	    maxlength: 256
	  },
	  email: {
	    required: true,
	    maxlength: 256,
	    email: true
	  },
	  twitter: {
	    maxlength: 20
	  },
	  bio: {
	    maxlength: 32000
	  },
	  title: {
	    required: true,
	    maxlength: 256
	  },
	  abstract: {
	    required: true,
	    maxlength: 32000
	  },
	  notes: {
	    maxlength: 32000
	  }
	},
	messages: {
	  name: {
	    required: "We need to know who you are!"
	  },
	  email: {
	    required: "We need to be able to contact you!"
	  },
	  title: {
	    required: "Every talk needs a snappy title!",
	  },
	  abstract: {
	    required: "We need a few more details than that!"
	  }
	},
	onkeyup: function() {
	},
	invalidHandler: function(event, validator) {
	  for (var key in validator.errorMap) {
	    $('label[for="' + key + '"]').each(
	      function(idx, elem) {
		$(elem).each(
		  function() {
		    if (this.setOpacity) {
		      this.setOpacity(0.0);
		    }
		  });
	      });
	  }
	  return true;
	}
      });
  });
