document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const scanBtn = document.getElementById('scan-btn');
    const resultDiv = document.getElementById('result');

    let mediaStream = null;

    // Request access to the camera and start streaming video
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            mediaStream = stream;
            video.srcObject = stream;
        })
        .catch(function(err) {
            console.error('Error accessing the camera:', err);
        });

    // When the video starts playing, set the canvas dimensions
    video.addEventListener('playing', function() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        scanBtn.addEventListener('click', () => {
            scanQRCode(context, canvas);
        });
    });

    function scanQRCode(context, canvas) {
        try {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                resultDiv.innerText = 'QR Code/Barcode: ' + code.data;
            } else {
                resultDiv.innerText = 'No QR Code/Barcode detected.';
            }
        } catch (err) {
            resultDiv.innerText = 'An error occurred: ' + err;
        }
    }

    // Add a listener to stop the video stream when leaving the page
    window.addEventListener('beforeunload', () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach((track) => {
                track.stop();
            });
        }
    });
});
