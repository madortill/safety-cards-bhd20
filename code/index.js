// כללי
var SUBJECTS_TITLES;
const AMOUNT_OF_TOTAL_QUESTIONS = 20;
var blurAmount = "10px";
//
var selectedSubjects = [];

// עמוד התרגול
const CARD_NUMS = ["first", "second", "third"];
const AMOUNT_OF_TIME_TO_QUESTION = 60;
var count = 0;
var currentQuestion = 0;
var practiceSeconds = AMOUNT_OF_TIME_TO_QUESTION;
var points = 0;
var timer;
var isComplete = false;
var avgTimeForQusetion = 0;
var sumTimeForQeustions = 0;
var isPressedHalfHalf = false;
var QUESTIONS = [];
var currCardCount;

// עמוד למידה
var currentCard = 0;
var currSubjCount = -1;
 // התת נושא שבמרכז העמוד
var midElement;


/** @type {(boolean|number)[]} */
var examAnswers = [];

// פונקציית הטעינה של כל הלומדה
window.addEventListener("load", function () {
    SUBJECTS_TITLES = Object.keys(DATA);

    // כותרת ראשית ללומדה
    addTitle();
    // כותרת נושא הלומדה
    function addTitle() {
        document.querySelector(".page.opening .title").innerHTML = TITLE;
        document.querySelector(".page.learning .title").innerHTML = TITLE;
    }


    let fullScreen = El("div", {cls: "full-screen"});
    document.querySelector(".page.opening").before(fullScreen);
    fullScreen.addEventListener("click", homePage);

    // מעבר בין עמוד הבית לעמוד הלמידה
    let scrollingIcon = El("img", {attributes: {class:"scrolling_icon", src: "../assets/images/opening/scrolling_icon.svg"}});
    document.querySelector(".page.opening .container-scrolling_icon").append(scrollingIcon); 
    // הפעלה של האנימציה בלחיצה
    document.querySelector(".page.opening .expand").style.transition = "all 1s ease";

});

// מעבר לדף הבית
/**
 * 
 * @param {Event} event 
 */
function homePage(event) {
    document.querySelector(".page.home").classList.add("active");
    document.querySelector(".full-screen").remove();
    document.querySelector(".main").removeEventListener("scroll", homePage, false);
    
    document.querySelector(".main").style.overflow = "hidden";
    document.querySelector(".page.home .books").style.display = "block";
    document.querySelector(".page.home .textArea").style.display = "block";
    document.querySelector(".page.opening").classList.add("scrolled");
    
    document.querySelector(".page.home .about").style.display = "block";
    document.querySelector(".page.home .about").addEventListener("click", aboutPage);
    
    let fullScreen = El("div", {cls: "full-screen"});
    document.querySelector(".page.opening").before(fullScreen);
    // מעבר לדף הבית
    setTimeout(function () {
        document.querySelector(".full-screen").addEventListener("click", ()=> {
            document.querySelector(".full-screen").remove();
            document.querySelector(".page.opening").classList.remove("active");
            document.querySelector(".page.home").classList.remove("active");
            document.querySelector(".page.learning.subjects").classList.add("active");
            learningSubjectsPage();
        });
    }, 1000);
}


// מעבר לאודות
function aboutPage(event) {
    document.querySelector(".full-screen").style.visibility = "hidden";
    document.querySelector(".page.opening").classList.remove("active");
    document.querySelector(".page.home").classList.remove("active");
    document.querySelector(".page.about").classList.add("active");
    // מעבר לדף הבית
    document.querySelector(".page.about .back-btn").addEventListener("click", () => {
        document.querySelector(".full-screen").style.visibility = "visible";
        document.querySelector(".page.opening").classList.add("active");
        document.querySelector(".page.home").classList.add("active");
        document.querySelector(".page.about").classList.remove("active");
    });
}

// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// אתחול עמוד הנושאים ללמידה
function learningSubjectsPage() {
    document.querySelector(".page.opening").classList.remove("active");
    document.querySelector(".page.home").classList.remove("active");
    document.querySelector(".page.learning.subjects").classList.add("active"); //// מעכשיו 27/4
    //  הוספת כפתור חזרה למסך נושאי הלמידה
    let backBtn =
    El("img", {
        attributes: { class: "back-btn", src: "../assets/images/general/back_btn.svg" },
        listeners: {
            click: function () {
                document.querySelector(".page.learning.subjects  .cards-container").innerHTML = "";
                document.querySelector(".page.learning.subjects").classList.remove("active");
                document.querySelector(".page.learning.subjects .back-btn").remove();
                document.querySelector(".page.opening").classList.add("active");
                document.querySelector(".page.home").classList.add("active");
                let fullScreen = El("div", {cls: "full-screen"});
                document.querySelector(".page.opening").before(fullScreen);
                // מעבר לדף הבית
                document.querySelector(".full-screen").addEventListener("click", ()=> {
                    document.querySelector(".full-screen").remove();
                    document.querySelector(".page.opening").classList.remove("active");
                    document.querySelector(".page.home").classList.remove("active");
                    document.querySelector(".page.learning.subjects").classList.add("active");
                    learningSubjectsPage();
                });
            }
        }
    });
    document.querySelector(".page.learning.subjects").append(backBtn);


    // יוצר את הכרטיסיות של נושאי הלימוד
    for (let subject of SUBJECTS_TITLES) {
        createStudyCards(subject);
    }

}

// יצירת קלפים ללמידה
function createStudyCards(currentSubject) {
    let card =
        El("div", { cls: "learningCard" },
            El("img", { attributes: { src: DATA[currentSubject].icon, class: "icon" } },
                // El("img", { attributes: { src: DATA[currentSubject].icon } })
            ),
            El("div", { cls: "subject" }, currentSubject)
        );
    document.querySelector(".page.learning.subjects .cards-container").append(card);
    card.addEventListener("click", () => {
        document.querySelector(".page.learning.subjects").classList.remove("active");
        document.querySelector(".page.learning.content").classList.add("active");
        subjectLearningPage(currentSubject);
    });
}

