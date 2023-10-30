export const messageSendTime = (str: string): string => {
    let result = "";
    let counter = 0
    for (let char of str) {
        counter++
        if (counter > 11 && counter < 17) {
            result += char
        }

    }
    return result;
};
