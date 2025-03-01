//----------------------------------------------------------------------------//
// Nav Menu                                                                   //
//----------------------------------------------------------------------------//
$(function()
{

    $('.btn-nav-toggle').bind('click', function () {
        $('body').toggleClass('nav-open');
    });

    $('.oj-nav ul li a').bind('click', function () {
        $('body').removeClass('nav-open');
    });

});

//----------------------------------------------------------------------------//
// Video Container                                                            //
//----------------------------------------------------------------------------//
$(function()
{

	$('.oj-video-container .oj-video-poster').on('click', function() {

		var container = $(this).parent();
		var frame = container.find('.oj-video-frame');
		var poster = container.find('.oj-video-poster');

		container.addClass('oj-video-open');
		frame.prepend('<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/500935971?autoplay=1&loop=1&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>');

	})

});

//----------------------------------------------------------------------------//
// Register Form                                                              //
//----------------------------------------------------------------------------//

$(function()
{

	$('.oj-form-toggle-option').on('click', function() {

		var value = $(this).attr('data-value');

		$('.oj-form-toggle-input').attr('value', value);

	})


	////////////////////////////////////////////////////////////////////////////////

	var $form              = $('#oj-register-form');
	var $inputs            = $form.find ('.form-control');
	var $email             = $form.find ('.form-control[name=Email]');
	var $button            = $form.find ('.oj-btn-submit');
	var errorState         = false;

	////////////////////////////////////////////////////////////////////////////////

	function isEmail(email) {

		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if(!regex.test(email))
		{
			return false;
		}

		else
		{
			return true;
		}
	}

	$inputs.blur (function()
	{
		if (!$(this).val())
		{
			$(this).removeClass ('is-valid').addClass ('is-invalid');
		}

		else
		{
			$(this).removeClass ('is-invalid').addClass ('is-valid');
		}
	});

	$email.blur (function()
	{
		if (!isEmail ($(this).val()))
		{
			$(this).removeClass ('is-valid').addClass ('is-invalid');
		}

		else
		{
			$(this).removeClass ('is-invalid').addClass ('is-valid');
		}

	});

	$form.submit (function(e)
	{
		// prevent default submit behaviour
		e.preventDefault();

		// reset error state
		errorState = false;

		// check for empty fields
		$inputs.each (function()
		{
			if (!$(this).val())
			{
				$(this).removeClass ('is-valid').addClass ('is-invalid');
				errorState = true;
			}

			else
			{
				$(this).removeClass ('is-invalid').addClass ('is-valid');
			}
		});

		// check whether email is valid
		if (!isEmail ($email.val()))
		{
			$email.removeClass ('is-valid').addClass ('is-invalid');
			errorState = true;
		}

		else
		{
			$email.removeClass ('is-invalid').addClass ('is-valid');
		}

		// if form has errors
		if (errorState)
			return false;

		// now we do ajax
		// get form
		var form = $('#oj-register-form')[0];

		// create an FormData object 
		var data = new FormData(form);

		// prevent duplicate submissions
		$form.find('.oj-btn-submit').prop('disabled', true);

		// do a barrel roll

		//gtag('event', 'conversion', {'send_to': 'AW-755396735/ylHBCKzzuZ0BEP_gmegC'});
		gtag('event', 'Signup', {'event_category': "Conversions", 'event_label': "CompleteRegistration", 'value': "0"});
		fbq('track', 'CompleteRegistration');

		$.ajax({
			type: "POST",
			enctype: 'multipart/form-data',
			url: "/register.php",
			data: data,
			processData: false,
			contentType: false,
			cache: false,
			timeout: 800000,
			success: function (data) {

				$form.addClass('oj-success');

			},
			error: function (e) {

				console.log("ERROR : ", e);

				$form.addClass('oj-error');

			}
		});

	});

});


//----------------------------------------------------------------------------//
// Footer Mailing List Form                                                   //
//----------------------------------------------------------------------------//

$(function()
{

	////////////////////////////////////////////////////////////////////////////////

	var $form              = $('#oj-footer-form');
	var $email             = $form.find ('.form-control[name=Email]');
	var $checkbox          = $form.find ('.form-check-input[name=consent]');
	var $button            = $form.find ('.oj-btn-submit');
	var errorState         = false;

	////////////////////////////////////////////////////////////////////////////////

	function isEmail(email) {

		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if(!regex.test(email))
		{
			return false;
		}

		else
		{
			return true;
		}
	}

	$form.submit (function(e)
	{
		// prevent default submit behaviour
		e.preventDefault();

		// reset error state
		errorState = false;

		// check whether email is valid
		if (!isEmail ($email.val()))
		{
			$email.removeClass ('is-valid').addClass ('is-invalid');
			errorState = true;
		}

		else
		{
			$email.removeClass ('is-invalid').addClass ('is-valid');
		}

		// check whether consent checkbox is checked
		if ($checkbox.prop('checked')!=true)
		{
			$checkbox.removeClass ('is-valid').addClass ('is-invalid');
			errorState = true;
		}
		else
		{
			$checkbox.removeClass ('is-invalid');
		}

		// if form has errors
		if (errorState)
			return false;

		// now we do ajax
		// get form
		var form = $('#oj-footer-form')[0];

		// create an FormData object 
		var data = new FormData(form);

		// prevent duplicate submissions
		$form.find('.oj-btn-submit').prop('disabled', true);

		// do a barrel roll
		$.ajax({
			type: "POST",
			enctype: 'multipart/form-data',
			url: "/register.php",
			data: data,
			processData: false,
			contentType: false,
			cache: false,
			timeout: 800000,
			success: function (data) {

				$form.addClass('oj-success');

			},
			error: function (e) {

				console.log("ERROR : ", e);

				$form.addClass('oj-error');

			}
		});

	});

});

//----------------------------------------------------------------------------//
// ScrollMagic Animation incl. Lazy Load                                      //
//----------------------------------------------------------------------------//

$(function()
{

	function lazyLoad() {

		$('.ec-lazy').each(function () {

			var $this = $(this);

			new ScrollMagic.Scene
			({
				triggerElement: this,
				triggerHook: 1,
				offset: -100
			})
			.on("enter", function () {
				$this.removeClass('ec-lazy');
				$this.attr({
					src:    $this.attr('data-src'),
					srcset: $this.attr('data-srcset'),
					poster: $this.attr('data-poster')
				});
				$this.removeAttr('data-src data-srcset data-poster');
			})
			.addTo(controller);
		});
	};

	function stickyNav() {

		new ScrollMagic.Scene
		({
			triggerElement: 'body', triggerHook: 0, offset: 60
		})
		.setClassToggle('.oj-navbar', 'oj-shown')
		.addTo(controller);

	}

	// Create an instance of the Scroll Magic Controller
	let controller = new ScrollMagic.Controller();

	lazyLoad();
	stickyNav();

	$('.ec-animated-section').each(function () {

		var $this = $(this);

		new ScrollMagic.Scene
		({
			triggerElement: this, triggerHook: 0.5, reverse: false
		})
		.setClassToggle(this, 'ec-animated')
		.addTo(controller);
	});

});