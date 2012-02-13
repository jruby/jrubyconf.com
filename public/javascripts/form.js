$(function() {
      $("label").inFieldLabels();
      var labelTop = parseFloat($($('label[for="name"]')[0]).css('top'));
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
		      required: "We need to be able to contact you!",
		      email: "That doesn't look like an email address!"
		  },
		  title: {
		      required: "Every talk needs a snappy title!"
		  },
		  abstract: {
		      required: "We need a few more details than that!"
		  }
	      },
	      onkeyup: function() {
	      },
	      showErrors: function(errorMap) {
		  var result = this.defaultShowErrors();
		  for (var key in errorMap) {
		      $('#' + key + '+label.error').each(
			  function(idx, elem) {
			      var errorLabel = $(elem);
			      var input = $(elem.previousSibling);
			      errorLabel.css({
						 top: "" + (labelTop + input.height() - errorLabel.height()) + "px",
						 left: "" + (input.width() - errorLabel.width()) + "px"
					     });
			  });
		  }
		  $('span.error').each(function(i, elem) { $(elem).show(); });
		  return result;
	      }
	  });
  });
