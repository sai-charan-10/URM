function getBotResponse(input) {
   
    if (input == "hello") {
        return "kittu";
    } else if (input == "karthikeya") {
        return "WDM";
    } else if (input == "wdm") {
        return "Project";
    }

    // Simple responses
    if (input == "hello") {
        return "Hello there!";
    } else if (input == "goodbye") {
        return "Talk to you later!";
    } else {
        return "Try asking something else!";
    }
}