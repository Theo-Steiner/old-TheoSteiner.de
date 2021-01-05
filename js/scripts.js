
// RESPONSIVE MENU! WORKING AS INTENDED
// @todo CHANGE TO TAILWND STYLES

var menuIsOpen = false;
var backgroundCounter = 0;
var nav = document.querySelector("nav");
var navBG = document.getElementById("navBG");
var burgerMenu = document.getElementById("burgerMenu");
var crossMenu = document.getElementById("crossMenu");
var navLinks = document.getElementById("navLinks");

function onMenuClick() {
    if(!menuIsOpen) {
        nav.onclick = closeOnBackgroundClick;
        burgerMenu.style.display = "none";
        navLinks.style.display = "block";
        crossMenu.style.display = "block";
        navBG.classList.remove("hidden");
        menuIsOpen = true;
    } else {
        crossMenu.style.display = "none";
        navLinks.style.display = "none";
        burgerMenu.style.display = "block";
        navBG.classList.add("hidden");
        nav.onclick = null;
        backgroundCounter = 0;
        menuIsOpen = false;
    }
}

function closeOnBackgroundClick() { 
    if (!backgroundCounter == 0){
        onMenuClick();
        backgroundCounter = 0;
    } else {
        backgroundCounter++
    }
}

var globalPhase = 0; 
var pauseAnimation = false;

var showSection = document.getElementById("showSection");

var line1 = document.getElementById("line1");

var logo_o = document.getElementById("logo");

var line2 = document.getElementById("line2");
var braces = document.getElementById("braces");
var skill = document.getElementById("skill");

var showParagraphs = document.querySelectorAll("#showSection > div > pre");
var showButtons = document.querySelectorAll("#showSection > div > a");

var webDevParagraphs = ["lets workTogether(you, me):", "  my_skills_(Web&App Development)", "  verySociable&&location==Tokyo","\tmy_languages = {","\t  WEB: 'js, python, html + css',","\t  APP: 'dart ()=> [iOS+Droid]',","\t  HUMAN: 'jp, en, ger', ...}","  if my.skills==your.requirements:"];
var webDevButtons = ["Learn More!", "Contact Me!"];

var japaneseParagraphs = ["My appetite for Sushi made me learn Japanese &", "Now Japanese Literature keeps me studying.", "", "I've been studying the Language since 2015 &", "Passed the highest level JLPT in December 2019.", "", "If you're interested in how I study Japanese &", "want to know what I do with the language, then:"];
var japaneseButtons = ["Follow my Language Journey"];

var creativeParagraphs = ["Since I call beautiful Tokyo my home now,", "I thought I could write a Blog about it.","But Tokyo is enormous.", "It's home to over 9 million people after all.", "How would you even approach a City that vast?", "Well,", "Tokyo is structured into 23 Wards (Ku).", "So why don't we just explore them one-by-one?"];
var creativeButtons = ["23-Ku-Project"]
// rotiert die phase um 1 weiter. Phase 1 ist nur {theosteiner} mit gelbem hintergrund.
// Phase 2 ist [Web-Development], Phase 3 ist [Japanisch] Phase, Phase 4 ist Creative