function beforePractice() {
    document.querySelector(".page.learning.subjects .title").style.filter = `blur(${blurAmount})`;
    document.querySelector(".page.learning.subjects .sub-title").style.filter = `blur(${blurAmount})`;
    document.querySelector(".page.learning.subjects .cards-container").style.filter = `blur(${blurAmount})`;
    document.querySelector(".page.learning.subjects .back-btn").style.filter = `blur(${blurAmount})`;

    let popup =
        El("div", { cls: "dark" },
            El("div", { cls: "beforePractice-popup" },
                El("img", {
                    attributes: {
                        src: "../assets/images/general/close_btn.svg", class: "close-btn"
                    }
                }),
                // כותרת
                El("div", { cls: "title-popup" }, "בחר נושאי תרגול"),
                El("div", { cls: "select-everything" },
                    El("img", { attributes: { class: "checkPlace-big", src: "../assets/images/learning/choosePractice_popup/nonSelectSMALL.svg" } }),
                    El("div", { cls: "" }, "בחר הכל")
                ),
                El("div", { cls: "subjects-container" },
                    El("div", { cls: "group-line" }),
                    El("div", { cls: "subjects" })
                ),
                El("div", { cls: "beforePractice-instruction-container" },
                    El("div", {},
                        El("img", { attributes: { class: "icon2", src: "../assets/images/practice/beforePractice_popup/timer_icon.svg" } }),
                        El("div", { cls: "text" },
                            El("b", {}, " דקה"),
                            El("br", {}),
                            "לשאלה"
                        ),
                    ),
                    El("div", {},
                        El("img", { attributes: { class: "icon1", src: "../assets/images/practice/beforePractice_popup/slide_icon.svg" } }),
                        El("div", { cls: "text" },
                            El("b", { cls: "italic" }, " הקליקו"),
                            El("br", {}),
                            "למעבר"
                        ),
                    ),
                    El("div", {},
                        El("img", { attributes: { class: "icon1", src: "../assets/images/practice/beforePractice_popup/blow_icon.svg" } }),
                        El("div", { cls: "text" },
                            El("b", {}, "תרגעו"),
                            El("br", {}),
                            "תנשמו"
                        ),

                    ),
                ),
                El("img", { attributes: { class: "practiceBTN-popup", src: "../assets/images/learning/choosePractice_popup/choosePractice_btn.svg" } })
            )
        );
    document.querySelector(".page.learning.subjects").append(popup);

    // מערך שבו רשום המיקום של הנושא לפי סדר ההופעה שלו בג'ייסון
    selectedSubjects = [];
    // איפוס המערך של הנושאים הנבחרים
    for (let i = 0; i < SUBJECTS_TITLES.length; i++) {
        selectedSubjects[i] = false;
    }
    let selectAll = document.querySelector(".page.learning.subjects .select-everything");
    // מאזין לחיצה לכפתור בחירת כל הנושאים
    selectAll.addEventListener("click", (e) => {
        // אם הכפתור היה לחוץ 
        if (selectAll.classList.contains("checked")) {
            document.querySelectorAll(".page.learning.subjects .subject-popup, .page.learning.subjects .select-everything").forEach((checkBox, i) => {
                checkBox.querySelector("img").src = "../assets/images/learning/choosePractice_popup/nonSelectSMALL.svg";
                checkBox.classList.remove("checked-subjects");
            });
            selectAll.classList.remove("checked");
            for (let i = 0; i < SUBJECTS_TITLES.length; i++) {
                selectedSubjects[i] = false;
            }

        }
        // הכפתור לא היה לחוץ, ולכן כל נושאי הלמידה יסומנו כעת
        else {
            document.querySelectorAll(".page.learning.subjects .subject-popup, .page.learning.subjects .select-everything").forEach((checkBox, i) => {
                checkBox.querySelector("img").src = "../assets/images/learning/choosePractice_popup/selectedSMALL.svg";
                checkBox.classList.add("checked-subjects");
            });
            selectAll.classList.add("checked");
            for (let i = 0; i < SUBJECTS_TITLES.length; i++) {
                selectedSubjects[i] = true;
            }
        }
        // במידה והמחלקה קיימת ויש ערך מסומן להתחלת התרגול - הכפתור תרגול יהיה לחיץ
        let isChecked = document.querySelector(".page.learning.subjects .beforePractice-popup .checked-subjects");
        document.querySelector(".page.learning.subjects .practiceBTN-popup").classList.toggle("avalible", isChecked);

    });

    // הוספת כל נושאי הלמידה האפשריים לתרגול
    for (let i = 0; i < SUBJECTS_TITLES.length; i++) {
        // לעבור על הנושאים במערך הנושאים ולהביא את הכותרת של כל נושא
        let subject =
            El("div", { cls: "subject-popup" },
                El("img", { attributes: { class: "checkPlace", src: "../assets/images/learning/choosePractice_popup/nonSelectSMALL.svg" } }),
                El("div", { attributes: {} }, SUBJECTS_TITLES[i])
            );
        document.querySelector(".page.learning.subjects .subjects").append(subject);

        // מאזין לחיצה לנושא אחד
        subject.addEventListener("click", () => {
            // אם הנושא הנלחץ כבר היה לחוץ
            if (subject.classList.contains("checked-subjects")) {
                subject.querySelector("img").src = "../assets/images/learning/choosePractice_popup/nonSelectSMALL.svg";
                subject.classList.remove("checked-subjects");
                selectedSubjects[i] = false;
                selectAll.querySelector("img").src = "../assets/images/learning/choosePractice_popup/nonSelectSMALL.svg";
                selectAll.classList.remove("checked-subjects");
                selectAll.classList.remove("checked");
            }
            // הנושא הנבחר לא היה לחוץ ולכן עכשיו יסומן
            else {
                selectedSubjects[i] = true;
                subject.querySelector("img").src = "../assets/images/learning/choosePractice_popup/selectedSMALL.svg";
                subject.classList.add("checked-subjects");
                let isNotChecked = document.querySelector(".page.learning.subjects .subject-popup:not(.checked-subjects)");
                selectAll.classList.toggle("checked-subjects", !isNotChecked);
                selectAll.classList.toggle("checked", !isNotChecked);
                if (!isNotChecked)
                    selectAll.querySelector("img").src = "../assets/images/learning/choosePractice_popup/selectedSMALL.svg";

            }
            // במידה והמחלקה קיימת ויש ערך מסומן להתחלת התרגול - הכפתור תרגול יהיה לחיץ
            let isChecked = document.querySelector(".page.learning.subjects .beforePractice-popup .checked-subjects");
            document.querySelector(".page.learning.subjects .practiceBTN-popup").classList.toggle("avalible", isChecked);
        });
    }

    // כפתור סגירה של הפופאפ
    document.querySelector(".page .beforePractice-popup .close-btn").addEventListener("click", () => {
        document.querySelector(".page.learning.subjects .title").style.filter = "unset";
        document.querySelector(".page.learning.subjects .sub-title").style.filter = "unset";
        document.querySelector(".page.learning.subjects .cards-container").style.filter = "unset";
        document.querySelector(".page.learning.subjects .back-btn").style.filter = "unset";
        document.querySelector(".page.learning.subjects .dark").remove();
    });

    // כפתור מעבר לתרגול מהפופאפ
    document.querySelector(".page .practiceBTN-popup").addEventListener("click", () => {
        document.querySelector(".page.learning.subjects .title").style.filter = "unset";
        document.querySelector(".page.learning.subjects .sub-title").style.filter = "unset";
        document.querySelector(".page.learning.subjects .cards-container").style.filter = "unset";
        document.querySelector(".page.learning.subjects .back-btn").style.filter = "unset";
        document.querySelector(".page.learning.subjects .dark").remove();
        document.querySelector(".page.learning.subjects").classList.remove("active");
        document.querySelector(".page.practice").classList.add("active");
        practicePage();
    });

}

// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

