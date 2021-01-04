function typeWriter(element, txt) {
    return new Promise (function(resolve,reject) {
        if (txt.length > 1) {
            element.textContent += txt.charAt(0);
            var newText = txt.slice(1,txt.length);
            setTimeout(typeWriter, 150, element, newText);
        } else {
            element.textContent += txt.charAt(0);
            resolve();
        }
    })
}

async function runThis() {
    var line1 = document.getElementById("line1");
    await typeWriter(line1, "papupa");
    console.log("waiting over")
    document.body.style.backgroundColor = "blue";
}