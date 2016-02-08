'use strict';

(function() {
    
    var fileForm = document.getElementById("file-form");
    var fileSelector = document.querySelector("input.file-selector");
    var submitBtn = document.querySelector("input.submit-entry");
    var interaction = document.getElementById("interaction");
    var reqUrl = "";

    
    function sendAjax(data, next) {
        var link = appUrl + "/uploads/";
        reqUrl = link;
        ajaxFunctions.ajaxRequest("POST", link, data, next);
    }
    
    function displayResult(res) {
        
        var myNode = document.getElementById("interaction");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        
        var resObj = JSON.parse(res);
        var para = document.createElement("p");
        var resWindow = document.createElement("pre");
        var codeFormat = document.createElement("code");
        resWindow.id = "resWindow";
        codeFormat.id = "codeFormat";
        interaction.appendChild(para).innerHTML = "Request URL:";
        interaction.appendChild(resWindow);
        document.getElementById("resWindow").appendChild(codeFormat);
        document.getElementById("codeFormat").innerHTML = reqUrl;
        
        var para2 = document.createElement("p");
        var resWindow2 = document.createElement("pre");
        var codeFormat2 = document.createElement("code");
        resWindow2.id = "resWindow2";
        codeFormat2.id = "codeFormat2";
        interaction.appendChild(para2).innerHTML = "Response in JSON format:";
        interaction.appendChild(resWindow2);
        document.getElementById("resWindow2").appendChild(codeFormat2);
        document.getElementById("codeFormat2").innerHTML = JSON.stringify(resObj, null, 4);
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        
        fileForm.addEventListener("submit", function(e) {
            e.preventDefault();
            var formData = new FormData(fileForm);
            sendAjax(formData, displayResult);
        });
        
    });
    
})();