function questionsToPractice() {
    let selectedQuestions = [];

    let subjects = SUBJECTS_TITLES.filter((_, i) => selectedSubjects[i]);

    // מקסימום כמות השאלות לכל נושא
    let maxQuestionAmountForTopic = AMOUNT_OF_TOTAL_QUESTIONS / subjects.length;
    // בוחר את השאלות מכל נושא
    for (let subject of subjects) {
        let subjectData = DATA[subject];
        // מספר השאלות לנושא
        let subjectQuestions = subjectData.questions.length;
        // בוחר את מספר השאלות
        let questionCount = Math.min(subjectQuestions, Math.max(Math.floor(maxQuestionAmountForTopic), 1));
        // מסדר באופן רנדומלי את השאלות ממערך הנתונים
        let shuffledQuestions = shuffle(subjectData.questions.slice());
        // בוחר את האיקס שאלות הראשונות
        selectedQuestions.push(...shuffledQuestions.slice(0, questionCount));
        if (selectedQuestions.length === AMOUNT_OF_TOTAL_QUESTIONS) break;
    }
    return selectedQuestions;
}

// מעבר לדף התרגול ואתחולו
function practicePage(event) {
    // מערך השאלות הרלוונטיות לנושאים הנבחרו בכמות המקסימלית האפשרית
    QUESTIONS = questionsToPractice();

    shuffle(QUESTIONS);

    // איפוס מיקום השאלה הנוכחית
    currentQuestion = 0;
    currCardCount = 1;

    // איפוס ניקוד
    points = 0;

    // איפוס הבר הכחול למעלה
    document.querySelector(".page.practice .right-answers > .points").innerHTML = 0;
    document.querySelector(".page.practice .sum-answers > .points").innerHTML = QUESTIONS.length;

    // אתחול 2 הכרטיסים הראשונים על המסך
    for (let i = 0; i < 2; i++) {
        // השאלה היא שאלת נכון לא נכון
        if (QUESTIONS[i].type === "binary") {
            createBinaryCard(i);
            // מוסיף לכל התשובות מאזין לחיצה
            if (i === 0) {
                document.querySelector(".page.practice .first-question .right-ans").addEventListener("click", e => checkAnswerBinary("right", e));
                document.querySelector(".page.practice .first-question .wrong-ans").addEventListener("click", e => checkAnswerBinary("wrong", e));
            }

        }
        // השאלה היא שאלה אמריקאית
        else {
            createMultipleCard(i);

            if (i === 0) {
                // מוסיף לכל התשובות מאזין לחיצה
                let selectedAns = document.querySelectorAll(".page.practice .first-question .answer-container");
                for (let countAns = 0; countAns < 4; countAns++) {
                    selectedAns[countAns].addEventListener("click", checkAnswerMultiple);
                }
            }
        }

    }

    
    // מוסיף לכרטיסייה הראשונה את מספר הכרטיסייה הנוכחית
    document.querySelector(".page.practice .first-question .curr-question > .curr-ques-text").innerHTML = currCardCount;

    // התחלת הספירה לאחור
    timer = setInterval(startTimer, 1000);

    // מאזין לחיצה לכפתור חצי חצי
    document.querySelector(".page.practice .half-half").addEventListener("click", activateHalfHalfBTN);
    // בודק האם להפעיל את כפתור החצי חצי
    halfHalfBTN_mode();

    // מאזין לחיצה לכפתור גלה לי
    document.querySelector(".page.practice .show-answer").addEventListener("click", showAnswer);


    //  הוספת כפתור חזרה למסך הבית
    let backBtn =
        El("img", {
            attributes: { class: "back-btn", src: "../assets/images/general/back_btn.svg" },
            listeners: {
                click: function () {
                    document.querySelector(".page.practice").classList.remove("active");
                    document.querySelector(".page.learning.subjects").classList.add("active");
                    resetPrecticePage();
                }
            }
        });
    document.querySelector(".page.practice").append(backBtn);
}

function halfHalfBTN_mode() {

    // האם זו לא הכרטסייה האחרונה
    if (currentQuestion >= QUESTIONS.length) {
        return;
    }

    // האם זה נכון לא נכון
    if (QUESTIONS[currentQuestion].type === "binary") {
        document.querySelector(".page.practice .half-half").style.opacity = "0.5";
        document.querySelector(".page.practice .half-half").style.pointerEvents = "none";
    }
    // אמריקאי
    else {
        document.querySelector(".page.practice .half-half").style.pointerEvents = "all";
        document.querySelector(".page.practice .half-half").style.opacity = "1";
        isPressedHalfHalf = false;
    }
}

// הפונקציה יוצרת קלף של שאלות אמריקאיות
function createMultipleCard(i = 2) {
    let card =
        El("div", { classes: [`${CARD_NUMS[i]}-question`, "card", "multiple"] }, //אבא
            El("div", { cls: "timer" },                  // ילד
                El("div", { cls: "timeLeft" },           //ילד של ילד
                    "1:00"
                )
            ),
            // תמונה של הקלף
            El("img", { attributes: { src: "../assets/images/exam/exam2.svg" } }),

            El("div", { cls: "question-text" },
                // השאלה
                El("div", { cls: "question" }, QUESTIONS[currentQuestion + i].question),
                // התשובות
                El("div", { classes: ["answer-container", "ans1"] },
                    El("img", { attributes: { src: "../assets/images/general/chooseQuestion_btn.svg" } }),
                    El("div", { cls: "ans" }, QUESTIONS[currentQuestion + i].ans1)
                ),
                El("div", { classes: ["answer-container", "ans2"] },
                    El("img", { attributes: { src: "../assets/images/general/chooseQuestion_btn.svg" } }),
                    El("div", { cls: "ans" }, QUESTIONS[currentQuestion + i].ans2)
                ),
                El("div", { classes: ["answer-container", "ans3"] },
                    El("img", { attributes: { src: "../assets/images/general/chooseQuestion_btn.svg" } }),
                    El("div", { cls: "ans" }, QUESTIONS[currentQuestion + i].ans3)
                ),
                El("div", { classes: ["answer-container", "ans4"] },
                    El("img", { attributes: { src: "../assets/images/general/chooseQuestion_btn.svg" } }),
                    El("div", { cls: "ans" }, QUESTIONS[currentQuestion + i].ans4)
                )
            ),
            El("div", { cls: "next-btn" },
                El("img", { attributes: { src: "../assets/images/practice/nextQuestion_btn.svg" } }),
                El("div", {cls: "curr-question"},
                    El("div", {cls:"curr-ques-text"}), 
                    "/",
                    El("div", {}, QUESTIONS.length),
                )
            )
        );
    document.querySelector(".container-questions").append(card);
}

// יוצרת קלף של שאלות נכון לא נכון
function createBinaryCard(i = 2) {
    let card =
        El("div", { classes: [`${CARD_NUMS[i]}-question`, "card", "binary"] }, //אבא
            El("div", { cls: "timer" },                  // ילד
                El("div", { cls: "timeLeft" },           //ילד של ילד
                    "1:00"
                )
            ),
            // תמונה של הקלף
            El("img", { attributes: { src: "../assets/images/exam/exam2.svg" } }),
            // השאלה
            El("div", { cls: "question-text" },
                El("div", { cls: "question" }, QUESTIONS[currentQuestion + i].sentence),
                // התשובות
                El("div", { cls: "ans-container" },
                    El("img", { attributes: { src: "../assets/images/general/wrong_btn.svg" }, cls: "wrong-ans" }), // לברר עם פלג אם ככה כותבים את הקלאס בנוסף לקישור תמונה
                    El("img", { attributes: { src: "../assets/images/general/right_btn.svg" }, cls: "right-ans" }),
                ),
            ),
            El("div", { cls: "next-btn" },
                El("img", { attributes: { src: "../assets/images/practice/nextQuestion_btn.svg" } }),
                El("div", {cls: "curr-question"},
                    El("div", {cls:"curr-ques-text"}), 
                    "/",
                    El("div", {}, QUESTIONS.length),
                )
            )
        );
    document.querySelector(".container-questions").append(card);
}

