function saSuccess(messageHeader, messageBody, redirectTo) {
    swal({
        title: messageHeader, 
        text: messageBody, 
        type: "success"
    }, function() {
        window.location.href = redirectTo;
    });
}

function saWarning(messageHeader, messageBody) {
    swal({   
        title: messageHeader,   
        text: messageBody,   
        type: "warning"
    });
}