async function timeCoordinator() {
    switch(globalPhase) { // Activate [Base] and prepare transition to [Japanese]
        case 0:
            await pause(200);
            document.body.style.visibility = "visible";
            await asyncTypeWriter(line1, "Hey there! ");
            await asyncTypeWriter(line1, "My name is");
            logo.classList.remove("opacity-0");
            await pause(1000);
            await asyncTypeWriter(line2, "and I do:");
            braces.classList.remove("opacity-0");
            if (!pauseAnimation) {
                setTimeout(timeCoordinator, 400);
            }
            break;
        case 1: // Activate [WebDev]
            document.body.style.backgroundImage = "url('img/circuit-board.svg')"
            document.body.style.backgroundColor = "#E5E7EB";
            await asyncTypeWriter(skill,"Web-Development", 80, true);
            for (i = 0; i < showParagraphs.length; i++) {
                await asyncTypeWriter(showParagraphs[i],webDevParagraphs[i],20);
            }

            for (i = 0; i < showButtons.length; i++) {
                showButtons[i].innerHTML = webDevButtons[i];
                showButtons[i].classList.remove("opacity-0");
            }

            if (!pauseAnimation) {
                setTimeout(timeCoordinator, 4000);
            }
            break;
        case 2: // Deactivate [WebDev] and prepare Transition to [Japanese]
            document.body.style.backgroundColor = "#FCD34D";
            for (i = showParagraphs.length-1; i >= 0 ; i--) {
                asyncErasor(showParagraphs[i], 20, true)
            }
            for (i = 0; i < showButtons.length; i++) {
                showButtons[i].classList.add("opacity-0");
            }
            asyncErasor(skill, 20, true);
            await pause(2000);
            await asyncRewrite(line2, 3, "speak:");
            skill.classList.add("font-sans");
            await asyncTypeWriter(skill,"Japanese", 80, true);
            if (!pauseAnimation) {
                setTimeout(timeCoordinator, 400);
            }
            break;
        case 3: // Activate [Japanese]
            document.body.style.backgroundImage = "url('img/yellow-endless-clouds.svg')";
            document.body.style.backgroundColor = "#E5E7EB";
            for (i = 0; i < japaneseParagraphs.length; i++) {
                showParagraphs[i].classList.add("font-sans","font-semibold");
                await asyncTypeWriter(showParagraphs[i],japaneseParagraphs[i],20);
            }

            for (i = showButtons.length-1; i >= 0 ; i--) {
                if (japaneseButtons[i] === undefined) {
                    showButtons[i].classList.add("hidden");
                } else {
                    showButtons[i].classList.add("font-sans");
                    showButtons[i].innerHTML = japaneseButtons[i];
                    showButtons[i].classList.remove("opacity-0");
                }
            }

            if (!pauseAnimation) {
                setTimeout(timeCoordinator, 4000);
            }
            break;
        case 4: // Deactivate [Japanese] and prepare Transition to [Creative]
            document.body.style.backgroundColor = "#FCD34D";
            for (i = showParagraphs.length-1; i >= 0 ; i--) {
                asyncErasor(showParagraphs[i], 20, true)
            }
            for (i = 0; i < showButtons.length; i++) {
                showButtons[i].classList.add("opacity-0");
            }
            await pause(100);
            for (i = 0; i < showButtons.length; i++) {
                showButtons[i].classList.remove("hidden"),400
            }
            asyncErasor(skill, 20, true);
            await pause(2000);
            await asyncErasor(skill, 40, true);
            await asyncRewrite(line2, 7, "'m trying to be:");
            skill.classList.add("font-serif");
            skill.classList.remove("font-sans");
            await asyncTypeWriter(skill,"Creative", 80, true);
            if (!pauseAnimation) {
                setTimeout(timeCoordinator, 400);
            }
            break;
        case 5: // Activate [Creative]
            document.body.style.backgroundImage = "url('img/topography.svg')";
            document.body.style.backgroundColor = "#E5E7EB";
            for (i = 0; i < creativeParagraphs.length; i++) {
                showParagraphs[i].classList.add("font-serif", "font-bold");
                showParagraphs[i].classList.remove("font-sans");
                await asyncTypeWriter(showParagraphs[i],creativeParagraphs[i],20);
            }

            for (i = showButtons.length-1; i >= 0 ; i--) {
                if (creativeButtons[i] === undefined) {
                    showButtons[i].classList.add("hidden");
                } else {
                    showButtons[i].classList.add("font-serif");
                    showButtons[i].innerHTML = creativeButtons[i];
                    showButtons[i].classList.remove("opacity-0");
                }
            }
            if (!pauseAnimation) {
                setTimeout(timeCoordinator, 4000);
            }
            break;
        case 6: // Deactivate [Creative] and prepare Transition to [Base]
            document.body.style.backgroundColor = "#FCD34D";
            document.body.style.backgroundImage = "";            
            for (i = showParagraphs.length-1; i >= 0 ; i--) {
                asyncErasor(showParagraphs[i], 20, true)
            }
            for (i = 0; i < showButtons.length; i++) {
                showButtons[i].classList.add("opacity-0");
            }
            await pause(100);
            asyncErasor(skill, 20, true);
            asyncErasor(line1, 40, true);
            asyncErasor(line2, 40, true);
            for (i = 0; i < showButtons.length; i++) {
                showButtons[i].classList.remove("hidden"),400
            }
            braces.classList.add("opacity-0");
            await pause(2000);
    }
    globalPhase++
    globalPhase = globalPhase % 7
}



// typeWriter

async function asyncTypeWriter(element, txt, speed=60, flashOff = false) {
    if(!flashOff){toggleCursor(element);}
    await pause(speed*6);
    for (var i = 0; i < txt.length; i++) {
            element.textContent += txt[i];
            await pause(speed);
    } 
    await pause(400)
    if(!flashOff){toggleCursor(element);}
}

async function asyncErasor(element, speed=60, flashOff = false) {
    if(!flashOff){toggleCursor(element);}
    await pause(speed*6);
    while (element.textContent.length > 0) {
        element.textContent = element.textContent.slice(0, element.textContent.length-1)
        await pause(speed);
    }
    await pause(100)
    if(!flashOff){toggleCursor(element);}
}

async function asyncRewrite(element, cutoff, newtxt, speed=60, flashOff = false) {
    if(!flashOff){toggleCursor(element);}
    await pause(speed*6);
    for (var i = 0; i < cutoff; i++) {
        element.textContent = element.textContent.slice(0, element.textContent.length-1)
        await pause(speed);
    }
    for (var i = 0; i < newtxt.length; i++) {
        element.textContent += newtxt[i];
        await pause(speed)
    } 
    await pause(400)
    if(!flashOff){toggleCursor(element);}
}

async function toggleCursor(element) {
    if (!element.classList.contains("border-r-4")) {
        element.classList.add("border-r-4");
    }
    if (element.classList.contains("animate-flash")){
        element.classList.remove("animate-flash");
        // element.style.borderColor = 'rgba(225, 0, 13, 0.1)';
        // await pause (100)
        // element.style.borderColor = '';
        element.classList.add("border-transparent");
    } else{
        if (element.classList.contains("border-transparent")) {
            element.classList.remove("border-transparent");
        }
        element.classList.add("animate-flash");
    }
}

function pause(breakTime) {
    return new Promise(function(resolve,reject) {
        setTimeout(resolve, breakTime);
    })
}

// pauseAnimation = true;
// globalPhase = 5;

var CSSloadcheck= setInterval(function () {
    if (showSection.style.textOpacity = 0.95){
        timeCoordinator();
        clearInterval(CSSloadcheck);
    }
}, 100)
