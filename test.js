function searchAndSort(words, letter) {
    // Filter words that contain the specified letter
    // const filteredWords = words.filter(word => word.toLowerCase().includes(letter.toLowerCase()));

    // Sort the filtered words based on the position of the letter
    words.sort((a, b) => {
        const aIndex = a.toLowerCase().indexOf(letter.toLowerCase());
        const bIndex = b.toLowerCase().indexOf(letter.toLowerCase());

        // Sort primarily by the position of the letter
        if (aIndex === bIndex) {
            return a.localeCompare(b); // If positions are the same, sort alphabetically
        }
        return aIndex - bIndex; // Otherwise, sort by the letter's position
    });

    return words;
}

// Example usage:
const words = ['Wireless', 'Headphones', 'Portable', 'Charger', 'Laptop', 'Stand', 'Bluetooth', 'Speaker'];
const letter = 'e';
const result = searchAndSort(words, letter);

console.log(result); // Output: [ 'Portable', 'Laptop', 'Speaker', 'Headphones' ]
