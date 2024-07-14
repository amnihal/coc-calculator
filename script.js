function calculateTime() {
    let normalDays = parseFloat(document.getElementById("normalDays").value) || 0;
    let normalHours = parseFloat(document.getElementById("normalHours").value) || 0;
    let normalMinutes = parseFloat(document.getElementById("normalMinutes").value) || 0;
    let boostFactor = parseFloat(document.getElementById("boostFactor").value);
    let boostHours = parseFloat(document.getElementById("boostHours").value) || 0;
    let boostMinutes = parseFloat(document.getElementById("boostMinutes").value) || 0;

    // Convert the normal process time to hours
    let normalTimeInHours = (normalDays * 24) + normalHours + (normalMinutes / 60);

    // Convert the boost duration to hours
    let boostDurationInHours = boostHours + (boostMinutes / 60);

    // Calculate the work done during the boost period
    let workCompletedDuringBoost = (boostDurationInHours * boostFactor) / normalTimeInHours;

    if (workCompletedDuringBoost >= 1) {
        // If the work completed during the boost period is more than or equal to 1, it's done
        let totalTimeHours = Math.floor(boostDurationInHours);
        let totalTimeMinutes = Math.round((boostDurationInHours - totalTimeHours) * 60);
        document.getElementById("result").innerText = "Total time needed: " + formatTime(0, totalTimeHours, totalTimeMinutes);
    } else {
        // Calculate the remaining work after the boost period
        let remainingWork = 1 - workCompletedDuringBoost;

        // Calculate the time needed to complete the remaining work at normal speed
        let remainingTimeInHours = remainingWork * normalTimeInHours;

        let totalTimeInHours = boostDurationInHours + remainingTimeInHours;

        let totalDays = Math.floor(totalTimeInHours / 24);
        let totalHours = Math.floor(totalTimeInHours % 24);
        let totalMinutes = Math.round((totalTimeInHours - Math.floor(totalTimeInHours)) * 60);

        document.getElementById("result").innerText = "Total time needed: " + formatTime(totalDays, totalHours, totalMinutes);
    }
}

function formatTime(days, hours, minutes) {
    let result = "";
    if (days > 0) {
        result += days + " days ";
    }
    if (hours > 0 || days > 0) {
        result += hours + " hours ";
    }
    result += minutes + " minutes";
    return result;
}
