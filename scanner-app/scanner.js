$(document).ready(function() {
  let scanner; // Declare the scanner variable
  
  // Function to check if the 'reader' element exists
  function checkForReaderElement() {
      if ($('#reader').length) {
          clearInterval(checkForReaderInterval); // Stop the interval
          initializeScanner();
      }
  }

  // Function to initialize the scanner
  function initializeScanner() {
      scanner = new Html5QrcodeScanner('reader', {
          qrbox: {
              width: 250,
              height: 250,
          },
          fps: 20,
      });
      
      scanner.render(success, error);
  }

  $("#btnScanOPEN").click(function() {
    $(".box-reader").css("display","flex");
    var newDiv = $('<div></div>').attr('id', 'reader');
    newDiv.appendTo(".box-reader");
    checkForReaderInterval = setInterval(checkForReaderElement, 300);

  });

  $("#btnScanCLOSE").click(function() {
    $(".box-reader").css("display","none");
    scanner.clear();
    scanner.stop().then(function() {
        $('#reader').remove();
    });
  });

  function success(result) {
      $("#inputUPC").val(result);
      $(".box-reader").css("display","none");
      scanner.clear();
      scanner.stop().then(function() {
          $('#reader').remove();
      });
  }

  function error(err) {
      console.error(err);
  }
});