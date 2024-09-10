// ==UserScript==
// @name         Auto Grade EduNext
// @namespace    http://localhost/
// @version      2024-06-18
// @description  try to take over the world!
// @author       btcj
// @match        https://fu-edunext.fpt.edu.vn/course/activity/question?id=*
// @icon         https://fu-edunext.fpt.edu.vn/assets/favicon-C09Xwo_-.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("Auto grade is working...");

    let buttonContainer = null;
    let timer = 500;

    let appendAutoGradeButton = () => {
        buttonContainer.insertAdjacentHTML("beforeend",'<button id="edunextScript__button_auto_grade" type="button" style="border-radius:4px;background-color:#FF4336;color:#ffffff;height:40px;border:0px;outline:0px;text-decoration:none;font-weight:500;font-size:0.875rem;line-height:1.75;text-transform:uppercase;min-width:64px;box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;">AUTO GRADE</button>');
        const buttonAutoGrade = document.querySelector("#edunextScript__button_auto_grade");
        buttonAutoGrade.addEventListener("click", (event) => {
            event.target.textContent = "GRADING...";
            // I know it's ugly but we need to defer the execution of autoGrade
            setTimeout(() => {
                autoGrade(buttonContainer);
            }, 0);
            setTimeout(() => {
                event.target.textContent = "AUTO GRADE";
            }, 0);
        });
    }

    let autoGrade = (container) => {
        const ratingBars = document.querySelectorAll("body > div.MuiDialog-root.modal-grade.edu-modal.MuiModal-root.css-74waha > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogContent-root.css-1ty026z > div > div > table > tbody > tr > td > span > input:nth-child(10)")
        ratingBars.forEach((inp) => {
            inp.click()
        });
    };

    let restartInterval = () => {
        const cancelRatingButton = document.querySelector("body > div.MuiDialog-root.modal-grade.edu-modal.MuiModal-root.css-74waha > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogActions-root.MuiDialogActions-spacing.css-1vskg8q > button.MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-colorPrimary.edu-button.css-1ox964v")
        cancelRatingButton.addEventListener("click", () => {
            buttonContainer = null;
            autoGradeInterval();
        });
    }

    let autoGradeInterval = () => {
        let findButtonContainerInterval = setInterval(() => {
            if (!buttonContainer) {
                buttonContainer = document.querySelector("body > div.MuiDialog-root.modal-grade.edu-modal.MuiModal-root.css-74waha > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogActions-root.MuiDialogActions-spacing.css-1vskg8q")
                return;
            }
            clearInterval(findButtonContainerInterval);
            // Restart interval if rating panel is canceled
            restartInterval();
            appendAutoGradeButton();
        }, timer);
    }

    /*********************************
    *
    *              MAIN
    *
    **********************************/
    autoGradeInterval();
})();


