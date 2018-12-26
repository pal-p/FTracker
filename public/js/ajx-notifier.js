$(document).ready(function(){
    $('.acc_del').click(function(e){
      e.preventDefault();
      var url =$(this).attr('href') ;
  swal({
    title: "Are you sure?",
    text: "Once deleted Account cannot be recovered.",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, Delete it!",
    cancelButtonText: "No, cancel please!",
    closeOnConfirm: false,
    closeOnCancel: false
  },
  function(isConfirm){
    if (isConfirm) {
      $.ajax({
        type: 'DELETE',
        url: url,
        success: function(res){
          window.location.reload();
          swal('Success ');
        },
        error: function(err){
          console.log(err);
          swal("SOME WIERD ERROR OCCURED", "Your Account file is Not Deleted ", "error");
        }
  });
    } else {
      swal("Cancelled", "Your Account is safe :)", "error");
    }
  });
    });

  function validateAccountName(el) {
    var accNameVal = el.val();
    if (accNameVal != '') {
      $.ajax({
        url: '/account/chk-account-exist',
        data: { acc_name: accNameVal },
        success: function (res) {
          if (res.acc_exists != undefined && res.acc_exists == 1) {
            $('.acc-name-inp').val('');
            $('.acc-create-btn').attr('disabled', true);
            swal("Account Name Exists, please select other name ", '', "error");
          }
          else {
            $('.acc-create-btn').attr('disabled', false);
          }
        },
        error: function (err) {
          console.log(err);
        }
      });
    }
  }
    $('.acc-name-inp').focusout(function(){
     validateAccountName($(this));
    });

    $('.acc-name-inp').focus(function(){
      $('.acc-create-btn').attr('disabled',false);
    });
  });