// טיימר שסופר דקה לכל שאלה
function startTimer() {
    // כדי שהשעון יראה קודם 1:00 ולא 60
    if (practiceSeconds < AMOUNT_OF_TIME_TO_QUESTION) {
        document.querySelector(".page.practice .first-question .timeLeft").innerHTML = practiceSeconds;
    }

    // ספירה לאחור
    if (practiceSeconds > 0) {
        practiceSeconds--;
    }
    // הזמן נגמר!
    else {
        clearInterval(startTimer);
        timeOver("practice");
    }
}

// (אמריקאי) הפונקציה בודקת אם התשובה שנבחרה אכן נכונה
function checkAnswerMultiple(event) {
    if (isComplete) return;
    document.querySelector(".page.practice .first-question .next-btn > img").addEventListener("click", nextQuestionPractice);
    document.querySelector(".page.practice .first-question .next-btn > img").style.opacity = "1";
    clearInterval(timer);

    event.target.querySelector("img").src = "../assets/images/general/choosenQuestion.svg";
    let correctAns = QUESTIONS[currentQuestion].correctAns;

    // האם התשובה הנלחצת היא התשובה הנכונה
    if (event.target.classList.contains(`${correctAns}`)) {
        document.querySelector(".page.practice .answer-container." + correctAns + "> .ans").style.borderBottom = "2px solid rgb(44, 191, 55)"; //green
        document.querySelector(".page.practice .answer-container." + correctAns + "> .ans").style.paddingBottom = "2%"; //
        points++;
        document.querySelector(".points").innerHTML = points;
    }
    // התשובה הנלחצת אינה נכונה
    else {
        document.querySelector(".page.practice .answer-container." + correctAns + "> .ans").style.borderBottom = "2px solid rgb(44, 191, 55)"; //green
        document.querySelector(".page.practice .answer-container." + correctAns + "> .ans").style.paddingBottom = "2%"; //
        event.target.querySelector(".ans").style.borderBottom = "2px solid rgb(277, 58, 78)"; //red
        event.target.querySelector(".ans").style.paddingBottom = "2%"; //

    }
    isComplete = true;
}

// הפונקציה בודקת אם התשובה שנבחרה אכן נכונה (נכון לא נכון)
function checkAnswerBinary(selectedAnswer, event) {
    if (isComplete) return;
    document.querySelector(".page.practice .first-question .next-btn > img").addEventListener("click", nextQuestionPractice);
    document.querySelector(".page.practice .first-question .next-btn > img").style.opacity = "1";
    clearInterval(timer);

    // משנה את התמונה לתמונה שנבחרה
    if (selectedAnswer === "right") {
        event.target.src = "../assets/images/general/rightSelected_btn.svg";
    }
    else {
        event.target.src = "../assets/images/general/wrongSelected_btn.svg";
    }
    // בודק אם התשובה נכונה
    if (QUESTIONS[currentQuestion].trueOrFalse && selectedAnswer === "right" ||
        !QUESTIONS[currentQuestion].trueOrFalse && selectedAnswer === "wrong") {
        // green line
        let greenLine = El("img", { attributes: { src: "../assets/images/general/rightAnswer.svg" }, cls: "line" });/////////////
        document.querySelector(".question").after(greenLine);
        points++;
        document.querySelector(".points").innerHTML = points;
    }
    else {
        // red line
        let redLine = El("img", { attributes: { src: "../assets/images/general/wrongAnswer.svg" }, cls: "line" });/////////////
        document.querySelector(".question").after(redLine);
    }
    isComplete = true;
}

// הפונקציה מעבירה לשאלה הבאה
function nextQuestionPractice() {
    // 
    currCardCount++;

    // סוכם את כל השניות לכל שאלה
    sumTimeForQeustions = sumTimeForQeustions + (AMOUNT_OF_TIME_TO_QUESTION - practiceSeconds);

    clearInterval(timer);
    // למקרה שזה לא 2 הכרטיסיות האחרונות
    if (currentQuestion + 2 < QUESTIONS.length) {
        if (QUESTIONS[currentQuestion + 2].type === "binary") {
            createBinaryCard();
        }
        else {
            createMultipleCard();
        }

        // מוסיף לכרטיסייה האחורית את מספר הכרטיסייה הנוכחית
        document.querySelector(".page.practice .second-question .curr-question > .curr-ques-text").innerHTML = currCardCount;

        document.querySelector(".page.practice .first-question").classList.add("transition");
        let firstCard = document.querySelector(".page.practice .transition");
        firstCard.style.transform = "translateX(108vw)";
        firstCard.style.transition = "transform 0.7s ease";
        firstCard.style.position = "absolute";

        setTimeout(function () {
            firstCard.remove();
            firstCard.style.transition = "unset";
            firstCard.style.transform = "unset";
            firstCard.style.position = "unset";
            addEventListenersPractice();
        }, 700);

        document.querySelector(".page.practice .second-question").classList.add("first-question");
        document.querySelector(".page.practice .second-question").style.transition = "transform 0.7s ease";
        document.querySelector(".page.practice .second-question").classList.remove("second-question");

        document.querySelector(".page.practice .third-question").classList.add("second-question");
        document.querySelector(".page.practice .second-question").classList.remove("third-question");

        practiceSeconds = AMOUNT_OF_TIME_TO_QUESTION;
        timer = setInterval(startTimer, 1000);
        isComplete = false;
    }
    // 2 הכרטיסיות האחרונות
    else if (currentQuestion + 2 === QUESTIONS.length) {
        // מוסיף לכרטיסייה האחורית את מספר הכרטיסייה הנוכחית
        document.querySelector(".page.practice .second-question .curr-question > .curr-ques-text").innerHTML = currCardCount;

        document.querySelector(".page.practice .first-question").style.transform = "translateX(108vw)";
        document.querySelector(".page.practice .first-question").style.transition = "all 0.7s ease";
        document.querySelector(".page.practice .first-question").style.position = "absolute";
        setTimeout(function () {
            document.querySelector(".page.practice .first-question").remove();
            document.querySelector(".page.practice .first-question").style.transform = "unset";
            document.querySelector(".page.practice .first-question").style.transition = "unset";
            document.querySelector(".page.practice .first-question").style.position = "unset";
            addEventListenersPractice();
        }, 700);

        document.querySelector(".page.practice .second-question").style.transition = "all 0.7s ease";
        document.querySelector(".page.practice .second-question").classList.add("first-question");
        document.querySelector(".page.practice .second-question").classList.remove("second-question");

        practiceSeconds = AMOUNT_OF_TIME_TO_QUESTION;
        timer = setInterval(startTimer, 1000);
        isComplete = false;

    }
    // הכרטיסייה האחרונה
    else if (currentQuestion + 1 === QUESTIONS.length) {
        document.querySelector(".page.practice .container-questions").style.display = "none";
        document.querySelector(".page.practice .buttons").style.display = "none";
        endPractice();
    }
    currentQuestion++;
    
    // בודק האם להפעיל את כפתור החצי חצי
    halfHalfBTN_mode();
    document.querySelector(".page.practice .first-question .next-btn > img").removeEventListener("click", nextQuestionPractice);
}

