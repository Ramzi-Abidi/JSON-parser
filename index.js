import fs from "fs";
import path from "path";
import colors from "colors";

const directoryPath = `./tests/step1/`;      // test the step 1
// const directoryPath = `./tests/step2/`; // test the step 2
// const directoryPath = `./tests/step3/`;      // test the step 3
// const directoryPath = "./tests/step4/";         // test the step 4

const check2 = (s) => {
    if (s.split(",").length > 1) {
        for (let el of s.trim().split(",")) {
            if (el) {
                let key = el.trim().split(":")[0].trim();
                let val = el.trim().split(":")[1].trim();
                // console.log("val".blue, el.trim());
                // console.log(key.trim(), val.trim());
                // check for keys types
                if (typeof key !== "string") {
                    return false;
                }

                if (
                    (val && val.toLowerCase() === "false") ||
                    val.toLowerCase() === "true"
                ) {
                    if (val != "false" && val != "true") {
                        return false;
                    }
                }

                // check for values types
                if (typeof val === undefined) {
                    return false;
                }

                // check for first letter and last character in the key
                if (key[0] !== '"' || key[key.length - 1] !== '"') {
                    return false;
                }

                // if(val[0] === "[") {
                // }
            }
        }
    }
    return true;
};

const check1 = (s) => {
    if (s[0] !== "{" || s[s.length - 1] !== "}") {
        return false;
    }
    if (s.indexOf(":") === -1) {
        return false;
    }
    if (!check2(s.split("{")[1].split("}")[0].trim())) {
        return false;
    }

    // check if last line contains ,
    const lastLine = s.split("}")[0].trim();
    if (lastLine[lastLine.length - 1] === ",") {
        return false;
    }

    return true;
};

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
    } else {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (
                path.extname(file) === ".json" ||
                path.extname(file) === ".JSON"
                // && (file === "valid2.json")
            ) {
                const filePath = path.join(directoryPath, file);
                fs.readFile(filePath, "utf8", (err, data) => {
                    if (data && check1(data.trim())) {
                        console.log("Result: ".blue, "valid".bgGreen);
                    } else {
                        console.log("Result: ".blue, "invalid".bgRed);
                    }
                    // console.log("JSON file: ".blue, data.trim());
                    console.log("*******************************************".magenta);
                });
            }
        }
    }
});
