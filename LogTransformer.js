/**
 * If you cant run this from terminal just insert your data into variables
 * Enjoy!
 *
 * @author shumichenko
 */

/**
 * String with output datatype
 *
 * @exmaple json
 * @example get
 *
 * @type {string}
 */
let outputTypeString = '';

/**
 * String from your logs
 *
 * @example [name]   => Sam
 *          [age]    => 23
 *          [gender] => male
 * @example [name] => Sam [age] => 23 [gender] => male
 * @example [name]=>Sam[age]=>23[gender]=>male
 *
 * @type {string}
 */
let inputStringData  = '';

const splitInputByChunks = function (string) {
    return string.split(/$\[|.(?=\[)/g);
};

const splitChunkByKeyValue = function (listOfStrings) {
    const splitString = function (strings, keyObjectValue = {}, iterationIndex = 0) {
        const keyMatch      = strings[iterationIndex].match(/(?<=\[)(.*?)(?=\])/);
        const escapedString = strings[iterationIndex].replace(/\s+/g, '');
        const valueMatch    = escapedString.match(/(?<=\>)(.*?)(?=$)/);

        if (keyMatch && valueMatch) {
            Object.assign(keyObjectValue, {[keyMatch[1]]: valueMatch[1]});
        }

        return listOfStrings[iterationIndex + 1]
            ? splitString(listOfStrings, keyObjectValue, iterationIndex + 1)
            : keyObjectValue;
    };

    return listOfStrings ? splitString(listOfStrings) : '';
};

const getParamsStringFromObject = function (keyValueObject) {
    const KEY   = 0;
    const VALUE = 1;

    const concatenateString = function (arrayOfValues, string = '', iterationIndex = 0) {
        string += (iterationIndex ? '&' : '?') + arrayOfValues[iterationIndex][KEY]
            + '=' + arrayOfValues[iterationIndex][VALUE];

        return typeof arrayOfValues[iterationIndex + 1] !== "undefined"
            ? concatenateString(arrayOfValues, string, iterationIndex + 1)
            : string;
    };

    return Object.keys(keyValueObject).length > 0 ? concatenateString(Object.entries(keyValueObject)) : '';
};

const jsonStringFromObject = function (keyValueObject) {
    return JSON.stringify(keyValueObject);
};

const getTranslatorFuncByType = function(type) {
    const outputTypeMap = {
        json: jsonStringFromObject,
        get:  getParamsStringFromObject
    };

    return outputTypeMap[type.toLowerCase()] ? outputTypeMap[type.toLowerCase()] : '';
};

const askForOutputType = async function (readlineInterface) {
    return new Promise((resolve, reject) => {
        readlineInterface.question('Enter output type: [\"JSON\" or \"GET\"] \n', (input) => resolve(input));
    });
}

const runConsoleApp = function (readlineInterface) {
    let inputString = '';

    askForOutputType(readlineInterface).then(function (outputType) {
        const translator = getTranslatorFuncByType(outputType);

        if (!translator) {
            console.log('This output datatype was not found: ' + outputType)
            runConsoleApp(readlineInterface);

            return;
        }

        console.log('Enter your log string:');

        readlineInterface.on('line', function (line) {
            line !== '' ? inputString += line : readlineInterface.close();
        });

        readlineInterface.on('close', function (line) {
            const outputString = translator(splitChunkByKeyValue(splitInputByChunks(inputString)));

            if (outputString || Object.keys(outputString).length > 0) {
                console.log(outputString);

                return;
            }

            console.log('Not able to transform this data');

            process.exit(0);
        });
    });
}

const runCodeApp = function (inputString, outputType) {
    const translator = getTranslatorFuncByType(outputType);

    if (!translator) {
        console.log('This output datatype was not found: ' + outputType)

        return;
    }

    const outputString = translator(splitChunkByKeyValue(splitInputByChunks(inputString)));

    if (outputString || Object.keys(outputString).length > 0) {
        console.log(outputString);

        return;
    }

    console.log('Not able to transform this data');
};

if (!inputStringData) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    runConsoleApp(readline);
} else {
    runCodeApp(inputStringData, outputTypeString);
}