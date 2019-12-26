$(document).ready(function () {
    
    $("#registerForm").validate(
        {
        onkeyup: false,
        onfocusout: false,
        groups: {
            dobGroup: "dobMonth dobDay dobYear"
        },
        rules: {
            // simple rule, converted to {required:true}
            firstName: {
                required: true,
                lettersonly: true
            },
            lastName:{
                lettersonly: true
            },
            // compound rule
            emailAddress: {
                required: true,
                email: true
            },
            password:{
                required: true,
                pwcheck:true,
                minlength: 8
            },
            confirmPassword:{
                equalTo : "#password"
            },
            dobMonth:{
                required:true,
                validateBirthDate:true
            },
            dobDay:{
                required:true,
                validateBirthDate:true
            },
            dobYear:{
                required:true,
                validateBirthDate:true
            },
            phoneNumber:{
                required:true,
                phoneUSCan:true
            },
            zipCode:{
                required:true,
                uscanZip:true
            },
            terms:{
                required:true
            }
        },
        messages: {
            firstName: {
                required:"Please enter your First Name",
                lettersonly: "Invalid First Name"
            },
            lastName:{
                lettersonly: "Invalid Last Name"
            },
            emailAddress: {
                required: "Please enter your Email Address",
                email: "Invalid Email Address"
            },
            password:{
                required: "Password is required to register",
            },
            confirmPassword:{
                equalTo : "Password don't match"
            },
            dobMonth:{
                required:"Invalid Birth date"
            },
            dobDay:{
                required:"Invalid Birth date"
            },
            dobYear:{
                required:"Invalid Birth date"
            },
            phoneNumber:{
                required:"Please enter your Phone Number"
            },
            zipCode:{
                required:"Please enter your zip/postalcode"
            },
            terms:{
                required:"You must accept the terms & conditions and privacy policy"
            }
        },
        errorContainer: "#errordiv ul",
        errorLabelContainer: "#errordiv ul",
        wrapper: "li",
        errorElement: 'span',
        highlight: function(element) {
            if($("#errordiv p").length==0)
                $("<p class='errorHeading'>The following errors have occured</p>").insertBefore("#errordiv ul");
            $("form div:first-child p").addClass("error")
            $(element).addClass("error");
    
            $(element.form).find("label[for=" + element.id + "]")
                           .addClass("error");
         },
         unhighlight: function(element, errorClass) {
            $(element).removeClass("error");
            $(element.form).find("label[for=" + element.id + "]")
                           .removeClass("error");
         },
         submitHandler: function(form, event) { 
            $("form div:first-child p").removeClass("error");
            if($("#errordiv p").length>0)
                $("#errordiv p").remove(); 
            event.preventDefault();
             console.log($(form).serialize())
              alert("Stopped form submit here. Please check serialized form data in console.This will go to back end");
            }
    });
    $.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-z\s]+$/i.test(value);
    }, "Invalid first name");
    $.validator.addMethod("pwcheck", function(value) {
        return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
            && /[A-Z]/.test(value) //has uppercase letter
     }, "Must contain one lowercase,one uppercase and one digit, accepts only *,@,.,-,!,=");
     $.validator.addMethod("phoneUSCan", function(value, element) {
        value = value.replace(/\s+/g, "");
        return this.optional(element) || value.length > 9 && 
        value.match(/^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$$/);
    }, "Invalid Phone Number");
    $.validator.addMethod("uscanZip", function(value, element) {
        var selectedCountry=$("input[name='country']:checked").val();
        var regEx=/^\d{5}(?:[-\s]\d{4})?$/;
        if(selectedCountry=="Can")
            regEx=/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        value = value.replace(/\s+/g, "");
        return regEx.test(value);
    }, "Invalid Phone Number");

    $.validator.addMethod("validateBirthDate", function(value, element) {
    let year=$("#dobYear").val();
    let month=$("#dobMonth").val();
    let date=$("#dobDay").val();
    let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;
        if( date > 0 && date <= monthLength[month - 1])
            return true;
    },"Invalid Birth date");
    $(".birthdatePromo").click(function(){
        
        positionTipElement()
    });
    $(".birthdayTip").click(function(){
        $(this).hide();
    })
   function positionTipElement()
    {
        var $parentPos=$(".birthdatePromo").position();
        $(".birthdayTip").css({
            top:$parentPos.top-$(".birthdayTip").outerHeight()-($(".birthdatePromo").outerHeight()/2),
            left:$parentPos.left-$(".birthdayTip").width(),
        })
        $(".birthdayTip").show();
    }
    $("select").change(function(){
        ($(this).val()!=="")?$(this).addClass("valueSelected"):$(this).removeClass("valueSelected");
    
    });
    new Cleave('#phoneNumber', {
        numericOnly: true,
        blocks: [0, 3, 0, 3, 4],
        delimiters: ["(", ")", " ", "-"]
    });
})