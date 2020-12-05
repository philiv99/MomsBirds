

function uppercaseFirstLetter(string) 
{
    if (string && string.length>0)
        return string.charAt(0).toUpperCase() + string.slice(1);
    else
        return string;
}

function cleanAndCapitolize(string) {
    let trimmedstring = string.replace(/[^a-zA-Z\-]/g," ").trim().toLowerCase();
    var words = trimmedstring.split(" ");
    return uppercasefirstLetter(words[words.length - 1]);
}

export default {
    uppercaseFirstLetter: uppercaseFirstLetter,
    cleanAndCapitolize: cleanAndCapitolize
}