// הפונקציה מוסיפה מאזיני לחיצה לתשובות
function addEventListenersPractice() {
    // נכון לא נכון
    if (QUESTIONS[currentQuestion].type === "binary") {
        document.querySelector(".page.practice .first-question .right-ans").addEventListener("click", e => checkAnswerBinary("right", e));
        document.querySelector(".page.practice .first-question .wrong-ans").addEventListener("click", e => checkAnswerBinary("wrong", e));
    }
    // אמריקאי
    else {
        // מוסיף לכל התשובות מאזין לחיצה
        let selectedAns = document.querySelectorAll(".page.practice .first-question .answer-container");
        for (let countAns = 0; countAns < 4; countAns++) {
            selectedAns[countAns].addEventListener("click", checkAnswerMultiple);
        }
    }
}

// מוסיף פופאפ סיום עם סיכום התוצאות
function endPractice() {
    document.querySelector(".page.practice .title").style.filter = `blur(${blurAmount})`;
    document.querySelector(".page.practice .score").style.filter = `blur(${blurAmount})`;
    document.querySelector(".page.practice .back-btn").style.filter = `blur(${blurAmount})`;

    avgTimeForQusetion = sumTimeForQeustions / QUESTIONS.length;
    avgTimeForQusetion = avgTimeForQusetion.toFixed(2);

    let img, isPassTitle, isPassSubTitle;
    // האם כמות התשובות הנכונות גדולה מחצי מהשאלות
    if (points > QUESTIONS.length / 2) {
        isPassTitle = "כל הכבוד!";
        isPassSubTitle = "עברת את התרגול בהצלחה";
        img = "../assets/images/general/finish_popup/check_icon.svg"
    }
    else {
        isPassTitle = "אוי... לא נורא";
        isPassSubTitle = "בהצלחה בפעם הבאה...";
        img = "../assets/images/general/finish_popup/x_icon.svg"
    }

    let finishPopup =
        El("div", { cls: "dark" },
            // כל הקלף
            El("div", { cls: "end-practice" },
                El("img", { attributes: { src: "../assets/images/general/close_btn.svg", class: "close-btn" } }),
                // כותרות
                El("div", { cls: "title-popup" }, isPassTitle),
                El("div", { cls: "popup-sub-titles" },
                    El("div", { cls: "text1-popup" }, isPassSubTitle),
                    El("div", { cls: "text2-popup" }, "הנה כמה נתונים שיעזרו לך"),
                ),
                // בלוק 1
                El("div", { cls: "grey-line" }),
                El("div", { cls: "container-resultes" },
                    El("div", { cls: "summery-titles" },
                        El("div", { cls: "titleAndIcon-container" },
                            El("div", {},
                                points + " " + "תשובות נכונות"
                            ),
                            El("img", { attributes: { src: img, class: "checkIcon-btn" } }),
                        ),
                        "מתוך " + QUESTIONS.length + " שאלות",
                    ),
                    El("div", { cls: "progress-bar-container" },
                        El("div", { cls: "progress-bar-right-answers" })
                    ),
                ),
                // בלוק 2 
                El("div", { cls: "grey-line" }),
                El("div", { cls: "container-resultes" },
                    El("div", { cls: "summery-titles" },
                        El("div", { cls: "titleAndIcon-container" },
                            El("div", {},
                                avgTimeForQusetion + " שניות"
                            ),
                            El("img", { attributes: { src: "../assets/images/general/finish_popup/timer_icon.svg", class: "timeIcon-btn" } }),
                        ),
                        "ממוצע לשאלה",
                    ),
                    El("div", { cls: "progress-bar-container" },
                        El("div", { cls: "progress-bar-time" })
                    ),
                ),

                El("div", { cls: "grey-line" }),
                El("img", { attributes: { src: "../assets/images/general/finish_popup/home_btn.svg", class: "backToHome-btn" } })
            )
        );

    document.querySelector(".page.practice").append(finishPopup);
    document.querySelector(".page.practice .progress-bar-right-answers").style.width = points / QUESTIONS.length * 100 + "%";
    document.querySelector(".page.practice .progress-bar-time").style.width = avgTimeForQusetion / AMOUNT_OF_TIME_TO_QUESTION * 100 + "%";

    // מעבר לדף הבית בלחיצה על הכפתור
    document.querySelector(".page.practice .backToHome-btn").addEventListener("click", () => {
        document.querySelector(".page.practice").classList.remove("active");
        document.querySelector(".page.learning.subjects").classList.add("active");
        resetPrecticePage(true);
    });
    // מעבר לדף הבית בלחיצה על הכפתור
    document.querySelector(".page.practice .close-btn").addEventListener("click", () => {
        document.querySelector(".page.practice").classList.remove("active");
        document.querySelector(".page.learning.subjects").classList.add("active");
        resetPrecticePage(true);
    });
}

// הפונקציה מאתחלת את מסך התרגול ומקבלת ערך "אמת" אם התרגול נערך עד הסוף ובמידה ולא תקבל את הערך "שקר".
function resetPrecticePage(finishPractice = false) {
    practiceSeconds = AMOUNT_OF_TIME_TO_QUESTION;
    // האם התרגול לא נגמר
    if (!finishPractice) {
        clearInterval(timer);
        document.querySelector(".page.practice .container-questions").innerHTML = "";
    }
    else {
        document.querySelector(".page.practice .container-questions").style.display = "none";
        document.querySelector(".page.practice .container-questions").innerHTML = "";
        document.querySelector(".page.practice .buttons").style.display = "none";

        document.querySelector(".page.practice .container-questions").style.display = "flex";
        document.querySelector(".page.practice .buttons").style.display = "flex";
        document.querySelector(".page.practice .title").style.filter = "unset";
        document.querySelector(".page.practice .score").style.filter = "unset";
        document.querySelector(".page.practice .container-questions").style.filter = "unset";
        document.querySelector(".page.practice .back-btn").style.filter = "unset";
        document.querySelector(".page.practice .buttons").style.filter = "unset";
        document.querySelector(".page.practice .dark").remove();
    }
    document.querySelector(".page.practice .back-btn").remove(); //
    isComplete = false;
}

