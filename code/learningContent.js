/************************     הוראות חשובות      ***********************/

/**
 
 1.   במידה וזאת פעם ראשונה שלכם ממלאים תוכן בלומדה, קראו את **קובץ הוורד** המצורף בתקייה
 2.   בעמוד זה יש למלא את הפרטים לגבי כל המידע והתוכן המבוקש
 3.   [amountOfQuestions במשתנה] לשים לב שבכל נושא צריך לכתוב את *כמות השאלות המקסימלית* שתלקח ממנו
      **משתנה זה מתייחס רק לשאלות שיילקחו בשביל **המבחן
 */


/************************      הכנס כותרת ראשית שהיא שם הלומדה      ***********************/
const TITLE = "לומדת בטיחות";

/************************      הכנס כמות זמן התחלתית של המבחן      ***********************/
const TIME_FOR_EXAM = "7:00";

// אובייקט המכיל את כל המידע של הלומדה הכולל את התוכן, השאלות לכל נושא וכמות השאלות שיילקח מכל נושא למבחן
const DATA = { 
    // נושא
    'בה"ד 6': {
        "icon":  "../assets/images/icons/bhd6.png",
        // שאלות לנושא הזה
        "questions": [ 
            {
                type: "multiple",
                question: "יצאת הביתה ולא קיבלת תדריך יציאה ממפקדך. כיצד תנהג?",
                ans1: 'אלך הביתה רגיל, זה הסופ"ש שלי.',
                ans2: "אצלצל אליו ואודיע לו שלא תודרכתי.",
                ans3: 'אני סגל ומתדרך חיילים בעצמי, אני לא צריך תדר"צ.',
                ans4: "אני מספיק בוגר לדאוג לעצמי ולהזהר.",
                correctAns: "ans2"
            },
            {
                type: "multiple",
                question: "לפני מעבר חצייה עליך בתוך נהג?",
                ans1: 'לנסוע רגיל. אולי להאט טיפה, אך זכותי לעבור.',
                ans2: "להאט ולהסתכל שאף אחד לא רוצה לחצות.",
                ans3: 'להאט ולתת למי שמתכוון לעבור.',
                ans4: "תשובות ב' וג' נכונות.",
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: "האם מותר לגעת בטלפון הנייד בנסיעה ברכב פרטי?(אתה הנהג)",
                ans1: 'כן בהחלט. כל עוד הנייד מוחזק על ידי נוסע צמוד לאוזן הנהג.',
                ans2: "כן. ברכב פרטי מותר לדבר בנייד, זה לא בצבא.",
                ans3: 'מותר לדבר רק בדיבורית תקנית כשהמכשיר מוחזק במתקן קבוע.',
                ans4: "בשום פנים ואופן לא. אסור לדבר בטלפון הנייד בנסיעה.",
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: "עליך לנהוג לרמת הגולן וישנת 5 שעות בלילה. מה תעשה?",
                ans1: 'אסע לאט, אעצור לרענונים ואסיים את המשימה.',
                ans2: "אעצור לישון בצד הדרך כדי להשלים שעות שינה.",
                ans3: "אודיע למפקד המשלח שלא ישנתי 7 שעות שינה ולא אצא למשימה.",
                ans4: 'אדאג שיהיה איתי מפקד עירני ואסע בזהירות.',
                correctAns: "ans3"
            },
            {
                type: "multiple",
                question: 'כמה מותר לך לשתות ולנהוג בסופ"ש?',
                ans1: 'חל איסור מוחלט על חיילים לשתות כל כמות ולנהוג.',
                ans2: "מותר לשתות כוסית על בטן מלאה.",
                ans3: "בירה לא באמת משפיעה על הנהיגה שלי.",
                ans4: 'כעיקרון אסור לשתות, אבל כוס יין אחת לא משפיעה.',
                correctAns: "ans1"
            },
            {
                type: "multiple",
                question: 'אתה נוסע בכביש מהיר בחורף והראות לא טובה. מה תעשה?',
                ans1: 'אסע לאט, אדאג להפשיר אדים ובמידת הצורך אעצור בתחנת רענון או תחנת דלק.',
                ans2: 'אסע באופן מותאם לתנאי הדרך, אבל הסופ"ש בפתח.',
                ans3: 'אדליק חום באוטו כדי להפשיר אדים.',
                ans4: 'אסע רגיל. כמובן אשים לב שאני לא עובר את המהירות המותרת.',
                correctAns: "ans1"
            },
            {
                type: "multiple",
                question: 'עליך לפנות חייל למיון בשעה 18:00 בימים אלו -מה עליך לעשות?',
                ans1: 'אקח את החייל למיון עם הנהג התורן.',
                ans2: 'אקבל תדריך ואישור מהממ"ג (סא"ל) אחרי השעה 17:00.',
                ans3: 'אין צורך באישור, רק לקחת מפקד נסיעה.',
                ans4: 'אדאג שהנהג ישן מספיק ואסע איתו למיון.',
                correctAns: "ans2"
            },
            {
                type: "multiple",
                question: 'נתקעת עם הרכב בכביש 6 צפונה. כיצד תפעל?(רכב לא מניע)',
                ans1: 'אעצור בצד הדרך קרוב ככל האפשר למעקה הבטיחות.',
                ans2: 'אצלצל לשירותי בדרך של כביש 6 ואמתין להם.',
                ans3: 'אעבור מעבר למעקה הבטיחות יחד עם כל נוסעי הרכב.',
                ans4: 'כל התשובות נכונות.',
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: 'אתה נוסע באופנוע לבסיס. האם צריך אישור לכך?',
                ans1: 'לא. האופנוע שלי ואין צורך באישור.',
                ans2: 'כן. מפקד הבה"ד חייב לאשר לי בכתב הגעה באופנוע לבסיס.',
                ans3: 'אין צורך באישור שכן מדובר ברכוש פרטי.',
                ans4: 'כן. מפקד המגמה צריך לאשר לי להגיע עם אופנוע.',
                correctAns: "ans2"
            },
            {
                type: "multiple",
                question: 'אתה נמצא בשטח והייתה נזילת סולר לקרקע. מה תעשה?',
                ans1: 'אספוג את הסולר עם חול ואכסה כדי למנוע אירוע סביבתי.',
                ans2: 'אין מה לעשות, מה שנשפך אי אפשר לאסוף.',
                ans3: 'אספח את הסולר באמצעות סופחנים ואאגור את החול/אדמה הספוגה, כדי שלא ירד למי תהום.',
                ans4: 'אשפוך מים כדי לנקות את הכתם מעל פני הקרקע.',
                correctAns: "ans3"
            },
            {
                type: "multiple",
                question: 'האם במקרה של אירוע סביבתי(שפך שמעל 5 ליטר חומר מסוכן לקרקע) חייב להודיע למישהו בבסיס?',
                ans1: 'לא.',
                ans2: 'בהחלט לא, אנקה בעצמי.',
                ans3: 'בהחלט כן, חובה להודיע לממונה הגנ"ס בבסיס.',
                ans4: 'קודם אטפל באירוע, אחר כך אם יש צורך אודיע לממונה.',
                correctAns: "ans3"
            },
            {
                type: "multiple",
                question: 'מי אחראי אחריות ישירה ופלילית על אירוע סביבתי?',
                ans1: 'החייל שגרם לאירוע.',
                ans2: 'מפקד היחידה בה קרה האירוע.',
                ans3: 'ממונה הגנ"ס יחידתי.',
                ans4: 'תשובות א וב נכונות.',
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: 'במה תלוי המשקל שעובד יכול להרים?',
                ans1: 'גיל, גובה ומבנה הגוף.',
                ans2: '.מבנה גוף ומשקלו של החייל',
                ans3: ' מבנה גוף , מין, גיל העובד.',
                ans4: 'ביכולת העובד להרים אותו.',
                correctAns: "ans3"
            },
            {
                type: "multiple",
                question: 'האם יכול עובד להרים משקל גדול מהמותר בטבלאות שראית בסרטון?',
                ans1: 'כן בהחלט, כל אדם והיכולת שלו.',
                ans2: 'כן בהחלט, תלוי במצב הגוף של העובד.',
                ans3: 'חל איסור מוחלט לחרוג מהמשקלים המצויינים בטבלה.',
                ans4: 'במקרים מסויימים כשאין ברירה, ניתן להרים יותר מהמותר.',
                correctAns: "ans3"
            },
            {
                type: "multiple",
                question: 'האם מפקד יכול להורות לחייל להרים משקל גדול מהמותר?',
                ans1: 'כן בהחלט, זהו תפקידו של מפקד.',
                ans2: 'לא.',
                ans3: 'כן, במקרים מסויימים כשממש חייב.',
                ans4: 'לא, אלא אם נעזר בחייל נוסף והמשקל מתחלק לנורמה תקינה.',
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: 'עליך להעמיס משקל גדול למשאית הובלה שהוזמנה לך מראש ע"י המפקד. כיצד תפעל?',
                ans1: 'אעמיס המשקל הנדרש.',
                ans2: 'אבקש עזרה מחבר כדי לחלק את המשקל לערכים המותרים להרמה.',
                ans3: 'במידה והמשקל גדול מהמותר אשתמש במלגזה או מכונת הרמה .',
                ans4: 'תשובות ב וג נכונות.',
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: 'על מי חלה אחריות לספק ציוד הרמה להרמת משקלים גדולים?',
                ans1: 'מפקד או מי מטעמו מחוייבים לספק ציוד הרמה ולהדריך העובדים להשתמש בו.',
                ans2: 'על העובד חלה חובה להשתמש בציוד זה לאחר שקיבל הדרכה ומכיר את הסיכונים.',
                ans3: ' אין כל חובה לספק ציוד הרמה בבסיסי צה"ל.',
                ans4: 'תשובות א ו ב נכונות.',
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: 'טרם טיפול במערכת חשמל:',
                ans1: 'יש לוודא ניתוק חשמל.',
                ans2: 'יש לעבוד על נעלי בטיחות מבודדות חשמל.',
                ans3: 'היתר בטיחות, ניתוק, שילוט ונעילת מקור ההזנה.',
                ans4: 'כל התשובות נכונות.',
                correctAns: "ans4"
            },

        ],
        "amountOfQuestions": 18,
        "learningContent": {
            'בטיחות בדרכים': {
                "חסר שקופית 8": [ 
                    {
                        cardType: "video",
                        video: "../assets/images/videos&photos/vid1.mp4"
                    },
                ],
                "חסר שקופית 9": [ 
                    {
                        cardType: "video",
                        video: "../assets/images/videos&photos/vid2.mp4"
                    },
                ],
                "חסר שקופית 10": [ 
                    {
                        cardType: "video",
                        video: "../assets/images/videos&photos/vid3.mp4"
                    },
                ]
            },
            "בטיחות באש": {
                "חסר שקופית 12": [
                    {
                        cardType: "video",
                        video: "../assets/images/videos&photos/vid4.mp4",
                    }
                ]
            },
            "הגנת הסביבה": {
                "חסר שקופית 14": [
                    {
                        cardType: "video",
                        video: "../assets/images/videos&photos/vid5.mp4",
                    }
                ]
            },
            "טלטול והרמה": {
                "חסר שקופית 16": [
                    {
                        cardType: "video",
                        video: "../assets/images/videos&photos/vid6.mp4",
                    }
                ],
                "תת תת נושא 23": [
                    {
                        cardType: "listDots3",
                        subTitle: "כותרת לרשימה:",
                        li1:"משפט ראשון ברשימה, זה לדוגמה משט יחסית ארוך משאר המשפטים ויש נקודה בסוף המשפט.",
                        li2:"משפט שני ברשימה",
                        li3:"משפט שלישי ברשימה",
                    },
                    {
                        cardType: "listNumbers3",
                        subTitle: "כותרת לרשימה:",
                        li1:"משפט ראשון ברשימה, זה לדוגמה משט יחסית ארוך משאר המשפטים ויש נקודה בסוף המשפט.",
                        li2:"משפט שני ברשימה",
                        li3:"משפט שלישי ברשימה",
                    }
                ]
            },
            "בטיחות בחשמל": {       
                "חסר שקופית 18": [
                    {
                        cardType: "video",
                        video: "../assets/images/videos&photos/vid7.mp4",
                    }
                ]
            }
        },
    },
    // נושא
    'בה"ד 7': {
        "icon":  "../assets/images/icons/bhd7.png",
        // שאלות לנושא הזה
        "questions": [
            {
                type: "multiple",
                question: "שאלהה שאלתית ששואלת מלא שאלות",
                ans1: "תשובה כלשהית  נכונה",
                ans2: "תשובה לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "אל תלחצו! זה טעות",
                correctAns: "ans1"
            },
            {
                type: "binary",
                sentence: "עוד שאלה לא נכונה על חתולים",
                trueOrFalse: false
            },
            {
                type: "multiple",
                question: "שאלה על מכוניות",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "תלחצו עליי אני תשובה נכונה",
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: "שאלה שאלתית על מכוניות וזה משפט ארוך",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה תשובה ממש נכונה!",
                ans4: "אל תלחצו עליי אני תשובה לא נכונה",
                correctAns: "ans3"
            },
            {
                type: "binary",
                sentence: "עוד שאלה על מכוניות שנוסעות ממש ממש מהר והיא לא נכונה בכלל",
                trueOrFalse: false
            },
            {
                type: "binary",
                sentence: "היי זאת תשובה לא נכונה",
                trueOrFalse: false
            },
            {
                type: "multiple",
                question: "שאלהה שאלתית ששואלת מלא שאלות",
                ans1: "תשובה כלשהית  נכונה",
                ans2: "תשובה לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "אל תלחצו! זה טעות",
                correctAns: "ans1"
            },
            {
                type: "binary",
                sentence: "עוד שאלה לא נכונה על חתולים",
                trueOrFalse: false
            },
            {
                type: "multiple",
                question: "שאלה על מכוניות",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "תלחצו עליי אני תשובה נכונה",
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: "שאלה שאלתית על מכוניות וזה משפט ארוך",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה תשובה ממש נכונה!",
                ans4: "אל תלחצו עליי אני תשובה לא נכונה",
                correctAns: "ans3"
            },
            {
                type: "binary",
                sentence: "עוד שאלה על מכוניות שנוסעות ממש ממש מהר והיא לא נכונה בכלל",
                trueOrFalse: false
            },
            {
                type: "binary",
                sentence: "היי זאת תשובה לא נכונה",
                trueOrFalse: false
            }
        ],
        "amountOfQuestions": 2,
        "learningContent": {
            // סוג הכרטיסייה
            "textAndPic": {

            }
        },
        
    },
    // נושא
    'בה"ד 10': {
        "icon":  "../assets/images/icons/bhd10.png",
        // שאלות לנושא הזה
        "questions": [
            {
                type: "multiple",
                question: "שאלהה שאלתית ששואלת מלא שאלות",
                ans1: "תשובה כלשהית  נכונה",
                ans2: "תשובה לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "אל תלחצו! זה טעות",
                correctAns: "ans1"
            },
            {
                type: "binary",
                sentence: "עוד שאלה לא נכונה על חתולים",
                trueOrFalse: false
            },
            {
                type: "multiple",
                question: "שאלה על מכוניות",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "תלחצו עליי אני תשובה נכונה",
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: "שאלה שאלתית על מכוניות וזה משפט ארוך",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה תשובה ממש נכונה!",
                ans4: "אל תלחצו עליי אני תשובה לא נכונה",
                correctAns: "ans3"
            },
            {
                type: "binary",
                sentence: "עוד שאלה על מכוניות שנוסעות ממש ממש מהר והיא לא נכונה בכלל",
                trueOrFalse: false
            },
            {
                type: "binary",
                sentence: "היי זאת תשובה לא נכונה",
                trueOrFalse: false
            }
        ],
        "learningContent": {
            // סוג הכרטיסייה
            "textAndPic": {

            }
        },
        "amountOfQuestions": 0
    },
    // נושא
    'בה"ד 11': {
        "icon":  "../assets/images/icons/bhd11.png",
        // שאלות לנושא הזה
        "questions": [
            {
                type: "multiple",
                question: "שאלהה שאלתית ששואלת מלא שאלות",
                ans1: "תשובה כלשהית  נכונה",
                ans2: "תשובה לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "אל תלחצו! זה טעות",
                correctAns: "ans1"
            },
            {
                type: "binary",
                sentence: "עוד שאלה לא נכונה על חתולים",
                trueOrFalse: false
            },
            {
                type: "multiple",
                question: "שאלה על מכוניות",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "תלחצו עליי אני תשובה נכונה",
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: "שאלה שאלתית על מכוניות וזה משפט ארוך",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה תשובה ממש נכונה!",
                ans4: "אל תלחצו עליי אני תשובה לא נכונה",
                correctAns: "ans3"
            },
            {
                type: "binary",
                sentence: "עוד שאלה על מכוניות שנוסעות ממש ממש מהר והיא לא נכונה בכלל",
                trueOrFalse: false
            },
            {
                type: "binary",
                sentence: "היי זאת תשובה לא נכונה",
                trueOrFalse: false
            }
        ],
        "learningContent": {
            // סוג הכרטיסייה
            "textAndPic": {

            }
        },
        "amountOfQuestions": 0
    },
    // נושא
    'בה"ד חינוך': {
        "icon":  "../assets/images/icons/bhdHinuch.png",
        // שאלות לנושא הזה
        "questions": [
            {
                type: "multiple",
                question: "שאלהה שאלתית ששואלת מלא שאלות",
                ans1: "תשובה כלשהית  נכונה",
                ans2: "תשובה לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "אל תלחצו! זה טעות",
                correctAns: "ans1"
            },
            {
                type: "binary",
                sentence: "עוד שאלה לא נכונה על חתולים",
                trueOrFalse: false
            },
            {
                type: "multiple",
                question: "שאלה על מכוניות",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "תלחצו עליי אני תשובה נכונה",
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: "שאלה שאלתית על מכוניות וזה משפט ארוך",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה תשובה ממש נכונה!",
                ans4: "אל תלחצו עליי אני תשובה לא נכונה",
                correctAns: "ans3"
            },
            {
                type: "binary",
                sentence: "עוד שאלה על מכוניות שנוסעות ממש ממש מהר והיא לא נכונה בכלל",
                trueOrFalse: false
            },
            {
                type: "binary",
                sentence: "היי זאת תשובה לא נכונה",
                trueOrFalse: false
            }
        ],
        "learningContent": {
            // סוג הכרטיסייה
            "textAndPic": {

            }
        },
        "amountOfQuestions": 0
    },
    // נושא
    'בה"ד 13': {
        "icon":  "../assets/images/icons/bhd13.png",
        // שאלות לנושא הזה
        "questions": [
            {
                type: "multiple",
                question: "שאלהה שאלתית ששואלת מלא שאלות",
                ans1: "תשובה כלשהית  נכונה",
                ans2: "תשובה לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "אל תלחצו! זה טעות",
                correctAns: "ans1"
            },
            {
                type: "binary",
                sentence: "עוד שאלה לא נכונה על חתולים",
                trueOrFalse: false
            },
            {
                type: "multiple",
                question: "שאלה על מכוניות",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "תלחצו עליי אני תשובה נכונה",
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: "שאלה שאלתית על מכוניות וזה משפט ארוך",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה תשובה ממש נכונה!",
                ans4: "אל תלחצו עליי אני תשובה לא נכונה",
                correctAns: "ans3"
            },
            {
                type: "binary",
                sentence: "עוד שאלה על מכוניות שנוסעות ממש ממש מהר והיא לא נכונה בכלל",
                trueOrFalse: false
            },
            {
                type: "binary",
                sentence: "היי זאת תשובה לא נכונה",
                trueOrFalse: false
            }
        ],
        "learningContent": {
            // סוג הכרטיסייה
            "textAndPic": {

            }
        },
        "amountOfQuestions": 0
    },
    // נושא
    'בה"ד 20': {
        "icon":  "../assets/images/icons/bhd20.png",
        // שאלות לנושא הזה
        "questions": [
            {
                type: "multiple",
                question: "שאלהה שאלתית ששואלת מלא שאלות",
                ans1: "תשובה כלשהית  נכונה",
                ans2: "תשובה לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "אל תלחצו! זה טעות",
                correctAns: "ans1"
            },
            {
                type: "binary",
                sentence: "עוד שאלה לא נכונה על חתולים",
                trueOrFalse: false
            },
            {
                type: "multiple",
                question: "שאלה על מכוניות",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "תלחצו עליי אני תשובה נכונה",
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: "שאלה שאלתית על מכוניות וזה משפט ארוך",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה תשובה ממש נכונה!",
                ans4: "אל תלחצו עליי אני תשובה לא נכונה",
                correctAns: "ans3"
            },
            {
                type: "binary",
                sentence: "עוד שאלה על מכוניות שנוסעות ממש ממש מהר והיא לא נכונה בכלל",
                trueOrFalse: false
            },
            {
                type: "binary",
                sentence: "היי זאת תשובה לא נכונה",
                trueOrFalse: false
            }
        ],
        "learningContent": {
            // סוג הכרטיסייה
            "textAndPic": {

            }
        },
        "amountOfQuestions": 0
    },
    // נושא
    'מפקדות': {
        "icon":  "../assets/images/icons/Hadraha.png",
        // שאלות לנושא הזה
        "questions": [
            {
                type: "multiple",
                question: "שאלהה שאלתית ששואלת מלא שאלות",
                ans1: "תשובה כלשהית  נכונה",
                ans2: "תשובה לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "אל תלחצו! זה טעות",
                correctAns: "ans1"
            },
            {
                type: "binary",
                sentence: "עוד שאלה לא נכונה על חתולים",
                trueOrFalse: false
            },
            {
                type: "multiple",
                question: "שאלה על מכוניות",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה מאוד",
                ans4: "תלחצו עליי אני תשובה נכונה",
                correctAns: "ans4"
            },
            {
                type: "multiple",
                question: "שאלה שאלתית על מכוניות וזה משפט ארוך",
                ans1: "תשובה כלשהית לא נכונה",
                ans2: "תשובה בכלל לא נכונה",
                ans3: "תשובה לא נכונה תשובה ממש נכונה!",
                ans4: "אל תלחצו עליי אני תשובה לא נכונה",
                correctAns: "ans3"
            },
            {
                type: "binary",
                sentence: "עוד שאלה על מכוניות שנוסעות ממש ממש מהר והיא לא נכונה בכלל",
                trueOrFalse: false
            },
            {
                type: "binary",
                sentence: "היי זאת תשובה לא נכונה",
                trueOrFalse: false
            }
        ],
        "learningContent": {
            // סוג הכרטיסייה
            "textAndPic": {

            }
        },
        "amountOfQuestions": 0
    },
};



