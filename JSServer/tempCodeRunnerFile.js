fs.writeFile(
    'items.json',
    JSON.stringify({}, null, 4),
    (err) => {
        if (err) console.log(err);

        console.log('The file has been saved!');
    }
);