// הפעלת כפתור חצי חצי
function activateHalfHalfBTN() {
    if (isPressedHalfHalf) {
        return;
    }

    let num1 = null, num2 = null;

    while (num1 === null || num2 === null) {
        // מגריל מספר אקראי בין 1 ל 4
        let randomNumber = Math.floor(Math.random() * 4) + 1;

        if (randomNumber != QUESTIONS[currentQuestion].correctAns.slice(-1)) {
            if (num1 === null) {
                num1 = randomNumber;
            }
            else if (num2 === null && num1 !== randomNumber) {
                num2 = randomNumber;
            }
        }
    }
    document.querySelector(`.page.practice .first-question .ans${num1}`).style.opacity = "0.3";
    document.querySelector(`.page.practice .first-question .ans${num2}`).style.opacity = "0.3";
    document.querySelector(`.page.practice .first-question .ans${num1}`).style.pointerEvents = "none";
    document.querySelector(`.page.practice .first-question .ans${num2}`).style.pointerEvents = "none";

    isPressedHalfHalf = true;

}

// הפעלת כפתור גלה לי 
function showAnswer() {
    if (isComplete) return;
    clearInterval(timer);
    document.querySelector(".page.practice .first-question .next-btn > img").addEventListener("click", nextQuestionPractice);
    document.querySelector(".page.practice .first-question .next-btn > img").style.opacity = "1";

    let rightAnswer;
    if (QUESTIONS[currentQuestion].type === "binary") {
        rightAnswer = QUESTIONS[currentQuestion].trueOrFalse;
        if (rightAnswer) {
            document.querySelector(".page.practice .first-question .right-ans").src = "../assets/images/general/rightSelected_btn.svg";
        }
        else {
            document.querySelector(".page.practice .first-question .wrong-ans").src = "../assets/images/general/wrongSelected_btn.svg";
        }

        // green line
        let greenLine = El("img", { attributes: { src: "../assets/images/general/rightAnswer.svg" }, cls: "line" });/////////////
        document.querySelector(".question").after(greenLine);
    }
    else {
        rightAnswer = QUESTIONS[currentQuestion].correctAns;
        document.querySelector(".page.practice .answer-container." + rightAnswer + "> .ans").style.borderBottom = "2px solid rgb(44, 191, 55)"; //green
        document.querySelector(".page.practice .answer-container." + rightAnswer + "> .ans").style.paddingBottom = "2%";
    }

    isComplete = true;
}

// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