/********************************************************************************************************/
/********************************************************************************************************/
/********************************************************************************************************/
/*****  אובייקטים לפי סוג הכרטיסייה המכניסים את התוכן של כל כרטיסייה אל תוך הכרטיסייה  ********/

/**
 * @type {{[index: string]: {init: (card: HTMLElement, json: any) => void}}}
 */
let CARD_TYPES = {};

CARD_TYPES.text = {
    init(card, json) {
        card.querySelector(".content").innerHTML = json.content;
    }
}

CARD_TYPES.textTwoParagraphs = {
    init(card, json) {
        card.querySelector(".text1").innerHTML = json.text1;
        card.querySelector(".text2").innerHTML = json.text2;
    }
}

CARD_TYPES.textThreeParagraphs = {
    init(card, json) {
        card.querySelector(".text1").innerHTML = json.text1;
        card.querySelector(".text2").innerHTML = json.text2;
        card.querySelector(".text3").innerHTML = json.text3;
    }
}

CARD_TYPES.picAndText = {
    init(card, json) {
        card.querySelector(".pic").src = json.pic;
        card.querySelector(".content").innerHTML = json.content;
    }
}
CARD_TYPES.twoPics = {
    init(card, json) {
        card.querySelector(".pic1").src = json.pic1;
        card.querySelector(".content1").innerHTML = json.content1;
        card.querySelector(".pic2").src = json.pic2;
        card.querySelector(".content2").innerHTML = json.content2;
    }
}
CARD_TYPES.video = {
    init(card, json) {
        card.querySelector(".video").src = json.video;
    }
}
CARD_TYPES.videoAndText = {
    init(card, json) {
        card.querySelector(".video").src = json.video;
        card.querySelector(".content").innerHTML = json.content;
    }
}
CARD_TYPES.pic_4titles_4text = {
    init(card, json) {
        card.querySelector(".pic").src = json.pic;
        card.querySelector(".sub-title1").innerHTML = json.subTitle1;
        card.querySelector(".content1").innerHTML = json.content1;
        card.querySelector(".sub-title2").innerHTML = json.subTitle2;
        card.querySelector(".content2").innerHTML = json.content2;
        card.querySelector(".sub-title3").innerHTML = json.subTitle3;
        card.querySelector(".content3").innerHTML = json.content3;
        card.querySelector(".sub-title4").innerHTML = json.subTitle4;
        card.querySelector(".content4").innerHTML = json.content4;
    }
}
CARD_TYPES._3titles_3text = {
    init(card, json) {
        card.querySelector(".sub-title1").innerHTML = json.subTitle1;
        card.querySelector(".content1").innerHTML = json.content1;
        card.querySelector(".sub-title2").innerHTML = json.subTitle2;
        card.querySelector(".content2").innerHTML = json.content2;
        card.querySelector(".sub-title3").innerHTML = json.subTitle3;
        card.querySelector(".content3").innerHTML = json.content3;
    }
}
CARD_TYPES.listDots3 = {
    init(card, json) {
        card.querySelector(".sub-title").innerHTML = json.subTitle;
        card.querySelector(".li1").innerHTML = json.li1;
        card.querySelector(".li2").innerHTML = json.li2;
        card.querySelector(".li3").innerHTML = json.li3;
    }
}
CARD_TYPES.listNumbers3 = {
    init(card, json) {
        card.querySelector(".sub-title").innerHTML = json.subTitle;
        card.querySelector(".li1").innerHTML = json.li1;
        card.querySelector(".li2").innerHTML = json.li2;
        card.querySelector(".li3").innerHTML = json.li3;
    }
}