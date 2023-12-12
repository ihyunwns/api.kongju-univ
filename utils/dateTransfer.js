function dateTranster(category, title, type){

    let folderPath = '';
    if (category === 'character') {
        folderPath = 'image/character/';
    } else if (category === 'nature') {
        folderPath = 'image/nature/';
    } else {
        folderPath = 'image/object/';
    }

    const currentTime = Date.now();
    const dateObject = new Date(currentTime);
  
    const koreaDateString = dateObject.toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
    let formattedString = koreaDateString.replaceAll('/', '-');
    formattedString = formattedString.replace(', ', '-');
    formattedString = formattedString.replace(' ', '-');
  
    return `${folderPath}${formattedString}_${title}.${type}`;
}

module.exports = dateTranster;