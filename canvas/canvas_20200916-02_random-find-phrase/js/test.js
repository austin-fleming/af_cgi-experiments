const TEST_PHRASE = 'F.Factory'
const CHAR_POOL =
    'abcdefghikjklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ,.;%$@#*" 0123456789😀😄😝😴🤢🥶😎😰😈👹😹🙈💯💣🦧'

let word_length = TEST_PHRASE

const getRandomNumberUnder = (limit) => Math.floor(Math.random() * (limit - 1))

const getRandomIndexValue = (array) => array[getRandomNumberUnder(array.length)]

const getRandomChar = getRandomIndexValue.bind(null, CHAR_POOL)

const valuesAreEqual = (valueA, valueB) => (valueA === valueB ? true : false)

const convertStringToArray = (string) => string.split('')

const getFirstRandomCharArray = (targetString) =>
    convertStringToArray(targetString).map((character) => getRandomChar())

const arrayToString = (array) => array.join('')

const checkArraysForMatches = (targetArray, testArray) => {
    return testArray.map((character, index) =>
        valuesAreEqual(character, targetArray[index])
            ? character
            : getRandomChar()
    )
}

export const progressiveMatches = (targetArray, testArray) => {
    let previousWasCorrect = true
    return testArray.map((character, index) => {
        if (
            valuesAreEqual(character, targetArray[index]) &&
            previousWasCorrect
        ) {
            previousWasCorrect = true
            return character
        } else {
            previousWasCorrect = false
            return getRandomChar()
        }
    })
}

export const renderArray = (context, array) => {
    context.fillText(arrayToString(array), 400, 400)
}

let testArray = getFirstRandomCharArray(TEST_PHRASE)

const loop = () => {
    console.log(arrayToString(testArray))
    testArray = progressiveMatches(TEST_PHRASE, testArray)
}

setInterval(() => loop(), 15)

/* while (true) {
    console.log(arrayToString(testArray))
    testArray = progressiveMatches(TEST_PHRASE, testArray)
} */