// עמוד הלמידה
function subjectLearningPage(subject) {
    // הוספת כפתור חזרה למסך הבית
    let backBtn =
        El("img", {
            attributes: { class: "back-btn", src: "../assets/images/general/back_btn.svg" },
            listeners: {
                click: function () {
                    document.querySelector(".page.learning.subjects").classList.add("active");
                    document.querySelector(".page.learning.content").classList.remove("active");
                    resetLearningPage();
                }
            }
        });
    document.querySelector(".page.learning.content").append(backBtn);

    // הוספת כפתור חזרה למסך הבית
    let practiceBtn =
        El("img", {
            attributes: { class: "practice-btn", src: "../assets/images/general/practice_btn.svg" },
            listeners: {
                click: function () {
                    practicePopup(subject);
                }
            }
        });
    document.querySelector(".page.learning.content").append(practiceBtn);

    // הוספת כותרת
    document.querySelector(".page.learning.content .title").innerHTML = subject;
    // הוספת תתי נושאים לכותרת
    let subjects = El("div", { cls: "container-subjects" });
    document.querySelector(".page.learning.content .title").after(subjects);
    
    // הופסת דיב ראשוני לבר הניווט כדי שהתת נושא הראשון יהיה במרכז
    let beforeSpace = El("div", {cls: "space"});
    document.querySelector(".page.learning.content .container-subjects").append(beforeSpace);


    let id = 0;
    // לכל תת נושא 
    for (let sub of Object.keys(DATA[subject].learningContent)) {
        // זה משתנה שמכיל את כל תתי תתי הנושאים לאותו תת נושא 
        let subSubTopics = Object.keys(DATA[subject].learningContent[sub]);

        // יוצר תת נושא ואת כל תת תת הנושאים
        let subTopic =
            El("div", { cls: "sub-topics-container" },
                El("div", { cls: "sub-topic" },
                    El("img", { attributes: { class: "arrow", src: "../assets/images/learning/openArrow_icon.svg" } }),
                    El("div", { cls: "sub-title" }, sub),
                ),
                // יוצר מערך של אלמנטים ומעביר כל אלמנט בנפרד מחוץ למערך (...=)
                ...subSubTopics.map(
                    subSubTopic => El("div", {
                        attributes: { class: "sub-sub-topic" },
                        listeners: { click: () => { relevantCard(subSubTopic) } }
                    }, subSubTopic
                    )
                )
            );
        subTopic.typeIndex = id;

        // מוסיפים את התת נושא לתפריט ניווט
        let menu = document.querySelector(".page.learning.content .container-subjects");
        menu.append(subTopic);

        // מוסיף את כל הכרטיסיות של התת נושא
        let arrCards = subSubTopics.map(subSubTopic => {
            // גייסון של כל תתי תתי הנושא
            let json = DATA[subject].learningContent[sub][subSubTopic];

            let group = El("div", { classes: ["card-group", `sub-${id}`] });
            if (json.length > 1) {
                let next = generateCard(json, subSubTopic, 1);
                next.classList.add("next");
                group.append(next);
            }
            let card = generateCard(json, subSubTopic, 0);
            group.append(card);
            return group;
        });
        document.querySelector(".page.learning.content .cards-container").append(...arrCards);
        id++;
    }
    document.querySelector(".page.learning.content .container-subjects").scrollLeft = document.querySelector(".page.learning.content .container-subjects").scrollWidth;
    
    // הפונקציה גוללת אל הכרטיסייה הנלחצת על ידי החניך 
    function relevantCard(cardTitle) {
        document.querySelectorAll(".page.learning.content .card-group.block").forEach(function (card) {
            if (card.querySelector(".title").textContent === cardTitle) {
                card.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        })
    }

    // יוצר כרטיסייה חדשה
    function generateCard(json, title, index) {
        // משכפל את הטמפלייט של הכרטיסייה
        let template = document.querySelector(`.page.learning.content .templates > .${getType(json[index].cardType)}`);
        // יוצר אלמנט של קונטיינר לתוכן (כדי שתהיה גלילה יפה בתוך הכרטיסייה)
        let container = El("div", { cls: "content-container" });
        let card = El("div", { classes: ["card", getType(json[index].cardType)] }, container);
        container.append(template.content.cloneNode(true));

        let cardType = CARD_TYPES[json[index].cardType];
        cardType.init(card, json[index]);
        card.querySelector(".title").innerHTML = title;
        if (json.length > 1) {
            let buttons =
                El("div", { cls: "next-back-btn" },
                    El("img", { attributes: { src: "../assets/images/exam/next_btn.svg" }, cls: "next", listeners: { click: changeCard.bind(card, "next", json, index) } }),
                    El("img", { attributes: { src: "../assets/images/exam/back_btn.svg" }, cls: "back", listeners: { click: changeCard.bind(card, "back", json, index) } })
                );
            if (index === 0)
                buttons.classList.add("first");
            if (index === json.length - 1)
                buttons.classList.add("last");
            card.append(buttons);
        }
        return card;
    }
    let coolDown = -1;

    // הפונקציה מעבירה לפי הכפתור שנלחץ לכרטיסייה המתאימה בתת תת נושא
    function changeCard(direction, json, index) {
        if (coolDown !== -1) return;
        coolDown = setTimeout(() => coolDown = -1, timeToTransition(this, "transform") + 100);
        if (direction === "back") {
            let next = this.parentElement.querySelector(".card.next");
            let card = generateCard(json, this.querySelector(".title").innerHTML, index - 1);
            card.classList.add("prev");
            this.parentElement.append(card);
            void card.clientWidth;
            card.classList.remove("prev");
            this.classList.add("next");
            if (next) setTimeout(() => next.remove(), timeToTransition(next, "transform"));
        }
        else if (direction === "next") {
            this.classList.add("prev");
            this.parentElement.querySelector(".card.next").classList.remove("next");
            if (json.length - 2 > index) {
                let card = generateCard(json, this.querySelector(".title").innerHTML, index + 2);
                card.classList.add("next");
                this.parentElement.prepend(card);
            }
            setTimeout(() => this.remove(), timeToTransition(this, "transform"));
        }
    }

    // פונקציה שהופכת את כל מה שנמצא עם אות גדולה להפרדה בין מילים עם מקפים
    function getType(type) {
        return type.replace(/.[A-Z]/g, (str) => `${str.substr(0, 1)}-${str.substr(1).toLowerCase()}`);
    }

    // מאזין לגלילה של התתי נושאים, הופך את הנושאים שלא ממורכזים לבעלי שקיפות
    document.querySelector(".page.learning.content .container-subjects").addEventListener("scroll", function () {
        let midPage = window.innerWidth / 2;
        let smallestDifference = 1000;
        let count = 0;

        for (let sub of this.children) {
            let pos = sub.getBoundingClientRect();
            let _positonX = pos.x ? pos.x : 70;
            let positionX = (_positonX + pos.right) / 2;
            // בדיקה מה האלמנט שנמצא כרגע במרכז המסך
            if (Math.abs(midPage - positionX) < smallestDifference) {
                let el = document.querySelector(".sub-topics-container.open");

                if (el !== null && el !== this) {
                    el.classList.remove("open");
                    animateDims(el, true, "height");
                }
                smallestDifference = Math.abs(midPage - positionX);
                midElement = sub;
                midElPlace = count;
            }
            count++;
            sub.style.opacity = "0.6";
        }
        midElement.style.opacity = "";

        let cardGroup = document.querySelectorAll(".page.learning.content .card-group");

        // האם התת נושא שנמצא כרגע באמצע המסך לא שווה לנושא שאמור להיות כרגע באמצע
        // אז התנאי יוסיף את כרטיסיות הלימוד הרלוונטיות
        if (midElPlace !== currSubjCount) {
            currSubjCount = midElPlace;
            document.querySelector(".page.learning.content .cards-container").scrollTop = 0;
            document.querySelectorAll(".page.learning.content .card-group").forEach(el => el.style.display = "");

            // הורדת הבלוק על כל הכרטיסיות בכל התת נושאים
            for (let i = 0; i < cardGroup.length; i++) {
                if (cardGroup[i].classList.contains("block"))
                    cardGroup[i].classList.remove("block");
            }
            // הוספת הבלוק לכרטיסיות הרלוונטיות לפי תת הנושא
            document.querySelectorAll(`.page.learning.content .card-group.sub-${midElement.typeIndex}`).forEach(el => el.classList.add("block"));
        }
    }, { passive: true });

    
    // הוספת מאזין לחיצה בעבור כל תת נושא, ובלחיצה על נושא שאינו במרכז, הפונקציה תעבור אליו בצורה חלקה ויפהה
    document.querySelectorAll(".page.learning.content .sub-topics-container").forEach(el => {
        el.addEventListener("click",
            /**
             * @this {HTMLElement}
            */
            function () {
                // בודק אם התת נושא הקודם כבר היה לחוץ
                let el = document.querySelector(".sub-topics-container.open");
                if (el !== null && el !== this) {
                    el.classList.remove("open");
                    animateDims(el, true, "height");
                }

                // האם האלמנט הנוכחי שנלחץ הוא לא במרכז
                if (midElement !== this) {
                    // מעבר אל האלמנט הנלחץ שיהיה במרכז המסך
                    let parent = this.parentElement;
                    
                    // זה עובד טוב כשרואים על המחשב
                    // let scroll = (parent.scrollWidth - parent.offsetWidth) + this.offsetLeft - (parent.offsetWidth - this.offsetWidth) / 2;
                    // parent.scrollLeft = scroll;

                    // האם מיקום האלמנט הנלחץ גדול ממיקום האלמנט המרכזי 
                    if(this.offsetLeft > midElement.offsetLeft)
                        parent.scrollLeft += this.offsetWidth;
                    else
                        parent.scrollLeft -= this.offsetWidth;

                    // האלמנט שנלחץ הוא כבר במרכז המסך
                } else {
                    let opened = this.classList.toggle("open"); 
                    animateDims(this, !opened, "height");
                }
            })
    });
}

// ניקוי עמוד הלמידה לאחר יציאה ממנו
function resetLearningPage() {
    currSubjCount = -1;
    document.querySelector(".page.learning.content .cards-container").innerHTML = "";
    document.querySelector(".page.learning.content .container-subjects").remove();
    document.querySelector(".page.learning.content .practice-btn").remove();
    document.querySelector(".page.learning.content .back-btn").remove();
}

//
function practicePopup(subject) {
    document.querySelector(".page.learning.content .title").style.filter = `blur(${blurAmount})`;
    document.querySelector(".page.learning.content .container-subjects").style.filter = `blur(${blurAmount})`;
    document.querySelector(".page.learning.content .practice-btn").style.filter = `blur(${blurAmount})`;
    document.querySelector(".page.learning.content .back-btn").style.filter = `blur(${blurAmount})`;
    document.querySelector(".page.learning.content .cards-container").style.filter = `blur(${blurAmount})`;
    let popup =
        El("div", { cls: "dark" },
            // כל הקלף
            El("div", { cls: "before-practice-one-sub" },
                El("img", {
                    attributes: {
                        src: "../assets/images/general/close_btn.svg", class: "close-btn"
                    }, listeners: {
                        // // כפתור סגירה של הפופאפ
                        click: function () {
                            document.querySelector(".page.learning.content .title").style.filter = "unset";
                            document.querySelector(".page.learning.content .container-subjects").style.filter = "unset";
                            document.querySelector(".page.learning.content .practice-btn").style.filter = "unset";
                            document.querySelector(".page.learning.content .back-btn").style.filter = "unset";
                            document.querySelector(".page.learning.content .cards-container").style.filter = "unset";
                            document.querySelector(".page.learning.content .dark").remove();
                        }
                    }
                }),
                // כותרת
                El("div", { cls: "title-popup" }, "לפני שמתחילים"),
                El("div", { cls: "instructions-practice" },
                    // בלוק 1
                    El("div", { cls: "instruction-practice" },
                        El("div", { cls: "text" },
                            El("b", {}, "דקה"),
                            " לכל שאלה",
                        ),
                        El("img", { attributes: { src: "../assets/images/exam/beforeExam_popup/timer_icon.svg", class: "icon2" } }),
                    ),
                    El("div", { cls: "grey-line" }),
                    // בלוק 2
                    El("div", { cls: "instruction-practice" },
                        El("div", { cls: "text" },
                            "זה רק",
                            El("b", {}, " תרגול")
                        ),
                        El("img", { attributes: { src: "../assets/images/practice/beforePractice_popup/blow_icon.svg", class: "icon2" } }),
                    ),
                    El("div", { cls: "grey-line" }),
                    // בלוק 3
                    El("div", { cls: "instruction-practice" },
                        El("div", { cls: "text" },
                        El("b", {}, " הקליקו") ,
                            " למעבר בין השאלות",
                        ),
                        El("img", { attributes: { src: "../assets/images/practice/beforePractice_popup/slide_icon.svg", class: "icon4" } }),
                    ),
                    El("div", { cls: "grey-line" }),
                ),
                El("img", {
                    attributes: {
                        src: "../assets/images/general/ok_btn.svg", class: "start-btn"
                    }, listeners: {
                        click: function () {
                            // כפתור מעבר למבחן מהפופאפ
                            document.querySelector(".page.learning.content .title").style.filter = "unset";
                            document.querySelector(".page.learning.content .container-subjects").style.filter = "unset";
                            document.querySelector(".page.learning.content .practice-btn").style.filter = "unset";
                            document.querySelector(".page.learning.content .back-btn").style.filter = "unset";
                            document.querySelector(".page.learning.content .cards-container").style.filter = "unset";
                            document.querySelector(".page.learning.content .dark").remove();
                            document.querySelector(".page.learning.content").classList.remove("active");
                            document.querySelector(".page.practice").classList.add("active");
                            theChosenSub(subject);
                            resetLearningPage();
                            practicePage();
                        }
                    }
                })
            )
        );

    document.querySelector(".page.learning.content").append(popup);
}
function theChosenSub(subject) {
    for (let i = 0; i < SUBJECTS_TITLES.length; i++) {
        selectedSubjects[i] = false;
    }
    for (let i = 0; i < SUBJECTS_TITLES.length; i++) {
        if (subject === SUBJECTS_TITLES[i]) {
            selectedSubjects[i] = true;
            return;
        }
    }
}

// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

// הפונקצייה מוסיפה 
function timeOver(page) {
    // עצירת הטיימר
    if (page === "practice") {
        clearInterval(timer);
        showAnswer();
    }
    // החניך היה באמצע מבחן
    else {
        // איפוס הזמן
        clearInterval(timerExam);

        // הוספה לרקע טשטוש
        document.querySelector(`.page.${page} .title`).style.filter = `blur(${blurAmount})`;
        document.querySelector(`.page.${page} .back-btn`).style.filter = `blur(${blurAmount})`;
        if (page === "practice") {
            document.querySelector(`.page.${page} .score`).style.filter = `blur(${blurAmount})`;
            document.querySelector(`.page.${page} .container-questions`).style.filter = `blur(${blurAmount})`;
            document.querySelector(`.page.${page} .buttons`).style.filter = `blur(${blurAmount})`;
        }
        else {
            document.querySelector(`.page.${page} .questions-container`).style.filter = `blur(${blurAmount})`;
            document.querySelector(`.page.${page} .questions-number`).style.filter = `blur(${blurAmount})`;
            document.querySelector(`.page.${page} .sub-titles`).style.filter = `blur(${blurAmount})`;
        }
        // הוספת פופאפ
        let popup =
            El("div", { cls: "dark" },
                El("div", { cls: "exit-popup", },
                    El("div", { cls: "title-popup" }, "נגמר הזמן..."),
                    El("div", { cls: "sub-title-popup" }, "פעם הבאה ענו קצת יותר מהר:)"),
                    El("div", { cls: "buttons-exit-popup" },
                        // כפתור חזרה למסך הבית
                        El("img", {
                            attributes: {
                                src: "../assets/images/general/leavePracticeOrExam_popup/back.svg", class: "button-popup",
                            }, listeners: {
                                click: function () {
                                    // כפתור יציאה מהתרגול או מהמבחן למסך הבית
                                    document.querySelector(`.page.${page} .title`).style.filter = "unset";
                                    document.querySelector(`.page.${page} .back-btn`).style.filter = "unset";
                                    if (page === "practice") {
                                        document.querySelector(`.page.${page} .score`).style.filter = "unset";
                                        document.querySelector(`.page.${page} .container-questions`).style.filter = "unset";
                                        document.querySelector(`.page.${page} .buttons`).style.filter = "unset";
                                    }
                                    else {
                                        document.querySelector(`.page.${page} .questions-container`).style.filter = "unset";
                                        document.querySelector(`.page.${page} .questions-number`).style.filter = "unset";
                                        document.querySelector(`.page.${page} .sub-titles`).style.filter = "unset";
                                    }
                                    document.querySelector(".page .dark").remove();
                                    document.querySelector(`.page.${page}`).classList.remove("active");
                                    document.querySelector(`.page.learning.subjects`).classList.add("active");

                                    if (page === "exam") {
                                        let examStatus = "quit";
                                        resetExamPage(examStatus);
                                    }
                                    else {
                                        resetPrecticePage(false);
                                    }
                                }
                            }
                        }),
                        // כפתור חזרה לניסיון נוסף לתרגול או המבחן
                        El("img", {
                            attributes: {
                                src: "../assets/images/general/tryAgainBtn.svg", class: "button-popup"
                            }, listeners: {
                                click: function () {
                                    // חזרה על המבחן או התרגול
                                    document.querySelector(`.page.${page} .title`).style.filter = "unset";
                                    document.querySelector(`.page.${page} .back-btn`).style.filter = "unset";
                                    if (page === "practice") {
                                        document.querySelector(`.page.${page} .score`).style.filter = "unset";
                                        document.querySelector(`.page.${page} .container-questions`).style.filter = "unset";
                                        document.querySelector(`.page.${page} .buttons`).style.filter = "unset";
                                    }
                                    else {
                                        document.querySelector(`.page.${page} .questions-container`).style.filter = "unset";
                                        document.querySelector(`.page.${page} .questions-number`).style.filter = "unset";
                                        document.querySelector(`.page.${page} .sub-titles`).style.filter = "unset";
                                    }
                                    document.querySelector(".page .dark").remove();
                                    // החניך היה באמצע תרגול
                                    if (page === "practice") {
                                        practiceSeconds = AMOUNT_OF_TIME_TO_QUESTION;
                                        resetPrecticePage(false);
                                        practicePage();
                                    }
                                }
                            }
                        })
                    )
                )

            )
        document.querySelector(`.page.${page}`).append(popup);
    }
}


// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

/*
             shuffle
            =========
Description: take orgnaiz array and shffel it
Parameters: array.
------------------------------------------------
Programer: Gal
------------------------------------------------
*/
function shuffle(arr) {
    var tmp = arr.slice();
    for (var i = 0; i < arr.length; i++) {
        var index = Math.floor(Math.random() * tmp.length);
        arr[i] = tmp[index];
        tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
    }
    return arr;
}