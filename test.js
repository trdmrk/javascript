<script type="text/javascript">
//<![CDATA[
    var roulette2 = {
    	isToggle : false,
    	isPeriod : 0,
        leftToken2 : 9999,
        result : null,
        goSpin2 : function () {
        	if (1 > 0) {
        		/*if (roulette2.isPeriod < 1) {
        			alert("Masa event telah berakhir.");
        			return;
        		}*/
        		if (roulette2.leftToken2 > 0) {
        			$(".dim_block").show();

	               	$.ajax({
	            	    url: "/event/roulette2/process",
	        			dataType : "json",
	        			type: "GET",
	        			//data:  "idx="+ idx,
	        			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	        			success: function (data) {
	        				setTimeout(function() {
							if (data != null && data.resultCode != null) {
								$(".win").hide();
								$(".losing").hide();
								
								roulette2.result = data;
								
	        					if (parseInt(data.resultCode) == 1) {
	        						startSpin();
	        						//$(".win").show();
	                                roulette2.leftToken2 = roulette2.leftToken2 - 1;
	                                $("#leftToken2").html(roulette2.leftToken2);
	        					}
	        					else if (parseInt(data.resultCode) == 1) {
	        						startSpin();
	        						//$(".losing").show();
	        						roulette2.leftToken2 = roulette2.leftToken2 - 1;
	        						$("#leftToken2").html(roulette2.leftToken2);
	        					}
	        					else if (parseInt(data.resultCode) < 0) {
	        						alert("Kesempatan sudah habis.");
	        						$(".pop_result").hide();
	        					}
	        					else {
	        						alert("Terjadi sebuah kesalahan.");
	        						$(".pop_result").hide();
	        					}
	        				}else {
	        					alert("Terjadi sebuah kesalahan.");
	        					$(".pop_result").hide();
	        				}	
	        				}, 1000);
	        				
	        			}, error: function(xhr, status, error) {
	        				alert("status=" + xhr.status + "\nreadyState=" + xhr.readyState);
	        				$(".pop_box_result").hide();
	        			}
	        		});
	            }
	            else {
	            	alert("Kesempatan sudah habis.");
	            }
        	}
        	else {
        		alert("Login dibutuhkan.");
        		openLayerPopup("login");
        	}
		}
    };
   
    function setResult() {
    	$("#voucher").html(roulette2.result.voucher).hide();
    	$("#voucher_notice").hide();
    	if (parseInt(roulette2.result.resultCode) == 1) {
    		switch (parseInt(roulette2.result.prizeCode)) {
        	case 1: 
        		$("#prize_name").html("Tiket pesawat + Hotel PBWC 2019");
        		$("#prize_image").attr("src", "/images/event/2018/03_roulette2/prize_ticket.png");
        		$("#prize_image").attr("alt", "Tiket pesawat + Hotel PBWC 2019");
        		break;
        	case 2: 
        		$("#prize_name").html("Custom Point Blank Bike Helmet");
        		$("#prize_image").attr("src", "/images/event/2018/03_roulette2/prize_helmet.png");
        		$("#prize_image").attr("alt", "Custom Point Blank Bike Helmet");
        		break;
        	case 3: 
        		$("#prize_name").html("Custom Point Blank Bike Jacket");
        		$("#prize_image").attr("src", "/images/event/2018/03_roulette2/prize_jacket.png");
        		$("#prize_image").attr("alt", "Custom Point Blank Bike Jacket");
        		break;
        	case 4: 
        		$("#prize_name").html("Custom Point Blank T-shirts");
        		$("#prize_image").attr("src", "/images/event/2018/03_roulette2/prize_tshirts.png");
        		$("#prize_image").attr("alt", "Point Blank T-shirts");
        		break;
        	case 5: 
        		$("#prize_name").html("Custom Point Blank Cap");
        		$("#prize_image").attr("src", "/images/event/2018/03_roulette2/prize_cap.png");
        		$("#prize_image").attr("alt", "Point Blank Hat");
        		break;
        	case 6: 
        		$("#prize_name").html("PB Helmet in game 3D");
        		$("#prize_image").attr("src", "/images/event/2018/03_roulette2/prize_helmet_3d.png");
        		$("#prize_image").attr("alt", "PB Helmet in game 3D");
        		$("#voucher").html(roulette2.result.voucher).show();
	    		$("#voucher_notice").show();
        		break;
        	case 7: 
        		$("#prize_name").html("PB Helmet in game 7D");
        		$("#prize_image").attr("src", "/images/event/2018/03_roulette2/prize_helmet_7d.png");
        		$("#prize_image").attr("alt", "PB Helmet in game 7D");
        		$("#voucher").html(roulette2.result.voucher).show();
	    		$("#voucher_notice").show();
        		break;
        	case 8: 
        		$("#prize_name").html("PB Helmet in game 30D");
        		$("#prize_image").attr("src", "/images/event/2018/03_roulette2/prize_helmet_30d.png");
        		$("#prize_image").attr("alt", "PB Helmet in game 30D");
        		$("#voucher").html(roulette2.result.voucher).show();
	    		$("#voucher_notice").show();
        		break;
        	}
    		$(".win").show();
    	}
    	else {
    		$(".losing").show();
    	}
    	$(".dim_block").hide();
    	$(".pop_result").show();
    	
    	resetWheel();
    }
    
    function setPrizeList() {
       	$.ajax({
    	    url: "/event/roulette2/prize",
			dataType : "json",
			type: "GET",
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			success: function (data) {
				$("#tbPrize").html("");
				if (data != null && data.length > 0) {
					for (var i = 0; i < data.length; i++) {
                        var row = data[i];
    					
    					$("#tbPrize").append("<li><p class=\"date\">"+row.date+"</p><p class=\"item\">"+row.prize+"</p>");
					}
				}else {
					$("#tbPrize").append("<li class=\"none\">Tidak ada hasil kemenangan.</li>");
				}	
				$(".pop_prize").show();
			}, error: function(xhr, status, error) {
				alert("status=" + xhr.status + "\nreadyState=" + xhr.readyState);
			}
		});
    }
    
	$(window).on("load", function() {
		$("a.pop_close").on("click",function() {
			$(".pop_box_result").hide();
			$(".win").hide();
			$(".losing").hide();
			
		});
		$("#prizeClose").click(function() {
			$(".pop_box_result_list").hide();
			$("#tbPrize").empty();
		});

		$(".pop_result .dimmed, .pop_result button").on("click",function() {
			$(".pop_result").hide();
		});
		$(".pop_prize .dimmed, .pop_prize button").on("click",function() {
			$(".pop_prize").hide();
		});
	});
	
	 // Create new wheel object specifying the parameters at creation time.
    let theWheel = new Winwheel({
        'numSegments' : 8,         // Specify number of segments.
        'outerRadius' : 252,       // Set outer radius so wheel fits inside the background.
        'drawMode'  : 'image',   // drawMode must be set to image.
        'drawText' : true,      // Need to set this true if want code-drawn text on image wheels.
        'textFontSize' : 0,        // Set text options as desired.
        'textOrientation' : 'curved',
        'textDirection' : 'reversed',
        'textAlignment' : 'outer',
        'textMargin' : 5,
        'textFontFamily' : 'Teko',
        'textStrokeStyle' : 'black',
        'textLineWidth' : 2,
        'textFillStyle' : 'white',
        'segments' :                // Define segments.
        [
            {'text' : 'Ticket'},
            {'text' : 'Custom Point Blank Bike Helmet'},
            {'text' : 'Custom Point Blank Bike Jaket'},
            {'text' : 'Custom Point Blank T-shirts'},
            {'text' : 'Custom Point Blank Cap'},
            {'text' : 'Ingame Item Helmet 3D'},
            {'text' : 'Ingame Item Helmet 7D'},
            {'text' : 'Ingame Item Helmet 30D'}
        ],
        'animation' :                   // Specify the animation to use.
        {
            'type'     : 'spinToStop',
            'duration' : 5,     // Duration in seconds.
            'spins'    : 12,     // Number of complete spins.
            'callbackFinished' : setResult
        }
    });

    // Create new image object in memory.
    let loadedImg = new Image();

    // Create callback to execute once the image has finished loading.
    loadedImg.onload = function()
    {
        theWheel.wheelImage = loadedImg;    // Make wheelImage equal the loaded image object.
        theWheel.draw();                    // Also call draw function to render the wheel.
    }

    // Set the image source, once complete this will trigger the onLoad callback (above).
    loadedImg.src = "/images/event/2018/03_roulette2/roulette2.png";

    // Vars used by the code in this page to do power controls.
    let wheelPower    = 0;
    let wheelSpinning = false;
  
    // -------------------------------------------------------
    // Click handler for spin button.
    // -------------------------------------------------------
    function startSpin()
    {
        // Ensure that spinning can't be clicked again while already running.
        if (wheelSpinning == false) {
            // Based on the power level selected adjust the number of spins for the wheel, the more times is has
            // to rotate with the duration of the animation the quicker the wheel spins.
            if (wheelPower == 1) {
                theWheel.animation.spins = 2;
            } else if (wheelPower == 2) {
                theWheel.animation.spins = 5;
            } else if (wheelPower == 3) {
                theWheel.animation.spins = 8;
            }

            // Disable the spin button so can't click again while wheel is spinning.
            document.getElementById('spin_button').src       = "spin_off.png";
            document.getElementById('spin_button').className = "";

          	//prize setting;
          	if (parseInt(roulette2.result.resultCode) == 1) {
            	theWheel.animation.stopAngle = roulette2.result.angle;
          	}
          	else {
          		theWheel.animation.stopAngle = 340;
          	}
            // Begin the spin animation by calling startAnimation on the wheel object.
            theWheel.startAnimation();

            // Set to true so that power can't be changed and spin button re-enabled during
            // the current animation. The user will have to reset before spinning again.
            wheelSpinning = true;
        }
    }

    // -------------------------------------------------------
    // Function for reset button.
    // -------------------------------------------------------
    function resetWheel()
    {
        theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
        theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
        theWheel.draw();                // Call draw to render changes to the wheel.

        /*document.getElementById('pw1').className = "";  // Remove all colours from the power level indicators.
        document.getElementById('pw2').className = "";
        document.getElementById('pw3').className = "";*/

        wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
    }
//]]>
</script>
